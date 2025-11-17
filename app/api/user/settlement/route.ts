
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/lib/schema';
import { NextResponse } from 'next/server';
import { products, cartItems } from '@/lib/schema';
import { eq, InferSelectModel, sql } from 'drizzle-orm';
import { auth } from "@/auth";
import { cartSchema, CartSchema } from '@/app/schemas/cart'
import { z } from 'zod';

export type StockError = {
    message: string;
    type: 'STOCK_ERROR';
    productId: number;
    requested: number;
    stock: number;
}

export type PriceError = {
    message: string;
    type: 'PRICE_ERROR';
    productId: number;
    price: number;
    productPrice: number;
}

export type notFindError = {
    message: string;
    type: string;
    productId: number;
}

export type Errors = (StockError | PriceError | notFindError);

export async function POST(request: Request) {

    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const db = drizzle(client, { schema });

    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json(
            { success: false, errorType: 'LOGIN_ERROR' },
            { status: 401 }
        );
    }
    const { user } = session;

    /* 関数定義 ここから*/

    const validateSettlement = (async (cart: CartSchema) => {

        //カート内の商品と一致する商品を商品テーブルから取得
        const errors: Errors[] = [];
        let updateCart = { ...cart }
        const result = await db.select({
            id: products.id,
            price: sql<number>`COALESCE(${products.discountPrice}, ${products.price}, 0)`,
            name: products.name,
            status: products.status,
            stock: products.stock
        }).from(products)
            .where(eq(products.id, cart.id))
            .limit(1);

        //カート内と商品テーブルの情報が一致するか確認
        if (result.length > 0) {
            const product = result[0];

            //在庫チェック
            if (cart.quantity > product.stock) {

                let message = product.stock === 0 ?
                    (`${product.name}が在庫切れとなってしまいました。ご了承ください`)
                    :
                    (`${product.name}の在庫が注文数より少ないです。現状、${product.stock}までの購入となりますのでご了承ください`)

                //在庫エラー作成
                const err: StockError = {
                    message: message,
                    type: 'STOCK_ERROR',
                    productId: cart.id,
                    requested: cart.quantity,
                    stock: product.stock,
                }
                errors.push(err)
                updateCart = {
                    ...updateCart,
                    quantity: product.stock
                }
            }

            //価格の検証
            if (cart.price !== Number(product.price)) {
                //価格エラー作成
                const err: PriceError = {
                    message: `${product.name}の価格が変更されています。現状、${product.price}でのご案内となります。`,
                    type: 'PRICE_ERROR',
                    productId: cart.id,
                    price: cart.price,
                    productPrice: Number(product.price),
                }
                errors.push(err);
                updateCart = {
                    ...updateCart,
                    price: product.price
                }
            }
        } else {
            const err: notFindError = {
                message: '商品が見つかりませんでした。',
                type: 'PRODUCT_NOT_FOUND',
                productId: cart.id,
            }
            errors.push(err);
        }
        return { errors, updateCart };
    });

    //商品テーブル更新
    const updateCartTable = async (updateCarts: CartSchema[], userId: number) => {
        await db.delete(cartItems)
            .where(
                eq(cartItems.userId, userId)
            );
        if (updateCarts.length > 0) {
            await db.insert(cartItems).values(
                updateCarts.map((updateCart) => ({
                    userId: user.id,
                    productName: updateCart.name,
                    productId: updateCart.productId,
                    price: updateCart.price,
                    quantity: updateCart.quantity
                }))
            );
        }
    }

    /* 関数定義 ここまで */

    try {
        const data = await request.json();

        const validateData = z.array(cartSchema).safeParse(data)
        if (!validateData.success) {
            return NextResponse.json(
                {
                    success: false,
                    errorType: 'VALIDATION_ERROR',
                    details: validateData.error
                },
                { status: 400 }
            );
        }
        const carts = validateData.data;

        const results = await Promise.all(
            carts.map((cart) => validateSettlement(cart)));

        const hasErrors = results.filter(result => result.errors.length > 0);

        const updateCarts = results.map(result => result.updateCart);

        await updateCartTable(updateCarts, user.id)

        if (hasErrors.length > 0) {
            const productErrors = hasErrors.map(result => ({
                productId: result.updateCart.id,
                errors: result.errors
            }))
            return NextResponse.json({
                success: false,
                errorType: 'PRODUCT_ERROR',
                productErrors,
                updateCarts
            }, { status: 400 })
        }
        return NextResponse.json({
            success: true,

        }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json(
            { errorType: 'SERVER_ERROR' },
            { status: 500 }
        );

    }
}