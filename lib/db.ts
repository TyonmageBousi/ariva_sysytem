
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import { categories, colorCategories, cartItems, temporaryOrders, temporaryOrderItems } from "./schema"
import { eq } from 'drizzle-orm';
import { ProductPurchaseSchema } from '@/app/schemas/productPurchase'
import { CartError } from '@/app/api/user/settlement/route'
import { auth } from "@/auth";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle(client, { schema });

export async function getAllCategories() {
  return await db.select({ id: categories.id, label: categories.name }).from(categories);
}

export async function getAllColorCategories() {
  return await db.select({ id: colorCategories.id, label: colorCategories.name }).from(colorCategories)
}

export async function loginJudgment<T extends Error>(
  ErrorClass: new (statusCode: number, errorType: string, message: string) => T,

) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new ErrorClass(401, 'Unauthorized', 'User not authenticated');
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

export async function insertTemporaryOrder(carts: ProductPurchaseSchema[], userId: number) {

  const totalPrice = carts.reduce((sum, cart) => sum + cart.price * cart.quantity, 0);
  try {
    await db.transaction(async (tx) => {
      const [{ orderId }] = await tx.insert(temporaryOrders).values({
        userId: userId,
        totalPrice: totalPrice,
      }).returning({ orderId: temporaryOrders.id })

      await tx.insert(temporaryOrderItems).values(
        carts.map(cart => ({
          orderId: orderId,
          productId: cart.productId,
          quantity: cart.quantity,
          name: cart.name,
          price: cart.price,
        })
        ));
    })
  } catch (error) {
    throw new CartError('ORDER_INSERT_FAILED', 500)
  }
}


