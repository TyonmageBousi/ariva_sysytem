import { sql } from 'drizzle-orm';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { NextResponse } from 'next/server';
import { db, client, } from '@/lib/db'
import { AppError, handleError } from '@/lib/errors'


export async function GET() {

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

        return NextResponse.json({ success: true, result: result }, { status: 200 })
    } catch (error) {
        return handleError(error)
    } finally {
        await client.end();
    }

}