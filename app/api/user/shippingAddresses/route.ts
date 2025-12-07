import { AddressValues, AddressSchema } from '@/app/schemas/address'
import { temporaryOrders } from '@/lib/schema'
import { getSessionId } from '@/lib/db'
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { loginJudgment } from '@/lib/db'
import { db } from '@/lib/db'

export class ShippingAddressError extends Error {
    constructor(
        public statusCode: number,
        public errorType: string,
        public message: string,
    ) {
        super(message);
    }
}

export async function POST(request: Request) {

    try {

        const data = await request.json();
        const validateData: AddressValues = AddressSchema.parse(data)
        const sessionId = await getSessionId();
        const user = await loginJudgment(ShippingAddressError);
        const result = await db.update(temporaryOrders).set({
            postalCode: validateData.postalCode,
            prefecture: validateData.prefecture,
            city: validateData.city,
            address1: validateData.address1,
            address2: validateData.address2,
        })
            .where(
                and(
                    eq(temporaryOrders.sessionId, sessionId),
                    eq(temporaryOrders.userId, Number(user.id))
                )
            );

        if (result)
            return NextResponse.json(
                { success: true },
                { status: 200 }
            )

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errorType: 'VALIDATION_ERROR', message: error.message },
                { status: 400 }
            );
        }

        if (error instanceof ShippingAddressError) {
            return NextResponse.json(
                { success: false, errorType: error.errorType, message: error.message },
                { status: error.statusCode }
            );
        }
        return NextResponse.json(
            { success: false, errorType: 'INTERNAL_ERROR' },
            { status: 500 }
        );
    }
    finally {
        await db.$client.end();
    }

}