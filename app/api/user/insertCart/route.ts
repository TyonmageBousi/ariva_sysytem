import { cartItems } from '@/lib/schema'
import { NextResponse } from 'next/server';
import { getAllUserCart, } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { productPurchaseSchema } from '@/app/schemas/productPurchase'
import { ZodError } from 'zod';
import { db, loginJudgment, } from '@/lib/db'
import { ValidationError, handleError } from '@/lib/errors'

export async function POST(request: Request) {

    try {
        const user = await loginJudgment();

        const data = await request.json();
        const parseData = productPurchaseSchema.parse(data)

        const oldCart = await getAllUserCart(Number(user.id))

        const sameProductItems = oldCart.filter(cart =>
            cart.productId === parseData.productId
        );

        const matchProduct = sameProductItems.find(cart =>
            cart.productName === parseData.name &&
            cart.price === parseData.price
        );

        if (matchProduct) {
            await db.update(cartItems).set({
                quantity: matchProduct.quantity + parseData.purchaseQuantity
            }).where(eq(cartItems.id, matchProduct.id))
        } else {
            await db.insert(cartItems).values({
                userId: Number(user.id),
                productId: parseData.productId,
                productName: parseData.name,
                price: parseData.price,
                quantity: parseData.purchaseQuantity,
            }).returning({ userId: cartItems.userId })
        }
        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return handleError(new ValidationError(error.issues));
        }
        return handleError(error)
    }
}