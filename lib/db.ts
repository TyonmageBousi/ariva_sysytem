
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { categories, colorCategories, cartItems, temporaryOrders, temporaryOrderItems, orders, orderItems, products } from "./schema"
import { eq, and, SQL } from 'drizzle-orm';
import { ProductPurchaseValues } from '@/app/schemas/productPurchase'
import { auth } from "@/auth";
import { cookies } from 'next/headers';
import { AuthError } from '@/lib/errors'
import { createClient } from '@supabase/supabase-js';
import { AppError } from '@/lib/errors'
import { ProductErrors, StockError } from '@/app/api/user/settlement/route'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

declare global {
  var __pgClient: postgres.Sql | undefined;
}

function createDbClient() {
  // すでに作られてたら再利用
  if (global.__pgClient) {
    return global.__pgClient;
  }

  if (!process.env.DATABASE_URL_POOLING) {
    throw new Error('DATABASE_URL_POOLING is not defined');
  }

  console.log('🔵 新しいDB接続プールを作成');

  const client = postgres(process.env.DATABASE_URL_POOLING, {
    prepare: false,
    max: 10,
    idle_timeout: 60 * 10,
    connect_timeout: 30,
    max_lifetime: 60 * 60,

    onclose: () => {
      console.log('⚠️ データベース接続が閉じられました');
      global.__pgClient = undefined;
    },

    debug: process.env.NODE_ENV === 'development',
  });

  global.__pgClient = client;
  return client;
}

// 1回だけ作成
const pgClient = createDbClient();

// Drizzle ORM
export const db = drizzle(pgClient, { schema });
export async function getAllCategories() {
  try {
    return await db.select({ id: categories.id, label: categories.name }).from(categories);
  } catch (error) {
    console.error("getAllCategories failed:", error);
    return []
  }
}
export async function getAllColorCategories() {
  try {
    return await db.select({ id: colorCategories.id, label: colorCategories.name }).from(colorCategories)
  } catch (error) {
    console.error("getAllCategories failed:", error);
    return [];
  }
}

export async function loginJudgment() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new AuthError();
  }
  return session.user;
}


export async function getAllUserCart(userId: number) {
  return await db.select({
    id: cartItems.id,
    productId: cartItems.productId,
    productName: cartItems.productName,
    price: cartItems.price,
    quantity: cartItems.quantity,
  }).from(cartItems)
    .where(eq(cartItems.userId, userId));
}

export async function insertTemporaryOrder(carts: ProductPurchaseValues[], userId: number, sessionId: string) {

  const totalPrice = carts.reduce((sum, cart) => sum + cart.price * cart.purchaseQuantity, 0);


  await db.transaction(async (tx) => {

    await Promise.all(
      carts.map(async (cart) => {
        const [lock] = await tx.select({
          stock: products.stock,
          name: products.name,
          version: products.version
        }).from(products)
          .where(eq(products.id, cart.productId))

        const productErrors: ProductErrors[] = [];
        if (cart.purchaseQuantity > lock.stock) {
          let message = lock.stock === 0 ?
            (`${lock.name}が在庫切れとなってしまいました。ご了承ください`)
            :
            (`${lock.name}の在庫が注文数より少ないです。現状、${lock.stock}までの購入となりますのでご了承ください`)

          const err: StockError = {
            message: message,
            type: 'STOCK_ERROR',
            productId: cart.productId,
            requested: cart.purchaseQuantity,
            stock: lock.stock,
          }

          productErrors.push(err)
        }

        if (productErrors.length > 0) {
          throw new AppError({
            message: 'カート内の商品情報が更新されています。',
            statusCode: 404,
            errorType: 'PRODUCT_ERROR',
            details: productErrors
          })
        }
        const updateStock = lock.stock - cart.purchaseQuantity
        await tx.update(products).set({ stock: updateStock, version: lock.version + 1 })
          .where(and(
            eq(products.id, cart.productId),
            eq(products.version, lock.version)
          ))
      })
    )
    const [{ orderId }] = await tx.insert(temporaryOrders).values({
      userId: userId,
      totalPrice: totalPrice,
      sessionId: sessionId,
      status: 'address'
    }).returning({ orderId: temporaryOrders.id })

    await tx.insert(temporaryOrderItems).values(
      carts.map(cart => ({
        orderId: orderId,
        productId: cart.productId,
        quantity: cart.purchaseQuantity,
        productName: cart.name,
        price: cart.price,
      })
      ));
  })
}


export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies();

  let sessionId = cookieStore.get('session_id')?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();  // ← cryptoを追加
    cookieStore.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 15
    });
  }

  return sessionId;
}


export async function finalStep(userId: number, sessionId: string) {

  try {
    await db.transaction(async (tx) => {
      const [temporaryOrderList] = await tx.select({
        id: temporaryOrders.id,
        userId: temporaryOrders.userId,
        totalPrice: temporaryOrders.totalPrice,
        postalCode: temporaryOrders.postalCode,
        prefecture: temporaryOrders.prefecture,
        city: temporaryOrders.city,
        address1: temporaryOrders.address1,
        address2: temporaryOrders.address2,
      }).from(temporaryOrders)
        .where(
          and(
            (eq(temporaryOrders.userId, userId)),
            (eq(temporaryOrders.sessionId, sessionId))
          )
        );

      if (!temporaryOrderList) {
        throw new Error('一時注文の取得に失敗しました。');
      }

      const [orderList] = await tx.insert(orders).values({
        userId: temporaryOrderList.userId,
        totalPrice: temporaryOrderList.totalPrice,
        postalCode: temporaryOrderList.postalCode,
        prefecture: temporaryOrderList.prefecture,
        city: temporaryOrderList.city,
        address1: temporaryOrderList.address1,
        address2: temporaryOrderList.address2,
      }).returning({ orderId: orders.id })

      if (!orderList) {
        throw new Error('注文の挿入に失敗しました。');
      }

      const temporaryOrderItemList = await tx.select({
        orderId: temporaryOrderItems.orderId,
        productId: temporaryOrderItems.productId,
        quantity: temporaryOrderItems.quantity,
        productName: temporaryOrderItems.productName,
        price: temporaryOrderItems.price,
      }).from(temporaryOrderItems)
        .where(eq(temporaryOrderItems.orderId, temporaryOrderList.id))


      if (!temporaryOrderItemList || temporaryOrderItemList.length === 0) {
        throw new Error('一時注文商品リストの取得に失敗しました。');
      }

      await tx.insert(orderItems).values(
        temporaryOrderItemList.map((temporaryOrderItem) => ({
          orderId: orderList.orderId,
          productId: temporaryOrderItem.productId,
          quantity: temporaryOrderItem.quantity,
          productName: temporaryOrderItem.productName,
          price: temporaryOrderItem.price,
        }))
      );


      await tx.delete(temporaryOrders)
        .where(
          and(
            (eq(temporaryOrders.userId, userId)),
            (eq(temporaryOrders.sessionId, sessionId))
          )
        );

      const cartItemsList = await tx.select({
        id: cartItems.id,
        userId: cartItems.userId,
        productId: cartItems.productId,
        quantity: cartItems.quantity
      }).from(cartItems)
        .where(
          eq(cartItems.userId, userId)
        )

      if (!cartItemsList || cartItemsList.length === 0) {
        throw new Error('一時注文商品リストの取得に失敗しました。');
      }

      //一時注文数を取得
      const tempOrderItems = new Map(temporaryOrderItemList.map((temporaryOrderItem) => (
        [temporaryOrderItem.productId, temporaryOrderItem.quantity]
      )));


      //カート内の商品をループで回す
      for (const cartItem of cartItemsList) {

        //一時テーブル内のカートアイテムの商品Idが一致するものを取得
        const orderQuantity = tempOrderItems.get(Number(cartItem.productId));
        if (orderQuantity)
          if (orderQuantity === cartItem.quantity) {
            await tx.delete(cartItems).where(eq(cartItems.id, Number(cartItem.id)))
          } else if (cartItem.quantity > orderQuantity) {
            await tx.update(cartItems).set({ quantity: cartItem.quantity - orderQuantity })
              .where(eq(cartItems.id, cartItem.id))
          }
      }
    })
    return { success: true, message: '注文が完了しました' };


  } catch (error) {
    console.log('DBエラー', error)
    return { success: false, error: '注文処理に失敗しました' };
  }

}

//エラーハンドリング用修正

export async function insertStorage(imageEntries: FormDataEntryValue[]) {
  const imagesFiles = imageEntries.filter(entry => entry instanceof File) as File[];
  const uploadImages = imagesFiles.map(async (image) => {

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 10);
    const extension = image.name.split('.').pop() || 'png';
    const sanitizedFileName = `${timestamp}-${randomStr}.${extension}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(`images/${sanitizedFileName}`, image);
    if (error) {
      console.error('upload error:', error);
      throw new Error
    }
    return data.path;
  })
  return await Promise.all(uploadImages);
}

export async function deleteStorage(removeFiles: string[]) {
  const { data, error } = await supabase.storage
    .from('images')
    .remove(removeFiles);
  if (error) {
    throw new Error(`画像の削除に失敗しました: ${error.message}`);
  }
}

