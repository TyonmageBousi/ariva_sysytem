import { db, deleteStorage } from '@/lib/db'
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { eq } from 'drizzle-orm';
import { handleError, AppError } from '@/lib/errors'
import { NextResponse } from 'next/server';

type Params = {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Params) {

    const { id } = await params

    const productId = parseInt(id);

    try {
        const product = await db.query.products.findFirst({
            where: eq(products.id, productId),
            with: {
                productImages: {
                    columns: { filePath: true }
                }
            }
        })

        if (!(product)) {
            throw new AppError(
                {
                    message: '削除対象の商品が見つかりません。',
                    statusCode: 404,
                    errorType: 'PRODUCT_NOT_FOUND'
                }
            )
        }

        const filePath = product.productImages.map((productImage) => productImage.filePath);

        await db.transaction(async (tx) => {

            await Promise.all([
                tx.delete(productCategories).where(eq(productCategories.productId, product.id)),
                tx.delete(productColors).where(eq(productColors.productId, product.id)),
                tx.delete(productImages).where(eq(productImages.productId, product.id))
            ])

            await tx.delete(products).where(eq(products.id, product.id));
        })
        deleteStorage(filePath);

        return NextResponse.json(
            { message: '商品を削除しました' },
            { status: 200 }
        );

    } catch (error) {
        return handleError(error)

    }

}