import { db } from '@/lib/db';
import { temporaryOrders, users, productImages } from '@/lib/schema';
import { eq, and, inArray } from 'drizzle-orm';

export async function findTemporaryOrder(userId: number, sessionId: string) {
    return await db.query.temporaryOrders.findFirst({
        where: and(
            eq(temporaryOrders.userId, userId),
            eq(temporaryOrders.sessionId, sessionId)
        ),
        with: {
            temporaryOrderItems: {
                columns: {
                    price: true,
                    productName: true,
                    quantity: true,
                    productId: true
                },
            },
        }
    });
}

export async function findUserPhone(userId: number) {
    const [user] = await db.select({ phone: users.phone })
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);
    return user;
}

export async function findProductImages(productIds: number[]) {
    return await db.select({
        productId: productImages.productId,
        filePath: productImages.filePath
    })
        .from(productImages)
        .where(inArray(productImages.productId, productIds));
}