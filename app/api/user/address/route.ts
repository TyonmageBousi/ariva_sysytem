import { NextResponse } from 'next/server';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { db, client, loginJudgment } from '@/lib/db'
import { AppError, handleError } from '@/lib/errors'

export async function GET() {
    try {
        const user = await loginJudgment();
        const result = await db.select({
            postalCode: users.postalCode,
            prefecture: users.prefecture,
            city: users.city,
            address1: users.address1,
            address2: users.address2,
        }).from(users)
            .where(eq(users.id, Number(user.id)))

        return NextResponse.json({ success: true, address: result[0] }, { status: 200 })
    } catch (error) {
        return handleError(error)
    } finally {
        await client.end();
    }
}