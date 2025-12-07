
import { NextResponse } from 'next/server';
import { products, cartItems } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';
import { auth } from "@/auth";
import { productPurchaseSchema, ProductPurchaseSchema } from '@/app/schemas/productPurchase'
import { z } from 'zod';
import { insertTemporaryOrder, getSessionId } from '@/lib/db'
import { db } from '@/lib/db'


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

export type ProductErrors = {
    productId: number;
    errors: Errors[];
}

export class CartError extends Error {
    constructor(
        public errorType: string,
        public statusCode: number,
        public details?: ProductErrors[],
        message?: string
    ) {
        super(message);
    }
}

export async function POST(request: Request) {

    /* 関数定義 ここから*/

    const validateSettlement = (async (cart: ProductPurchaseSchema) => {

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
            .where(eq(products.id, cart.productId))
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
                    productId: cart.productId,
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
                    productId: cart.productId,
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
                productId: cart.productId,
            }
            errors.push(err);
        }
        return { errors, updateCart };
    });

    //商品テーブル更新
    const updateCartTable = async (updateCarts: ProductPurchaseSchema[], userId: number) => {
        await db.delete(cartItems)
            .where(
                eq(cartItems.userId, userId)
            );
        await db.insert(cartItems).values(
            updateCarts.map((updateCart) => ({
                userId: userId,
                productName: updateCart.name,
                productId: updateCart.productId,
                price: updateCart.price,
                quantity: updateCart.quantity
            }))
        );
    }


    /* 関数定義 ここまで */

    const session = await auth();
    if (!session?.user?.id) {
        throw new CartError('USER_NOT_FOUND', 404)
    }
    const { user } = session;

    try {
        const data = await request.json();
        const validateData: ProductPurchaseSchema[] = z.array(productPurchaseSchema).parse(data)

        if (validateData.length === 0) {
            throw new CartError('EMPTY_CART', 400)
        }
        const results = await Promise.all(
            validateData.map((cart) => validateSettlement(cart)));

        const hasErrors = results.filter(result => result.errors.length > 0);
        const updateCarts = results.map(result => result.updateCart).filter((updateCart) => updateCart.quantity > 0)
        await updateCartTable(updateCarts, Number(user.id))
        if (hasErrors.length > 0) {
            const productErrors = hasErrors.map(result => ({
                productId: result.updateCart.productId,
                errors: result.errors
            }))
            throw new CartError('PRODUCT_ERROR', 404, productErrors)
        }
        const sessionId = await getSessionId()
        await insertTemporaryOrder(updateCarts, Number(user.id), sessionId)
        
        return NextResponse.json({
            success: true,
        }, { status: 200 })
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errorType: 'VALIDATION_ERROR', details: error.issues },
                { status: 400 }
            );
        }

        if (error instanceof CartError) {
            return NextResponse.json(
                { success: false, errorType: error.errorType, details: error.details },
                { status: error.statusCode }
            );
        }

        return NextResponse.json(
            { success: false, errorType: 'INTERNAL_ERROR' },
            { status: 500 }
        );
    }
}

