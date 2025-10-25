// scripts/seed-users.ts
import dotenv from 'dotenv';
import { users } from '@/lib/schema'
dotenv.config({ path: '.env' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import bcrypt from 'bcrypt';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
    try {
        console.log("🗑️ Deleting existing users...");
        await db.delete(users);

        const hashedPassword1 = await bcrypt.hash("password123", 10);
        const hashedPassword2 = await bcrypt.hash("secret456", 10);

        const testUsers = [
            {
                name: "山田太郎",
                email: "taro@example.com",
                passWord: hashedPassword1,
                birthday: new Date("1995-04-15"),
                phone: "09012345678",
                postalCode: "1000001",
                address: "東京都千代田区千代田1-1",
            },
            {
                name: "佐藤花子",
                email: "hanako@example.com",
                passWord: hashedPassword2,
                birthday: new Date("1998-12-01"),
                phone: "08098765432",
                postalCode: "1500001",
                address: "東京都渋谷区神宮前1-2-3",
            },
        ];

        await db.insert(users).values(testUsers);
        console.log("🌱 users seeded!");
    } finally {
        await client.end();
    }
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error("❌ Seed error:", err);
        process.exit(1);
    });
