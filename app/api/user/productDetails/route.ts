// app/api/categories/route.ts
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/lib/schema';
import { eq, not, sql } from 'drizzle-orm';
import { products, productImages } from "@/lib/schema"
import { NextResponse } from 'next/server';
type Params = {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    const client = postgres(process.env.DATABASE_URL!, { prepare: false });
    const db = drizzle(client, { schema });
    const { id } = params
    const productId = parseInt(id);
    if (isNaN(productId)) {
        return NextResponse.json({ error: '数字型のIDじゃありません' }, { status: 400 });
    }
    try {
        const result = await db.select({
            id: products.id,
            skuCode: products.skuCode,
            name: products.name,
            price: products.price,
            discountPrice: products.discountPrice,
            image: sql<string | null>`(
            SELECT ${productImages.filePath}
            FROM ${productImages}
            WHERE ${productImages.productId} = ${products.id} 
            LIMIT 1
            )`
        }).from(products)
            .where(not(eq(products.id, productId)))
            .orderBy(sql`RANDOM()`)
            .limit(20)
        return NextResponse.json(result)
    }
    catch (error) {
        return NextResponse.json(
            { error: 'データ取得失敗' },
            { status: 500 }
        );
    }
}

