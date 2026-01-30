import { NextRequest, NextResponse } from 'next/server';
import { cartItems } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db'
import { AppError, handleError } from '@/lib/errors'


export async function GET(request: Request) {

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        const result = await db.select({
            id: cartItems.id,
            productId: cartItems.productId,
            name: cartItems.productName,
            price: cartItems.price,
            quantity: cartItems.quantity
        }).from(cartItems)
            .where(eq(cartItems.userId, Number(id)))

        return NextResponse.json(
            {
                success: true,
                data: result,
            },
            { status: 200 }
        );
    } catch (error) {
        return handleError(error);
    }
}