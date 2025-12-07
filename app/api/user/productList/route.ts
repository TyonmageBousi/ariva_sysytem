import { eq, sql } from 'drizzle-orm';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET(request: Request) {
        
    try {
        const result = await db.select({
            id: products.id,
            skuCode: products.skuCode,
            name: products.name,
            price: products.price,
            discountPrice: products.discountPrice,
            description: products.description,
            image: sql<string>`COALESCE(
                (SELECT ${productImages.filePath}
                FROM ${productImages}
                WHERE ${productImages.productId} = ${products.id}
                LIMIT 1),
                '' 
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
        if (!result) {
            return NextResponse.json(
                { error: '商品が見つかりません' },
                { status: 404 }
            );
        }
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            { error: 'データ取得失敗' },
            { status: 500 }
        );
    }
}