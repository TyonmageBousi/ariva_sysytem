import { NextResponse } from 'next/server';
import { products } from '@/lib/schema'
import { db } from '@/lib/db'
import { newProductRegister } from '@/lib/repositories/newProductRegisterRepositories'
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

        if (existingProduct.length > 0 && !(data.id)) {
            throw new AppError(
                {
                    message: 'SKU_CODEが一意ではありません。',
                    statusCode: 400,
                    errorType: 'VALIDATION_ERROR'

                }
            )
        }

        await newProductRegister(result)
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