// scripts/seed-users.ts
import dotenv from 'dotenv';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
dotenv.config({ path: '.env' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';


const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
    try {
        console.log("🗑️ Deleting existing users...");

        await db.delete(productCategories);
        await db.delete(productColors);
        await db.delete(productImages);
        await db.delete(products);

        console.log("🌱 products delete!");
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
