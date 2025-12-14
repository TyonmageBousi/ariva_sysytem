import { NextResponse } from 'next/server';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { db, insertStorage, client } from '@/lib/db'
import { NewProductSchema } from '@/app/schemas/product'
import {  handleError, ValidationError } from '@/lib/errors'
import { ZodError } from 'zod';

export async function POST(request: Request) {

    try {
        const formdata = await request.formData();

        const imageEntries = formdata.getAll('images')

        const data = Object.fromEntries(formdata);

        const result = NewProductSchema.parse(data);

        const uploadResults: string[] = await insertStorage(imageEntries)


        await db.transaction(async (tx) => {
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
            return NextResponse.json(
                {
                    success: true,
                },
                { status: 200 }
            );
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return handleError(new ValidationError(error.issues));
        }
        return handleError(error);
    } finally {
        await client.end();
    }
}