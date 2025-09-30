// scripts/seed-color-categories.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { products } from "../lib/schema";
import fs from "fs";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
    try {

        console.log("🗑️ Deleting existing color categories...");
        await db.delete(products);

        const raw = fs.readFileSync("./products_test_data.json", "utf-8");
        const data = JSON.parse(raw);

        await db.insert(products).values(data);
        console.log("🌱 categories seeded!");
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