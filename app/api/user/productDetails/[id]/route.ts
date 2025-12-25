
import { eq, not, sql } from 'drizzle-orm';
import { products, productImages } from '@/lib/schema'
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

      

        return NextResponse.json({ success: true, result: result }, { status: 200 })
    }
    catch (error) {
        return handleError(error)
    } finally {
        await client.end();
    }
}

