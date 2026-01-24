import { AddressValues, AddressSchema } from '@/app/schemas/address'
import { temporaryOrders } from '@/lib/schema'
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { loginJudgment, db, getSessionId } from '@/lib/db'
import { handleError, ValidationError } from '@/lib/errors'


export async function POST(request: Request) {

    try {
        const data = await request.json();
        const validateData: AddressValues = AddressSchema.parse(data);

        const sessionId = await getSessionId();
        const user = await loginJudgment();

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
            return handleError(new ValidationError(error.issues));
        }
        return handleError(error);
    }

}