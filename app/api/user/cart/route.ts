import { NextResponse } from 'next/server';
import { cartItems } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { db, client, loginJudgment } from '@/lib/db'
import { AppError, handleError } from '@/lib/errors'

export async function GET() {

    try {
        const user = await loginJudgment();
        const result = await db.select({
            id: cartItems.id,
            productId: cartItems.productId,
            name: cartItems.productName,
            price: cartItems.price,
            quantity: cartItems.quantity
        }).from(cartItems)
            .where(eq(cartItems.userId, Number(user.id)))

        return NextResponse.json(
            {
                success: true,
                data: result,
            },
            { status: 200 }
        );
    } catch (error) {
        handleError(error);
    } finally {
        await client.end();
    }
}