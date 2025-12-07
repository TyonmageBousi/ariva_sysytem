import { cartItems } from '@/lib/schema'
import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { getAllUserCart, } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { productPurchaseSchema } from '@/app/schemas/productPurchase'
import { ZodError } from 'zod';
import { db } from '@/lib/db'

export async function POST(request: Request) {

    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }
        const { user } = session;

        const data = await request.json();
        const parseData = productPurchaseSchema.parse(data)

        const oldCart = await getAllUserCart(Number(user.id))

        const sameProductItems = oldCart.filter(cart =>
            cart.productId === parseData.productId
        )

        const matchProduct = sameProductItems.find(cart =>
            cart.productName === parseData.name &&
            cart.price === parseData.price
        );

        if (matchProduct) {
            await db.update(cartItems).set({
                quantity: matchProduct.quantity + parseData.quantity
            }).where(eq(cartItems.id, matchProduct.id))
        } else {
            await db.insert(cartItems).values({
                userId: Number(user.id),
                productId: parseData.productId,
                productName: parseData.name,
                price: parseData.price,
                quantity: parseData.quantity,
            }).returning({ userId: cartItems.userId })
        }
        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'バリデーションエラーです', details: error.issues },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { error: '予期しないエラーが発生しました' },
            { status: 500 }
        )
    }
}