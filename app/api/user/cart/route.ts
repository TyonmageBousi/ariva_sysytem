import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/lib/schema';
import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { cartItems } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const db = drizzle(client, { schema });

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
        await client.end();
    }
}