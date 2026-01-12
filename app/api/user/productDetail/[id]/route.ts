import { eq, sql } from 'drizzle-orm';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { NextResponse } from 'next/server';
import { db, client } from '@/lib/db'
import { AppError, handleError } from '@/lib/errors'

type Params = {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Params) {

    const { id } = await params

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
        SELECT json_agg(file_path)           
        FROM product_images                  
        WHERE product_id = ${products.id}    
    )`,
            categories: sql<number[]>`(
        SELECT json_agg(category_id)         
        FROM product_categories             
        WHERE product_id = ${products.id}
    )`,
            productColors: sql<number[]>`(
        SELECT json_agg(color_id)           
        FROM product_colors                
        WHERE product_id = ${products.id}
    )`,
        })
            .from(products)
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

