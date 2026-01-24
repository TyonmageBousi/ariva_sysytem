import { db } from '@/lib/db';
import { eq, sql } from 'drizzle-orm';
import { NewAccountSchema } from '@/app/schemas/newAccount';
import { users } from '@/lib/schema';
import bcrypt from 'bcryptjs';
import { AppError, handleError } from '@/lib/errors'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        const date = new Date(data.birthday)

        const ValidateData = NewAccountSchema.parse({
            ...data,
            birthday: date
        })

        console.log(ValidateData)
        const { name, email, password, birthday, phone, postalCode, prefecture, city, address1, address2 } = ValidateData;

        const alreadyUser = await db.select().from(users)
            .where(eq(users.email, email))
        console.log(alreadyUser)

        if (alreadyUser.length !== 0) {
            throw new AppError(
                {
                    message: 'そのメールアドレスは既に登録されています。',
                    statusCode: 400,
                    errorType: 'VALIDATION_ERROR'
                }
            );
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            name,
            email,
            password: hashedPassword,
            birthday: new Date(birthday),
            phone,
            postalCode,
            prefecture,
            city,
            address1,
            address2: address2 ?? ''
        };
        await db.insert(users).values(user)
        

        return NextResponse.json(
            {
                success: true,
            },
            { status: 200 }
        );
    }
    catch (error) {
        if (error instanceof AppError) {
            return handleError(error);
        }
        return handleError(error);

    }
};