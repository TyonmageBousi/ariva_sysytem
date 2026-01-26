import { cartItems, temporaryOrders, temporaryOrderItems, orders, orderItems } from "@/lib/schema"
import { eq, and, inArray } from 'drizzle-orm';
import { db } from '@/lib/db'


export async function order(userId: number, sessionId: string) {
    await db.transaction(async (tx) => {
        const [tempOrder] = await tx.select()
            .from(temporaryOrders)
            .where(and(
                eq(temporaryOrders.userId, Number(userId)),
                eq(temporaryOrders.sessionId, sessionId)
            ));

        if (!tempOrder) throw new Error('一時注文の取得に失敗しました。');

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

        const tempItems = await tx.select()
            .from(temporaryOrderItems)
            .where(eq(temporaryOrderItems.orderId, tempOrder.id));

        if (tempItems.length === 0) throw new Error('一時注文商品リストの取得に失敗しました。');

        await tx.insert(orderItems).values(
            tempItems.map(item => ({
                orderId: order.orderId,
                productId: item.productId,
                quantity: item.quantity,
                productName: item.productName,
                price: item.price,
            }))
        );

        await tx.delete(temporaryOrders)
            .where(and(
                eq(temporaryOrders.userId, Number(userId)),
                eq(temporaryOrders.sessionId, sessionId)
            ));

        const tempItemsMap = new Map(tempItems.map(item => [item.productId, item.quantity]));
        const cartItemsList = await tx.select()
            .from(cartItems)
            .where(eq(cartItems.userId, Number(userId)));

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
}