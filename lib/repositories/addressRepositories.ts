import { cartItems } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db'
import { ProductPurchaseValues } from '@/app/schemas/productPurchase'


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