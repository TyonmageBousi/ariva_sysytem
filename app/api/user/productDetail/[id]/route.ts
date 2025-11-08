// app/api/categories/route.ts
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/lib/schema';
import { eq,  sql } from 'drizzle-orm';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
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
            description: products.description,
            image: sql<string[]>`(
            SELECT json_agg(${productImages.filePath})
            FROM ${productImages}
            WHERE ${productImages.productId} = ${products.id} 
            )`,
            categories: sql<string[]>`(
            SELECT json_agg(${productCategories.categoryId})
            FROM ${productCategories}
            WHERE ${productCategories.productId} = ${products.id}
            )`,
            productColors: sql<string[]>`(
            SELECT json_agg(${productColors.colorId})
            FROM ${productColors}
            WHERE ${productColors.productId} = ${products.id}
            )`,
        }).from(products)
            .where(eq(products.id, productId))
            .limit(1)
        if (!result[0]) {
            return NextResponse.json(
                { error: '商品が見つかりません' },
                { status: 404 }
            );
        }
        return NextResponse.json(result[0])
    } catch (error) {
        return NextResponse.json(
            { error: 'データ取得失敗' },
            { status: 500 }
        );
    }

}

