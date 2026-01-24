import { cartItems, temporaryOrders, temporaryOrderItems, orders, orderItems } from "@/lib/schema"
import { db, loginJudgment, getSessionId } from '@/lib/db'
import { eq, and, inArray } from 'drizzle-orm';

export async function finalStep() {
    try {
        const user = await loginJudgment();
        const sessionId = await getSessionId();

        await db.transaction(async (tx) => {
            // 一時注文を取得
            const [tempOrder] = await tx.select()
                .from(temporaryOrders)
                .where(and(
                    eq(temporaryOrders.userId, Number(user.id)),
                    eq(temporaryOrders.sessionId, sessionId)
                ));

            if (!tempOrder) throw new Error('一時注文の取得に失敗しました。');

            // 本注文を作成
            const [order] = await tx.insert(orders)
                .values({
                    userId: tempOrder.userId,
                    totalPrice: tempOrder.totalPrice,
                    postalCode: tempOrder.postalCode,
                    prefecture: tempOrder.prefecture,
                    city: tempOrder.city,
                    address1: tempOrder.address1,
                    address2: tempOrder.address2,
                })
                .returning({ orderId: orders.id });

            if (!order) throw new Error('注文の挿入に失敗しました。');

            // 一時注文商品を取得
            const tempItems = await tx.select()
                .from(temporaryOrderItems)
                .where(eq(temporaryOrderItems.orderId, tempOrder.id));

            if (tempItems.length === 0) throw new Error('一時注文商品リストの取得に失敗しました。');

            // 本注文商品を作成
            await tx.insert(orderItems).values(
                tempItems.map(item => ({
                    orderId: order.orderId,
                    productId: item.productId,
                    quantity: item.quantity,
                    productName: item.productName,
                    price: item.price,
                }))
            );

            // 一時注文を削除（CASCADE設定があればitemsも自動削除）
            await tx.delete(temporaryOrders)
                .where(and(
                    eq(temporaryOrders.userId, Number(user.id)),
                    eq(temporaryOrders.sessionId, sessionId)
                ));

            // カートから注文済み商品を削除・更新
            const tempItemsMap = new Map(tempItems.map(item => [item.productId, item.quantity]));
            const cartItemsList = await tx.select()
                .from(cartItems)
                .where(eq(cartItems.userId, Number(user.id)));

            if (cartItemsList.length === 0) return;

            const itemsToDelete: number[] = [];
            const itemsToUpdate: { id: number; quantity: number }[] = [];

            for (const cartItem of cartItemsList) {
                const orderQty = tempItemsMap.get(Number(cartItem.productId));
                if (!orderQty) continue;

                if (orderQty === cartItem.quantity) {
                    itemsToDelete.push(Number(cartItem.id));
                } else if (cartItem.quantity > orderQty) {
                    itemsToUpdate.push({
                        id: cartItem.id,
                        quantity: cartItem.quantity - orderQty
                    });
                }
            }

            if (itemsToDelete.length > 0) {
                await tx.delete(cartItems).where(inArray(cartItems.id, itemsToDelete));
            }

            for (const item of itemsToUpdate) {
                await tx.update(cartItems)
                    .set({ quantity: item.quantity })
                    .where(eq(cartItems.id, item.id));
            }
        });

        return { success: true, message: '注文が完了しました' };

    } catch (error) {
        console.log('DBエラー', error);
        return { success: false, error: '注文処理に失敗しました' };
    }
}