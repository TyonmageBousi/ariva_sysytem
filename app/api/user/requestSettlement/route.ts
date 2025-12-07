import { loginJudgment } from '@/lib/db'
import { temporaryOrders } from '@/lib/schema'
import { getSessionId, finalStep } from '@/lib/db'
import { eq } from 'drizzle-orm';
import { settlementSchema, SettlementSchema } from '@/app/schemas/settlement'
import { success, z } from 'zod';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'


export class requestSettlementError extends Error {
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
        const validateData: SettlementSchema = settlementSchema.parse(data);

        const user = await loginJudgment(requestSettlementError);
        const sessionId = await getSessionId(); //これはちょっと考える　必要かどうか
        const getTotalPrice = await db.select({
            totalPrice: temporaryOrders.totalPrice,
        })
            .from(temporaryOrders)
            .where(
                eq(temporaryOrders.userId, Number(user.id))
            ).limit(1);

        if (!(getTotalPrice)) {
            throw new requestSettlementError(404, '', '対象の商品')
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

        await response.json();
        if (!(response.ok)) {
            throw new requestSettlementError(404, '決済エラー', 'クレジット会社がえラーです')
        }

        const result = await finalStep(Number(user.id), sessionId)

        if (!result.success) {

        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        )


    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, errorType: 'VALIDATION_ERROR', message: error.issues },
                { status: 400 }
            );
        }

        if (error instanceof requestSettlementError) {
            return NextResponse.json(
                { success: false, errorType: error.errorType, message: error.message },
                { status: error.statusCode }
            );
        }
    } finally {
        await db.$client.end();

    }
}

