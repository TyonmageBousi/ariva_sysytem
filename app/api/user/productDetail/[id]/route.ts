import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { products } from '@/lib/schema'
import { AppError, handleError } from '@/lib/errors'
import { productGetQuery } from '@/app/api/admin/productList/route';
import { eq } from 'drizzle-orm';

type Params = {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Params) {

    const { id } = await params

    const productId = parseInt(id);

    try {

        if (isNaN(productId)) {
            throw new AppError({ message: '数字型のIDじゃありません', statusCode: 404, errorType: 'PARAMS_NOT_NUMBER' })
        }

        const product = await db.query.products.findFirst({
            ...productGetQuery,
            where: eq(products.id, productId),
        })

        if (!product) {
            throw new AppError({
                message: '商品が見つかりません',
                statusCode: 404,
                errorType: 'PRODUCT_NOT_FOUND'
            })
        }
        
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
        const data = {
            ...product,
            productCategories: categoriesName,
            productColors: colorName,
            productImages: imageUrl
        }
        return NextResponse.json({ success: true, result: data }, { status: 200 })

    } catch (error) {
        return handleError(error)
    }

}

