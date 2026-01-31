// scripts/seed-color-categories.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { colorCategories } from "../lib/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
    try {

        console.log("🗑️ Deleting existing color categories...");
        await db.delete(colorCategories);

        await db.insert(colorCategories).values([
            { name: "赤", sortOrder: 1 },
            { name: "青", sortOrder: 2 },
            { name: "緑", sortOrder: 3 },
            { name: "白", sortOrder: 4 },
            { name: "茶", sortOrder: 5 },
            { name: "黒", sortOrder: 6 },
        ]);
        console.log("🌱 color_categories seeded!");
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