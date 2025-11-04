import { db } from '@/lib/db';
import { NewAccountSchemaBackend } from '@/app/schemas/newAccount';
import { users } from '@/lib/schema';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);
        const result = NewAccountSchemaBackend.safeParse(data)
        if (!result.success) {
            return Response.json({
                success: false,
                error: '入力に誤りがあります。'
            },
                { status: 400 });
        }
        const { name, email, password, birthday, phone, postalCode, prefecture, city, address1, address2 } = result.data;

        const exitingUser = await db.query.users.findFirst({
            where: (u, { eq }) => eq(u.email, email)
        })
        if (exitingUser) {
            return Response.json(
                { error: 'このメールアドレスはすでに登録されています。' },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = {
            name,
            email,
            password: hashedPassword,
            birthday: new Date(birthday),
            phone,
            postalCode,
            address: [prefecture, city, address1, address2 || ''].join(''),
        };
        await db.insert(users).values(user)
        return Response.json({ success: true }, { status: 201 });
    }
    catch (err) {
        console.error('ユーザー登録エラー:', err);
        return Response.json(
            { success: false, error: 'サーバーエラーが発生しました。' },
            { status: 500 }
        );
    }
};