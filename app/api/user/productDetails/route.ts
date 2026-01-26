
import { NextResponse } from 'next/server';
import { AppError, handleError } from '@/lib/errors'
import { productList, ProductList } from '@/lib/repositories/productDetailsRepositories';

export async function GET(request: Request,) {

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const productId = ((id: string | null): number | null => {

        if (id !== null) {
            const parsedId = parseInt(id);

            if (isNaN(parsedId)) {
                throw new AppError({ message: '数字型のIDじゃありません', statusCode: 420, errorType: 'PARAMS_NOT_NUMBER' })
            }
            return parsedId;
        }
        return null;
    })(id);


    try {

        const products: ProductList = await productList(productId);

        const data = products.map((product) => {
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

