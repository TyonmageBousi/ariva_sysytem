// scripts/seed-color-categories.ts
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { categories } from "../lib/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
    try {

        console.log("🗑️ Deleting existing color categories...");
        await db.delete(categories);


        await db.insert(categories).values([
            { name: "NEW", sortOrder: 1, isActive: true  },
            { name: "ギフト", sortOrder: 2, isActive: true  },
            { name: "期間限定", sortOrder: 3, isActive: true  },
        ]);
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