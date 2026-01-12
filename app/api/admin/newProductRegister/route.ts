import { NextResponse } from 'next/server';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { db, insertStorage, deleteStorage } from '@/lib/db'
import { NewProductSchema } from '@/app/schemas/product'
import { handleError, ValidationError, AppError } from '@/lib/errors'
import { ZodError } from 'zod';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {

    try {
        const formdata = await request.formData();
        const data = {
            id: formdata.get('id') ? Number(formdata.get('id')) : undefined,
            name: formdata.get('name') as string,
            skuCode: formdata.get('skuCode') as string,
            price: Number(formdata.get('price')),
            discountPrice: formdata.get('discountPrice') ? Number(formdata.get('discountPrice')) : undefined,
            saleStartAt: new Date(formdata.get('saleStartAt') as string),
            saleEndAt: new Date(formdata.get('saleEndAt') as string),
            status: formdata.get('status') as string,
            stock: Number(formdata.get('stock')),
            description: formdata.get('description') as string,
            categoryIds: formdata.getAll('categoryIds').map(String),
            colorIds: formdata.getAll('colorCategoryIds').map(String),
            images: formdata.getAll('images'),
            defaultImages: formdata.getAll('defaultImages'),
        };
        const result = NewProductSchema.parse(data);

        const existingProduct =
            await db.select()
                .from(products)
                .where(eq(products.skuCode, result.skuCode))
                .limit(1);

        if (existingProduct.length > 0) {
            throw new AppError(
                {
                    message: 'SKU_CODEが一意ではありません。',
                    statusCode: 400,
                    errorType: 'VALIDATION_ERROR'

                }
            )
        }

        const uploadResults: string[] = await insertStorage(data.images)


        await db.transaction(async (tx) => {
            if (data.id) {
                const findData = await db.select().from(products).where(eq(products.id, data.id)).limit(1);
                if (findData.length > 0) {
                    const deleteImages = await tx.select({ "filePath": productImages.filePath }).from(productImages).where(eq(productImages.productId, data.id))
                    const filePaths = deleteImages.map((deleteImage) => deleteImage.filePath);
                    const deletePaths = filePaths.filter((filePath) => !data.defaultImages.includes(filePath))
                    if (deletePaths.length) {
                        await deleteStorage(deletePaths);
                    }
                    await Promise.all([
                        tx.delete(products).where(eq(products.id, data.id)),
                        tx.delete(productCategories).where(eq(productCategories.productId, data.id)),
                        tx.delete(productColors).where(eq(productColors.productId, data.id)),
                        tx.delete(productImages).where(eq(productImages.productId, data.id))
                    ])
                    const defaultPaths = filePaths.filter((filePath) => data.defaultImages.includes(filePath))
                    if (defaultPaths.length !== 0) {
                        const parts = defaultPaths
                            .map((defaultPath) => (defaultPath.split('/').pop()))
                            .filter((part): part is string => part !== undefined && part !== '')
                        uploadResults.push(...parts)
                    }
                }
                const insertProduct = await tx.insert(products).values({
                    name: result.name,
                    skuCode: result.skuCode,
                    price: result.price,
                    discountPrice: result.discountPrice,
                    saleStartAt: result.saleStartAt,
                    saleEndAt: result.saleEndAt,
                    status: result.status,
                    stock: result.stock,
                    description: result.description,
                }).returning({ productId: products.id });

                await Promise.all([
                    ...uploadResults.map((uploadImage) => (
                        tx.insert(productImages).values({
                            productId: insertProduct[0].productId,
                            filePath: uploadImage
                        })
                    )),

                    ...(result.categoryIds?.map((categoryId) => (
                        tx.insert(productCategories).values({
                            productId: insertProduct[0].productId,
                            categoryId: Number(categoryId)
                        })
                    )) ?? []),

                    ...(result.colorIds?.map((colorId) => (
                        tx.insert(productColors).values({
                            productId: insertProduct[0].productId,
                            colorId: Number(colorId)
                        })
                    )) ?? [])
                ])
            }
        })
        return NextResponse.json(
            {
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return handleError(new ValidationError(error.issues));
        }
        return handleError(error);
    }
}