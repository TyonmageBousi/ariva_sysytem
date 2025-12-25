import { eq, sql } from 'drizzle-orm';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { NextResponse } from 'next/server';
import { db, client } from '@/lib/db'
import { AppError, handleError } from '@/lib/errors'

type Params = {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {

    const { id } = params
    const productId = parseInt(id);
    if (isNaN(productId)) {
        throw new AppError({ message: '数字型のIDじゃありません', statusCode: 420, errorType: 'PARAMS_NOT_NUMBER' })
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
            .limit(1);

        if ((!result) || result.length === 0) {
            throw new AppError({
                message: '商品が見つかりません',
                statusCode: 404,
                errorType: 'PRODUCT_NOT_FOUND'
            })
        }

        return NextResponse.json({ success: true, result: result[0] }, { status: 200 })

    } catch (error) {
        return handleError(error)
    } finally {
        await client.end();
    }

}

