import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { cartItems } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db'

export async function GET() {

    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }
        const { user } = session;
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
        return NextResponse.json(
            { error: '予期しないエラーが発生しました' },
            { status: 500 }
        )
    } finally {
        await db.$client.end();
    }
}