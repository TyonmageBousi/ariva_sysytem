import { products, cartItems, temporaryOrders, temporaryOrderItems } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { db, getSessionId } from '@/lib/db'
import { ProductPurchaseValues } from '@/app/schemas/productPurchase'
import { NextResponse } from 'next/server';
import { AppError } from '@/lib/errors'


export type ProductPurchase = ProductPurchaseValues & {
    updateFlg: number

}

//商品テーブル更新
export const updateCartTable = async (updateCarts: ProductPurchase[], userId: number) => {
    await db.transaction(async (tx) => {
        await Promise.all(
            updateCarts.map(async (updateCart) => {
                if (updateCart.updateFlg === 1) {
                    await tx.update(cartItems)
                        .set({
                            productName: updateCart.name,
                            price: updateCart.price
                        }
                        )
                        .where(
                            and(
                                eq(cartItems.userId, userId),
                                eq(cartItems.productId, updateCart.productId)
                            )
                        );
                }
                if (updateCart.updateFlg === 2) {
                    await tx.delete(cartItems)
                        .where(
                            and(
                                eq(cartItems.userId, userId),
                                eq(cartItems.productId, updateCart.productId)
                            )
                        );
                }
            })
        );
    });
};

export const createOrder = (async (updateCartValues: ProductPurchase[], userId: number) => {

    const sessionId = await getSessionId()

    const totalPrice = updateCartValues.reduce((sum, cart) => sum + cart.price * cart.purchaseQuantity, 0);
    
    for (let i = 0; i < 4; i++) {
        try {
            await db.transaction(async (tx) => {
                // ① 在庫を減らす
                await Promise.all(
                    updateCartValues.map(async (cart) => {
                        const [product] = await tx.select({
                            stock: products.stock,
                            version: products.version
                        }).from(products)
                            .where(eq(products.id, cart.productId))

                        const newStock = product.stock - cart.purchaseQuantity
                        const result = await tx.update(products)
                            .set({
                                stock: newStock,
                                version: product.version + 1
                            })
                            .where(and(
                                eq(products.id, cart.productId),
                                eq(products.version, product.version)
                            ))
                            .returning()

                        if (result.length === 0) {
                            throw new Error('LOCK_ERROR')
                        }
                    })
                )

                // ② 注文作成
                const [{ orderId }] = await tx.insert(temporaryOrders).values({
                    userId: userId,
                    totalPrice: totalPrice,
                    sessionId: sessionId,
                    status: 'address'
                }).returning({ orderId: temporaryOrders.id })

                // ③ 注文アイテム作成
                await tx.insert(temporaryOrderItems).values(
                    updateCartValues.map(cart => ({
                        orderId: orderId,
                        productId: cart.productId,
                        quantity: cart.purchaseQuantity,
                        productName: cart.name,
                        price: cart.price,
                    }))
                )
            })

            // 成功したらループを抜ける
            return NextResponse.json({
                success: true,
            }, { status: 200 })

        } catch (error) {
            if (error instanceof Error && error.message === 'LOCK_ERROR') {
                // 最後のリトライでも失敗
                if (i === 3) {
                    throw new AppError({
                        message: '在庫の更新に失敗しました。しばらく経ってから再度お試しください。',
                        statusCode: 409,
                        errorType: 'LOCK_ERROR',
                    })
                }
                // リトライ継続
                continue
            }
            // LOCK_ERROR以外のエラーはそのまま投げる
            throw error
        }
    }
})



