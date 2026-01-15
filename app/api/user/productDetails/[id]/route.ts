
import { eq, not, sql } from 'drizzle-orm';
import { products } from '@/lib/schema'
import { NextResponse } from 'next/server';
import { db, client } from '@/lib/db'
import { AppError, handleError } from '@/lib/errors'
import { productGetQuery } from '@/app/api/admin/productList/route';

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

        if (isNaN(productId)) {
            throw new AppError({ message: '数字型のIDじゃありません', statusCode: 404, errorType: 'PARAMS_NOT_NUMBER' })
        }
        const productList = await db.query.products.findMany({
            ...productGetQuery,
            where: not(eq(products.id, productId)),
            orderBy: sql`RANDOM()`,
            limit: 20,
        });
        const data = productList.map((product) => {
            const categoriesName = product.productCategories.map(
                (category) => String(category.category.id)
            );
            const colorName = product.productColors.map(
                (colorCategory) => String(colorCategory.colorCategory.id)
            );
            const imageUrl = product.productImages.map(
                (productImage) =>
                    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${productImage.filePath}`
            );
            return ({
                ...product,
                productImages: imageUrl,
                productCategories: categoriesName,
                productColors: colorName

            })
        })
        return NextResponse.json({ success: true, data: data },
            { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

