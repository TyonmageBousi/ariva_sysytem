import { NextResponse } from 'next/server';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { handleError } from '@/lib/errors'

export async function GET(request: Request) {
    try {

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        const result = await db.select({
            postalCode: users.postalCode,
            prefecture: users.prefecture,
            city: users.city,
            address1: users.address1,
            address2: users.address2,
        })
            .from(users)
            .where(eq(users.id, Number(id)))
            .limit(1);

        if (result.length === 0) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: result[0] },
            { status: 200 }
        );
    } catch (error) {
        return handleError(error);
    }
}