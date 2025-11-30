import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/lib/schema';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { loginJudgment } from '@/lib/db'

export class AddressError extends Error {
    constructor(
        public statusCode: number,
        public errorType: string,
        public message: string,
    ) {
        super(message)
        this.name = 'AddressError';
    }
}

export async function GET() {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const db = drizzle(client, { schema });

    try {
        const user = await loginJudgment(AddressError);
        const result = await db.select({
            postalCode: users.postalCode,
            prefecture: users.prefecture,
            city: users.city,
            address1: users.address1,
            address2: users.address2,
        }).from(users)
            .where(eq(users.id, Number(user.id)))

        if ((!result) || result.length === 0) {
            throw new AddressError(404, 'ADDRESS_NOT_FOUND', '住所が見つかりません');
        }
        return NextResponse.json({ success: true, address: result[0] }, { status: 200 })
    } catch (error) {
        if (error instanceof AddressError) {
            return NextResponse.json(
                { success: false, errorType: error.errorType, message: error.message },
                { status: error.statusCode }
            );
        }
        return NextResponse.json(
            { success: false, errorType: 'INTERNAL_ERROR', message: 'サーバーエラーが発生しました' },
            { status: 500 }
        );
    } finally {
        await client.end();
    }
}