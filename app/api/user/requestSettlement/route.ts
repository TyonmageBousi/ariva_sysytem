import { temporaryOrders } from '@/lib/schema'
import { getSessionId, finalStep } from '@/lib/db'
import { eq } from 'drizzle-orm';
import { settlementSchema, SettlementSchema } from '@/app/schemas/settlement'
import { success, z } from 'zod';
import { NextResponse } from 'next/server';
import { db, client, loginJudgment } from '@/lib/db'
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

        const response = await fetch('', {
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
                details: ''
            });
        }

        const result = await finalStep(Number(user.id), sessionId)

        if (!result.success) {
            throw new AppError({
                message: '購入履歴の更新に失敗しました。',
                statusCode: 503,
                errorType: ''
            })
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
    } finally {
        await client.end();
    }
}

