import { temporaryOrders } from '@/lib/schema'
import { getSessionId } from '@/lib/db'
import { eq } from 'drizzle-orm';
import { settlementSchema, SettlementSchema } from '@/app/schemas/settlement'
import { NextResponse } from 'next/server';
import { db, loginJudgment } from '@/lib/db'
import { AppError, handleError, ValidationError } from '@/lib/errors'
import { ZodError } from 'zod';


export async function POST(request: Request) {

    try {
        const data = await request.json();
        const validateData: SettlementSchema = settlementSchema.parse(data);

        const user = await loginJudgment();
        const sessionId = await getSessionId(); //これはちょっと考える　必要かどうか


        const getTotalPrice = await db.select({
            totalPrice: temporaryOrders.totalPrice,
        })
            .from(temporaryOrders)
            .where(
                eq(temporaryOrders.userId, Number(user.id))
            ).limit(1);

        if (!(getTotalPrice)) {
            throw new AppError({
                message: '',
                statusCode: 407,
                errorType: 'TOTAL_PRICE_CAN,T_GET'
            });
        }

        const sendData = {
            ...validateData,
            totalPrice: getTotalPrice[0].totalPrice
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/crezit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: sendData
            }),
        });


        if (!(response.ok)) {
            throw new AppError({
                message: '決済処理に失敗しました。クレジットカード会社でエラーが発生しています。',
                statusCode: 502,
                errorType: 'PAYMENT_GATEWAY_ERROR',
            });
        }


        return NextResponse.json(
            { success: true },
            { status: 200 }
        )

    }

    catch (error) {
        if (error instanceof ZodError) {
            return handleError(new ValidationError(error.issues));
        }
        handleError(error);
    }
}

