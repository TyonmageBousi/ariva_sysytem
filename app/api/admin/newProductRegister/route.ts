import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { db, insertStorage } from '@/lib/db'
import { NewProductSchema } from '@/app/schemas/product'


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {

    try {
        const formdata = await request.formData();

        const imageEntries = formdata.getAll('images')

        const data = Object.fromEntries(formdata);

        const result = NewProductSchema.parse(data);

        const uploadResults: string[] = await insertStorage(imageEntries)


        await db.transaction(async (tx) => {
            const insertProduct = await tx.insert(products).values({
                name: String(result.name),
                skuCode: String(result.skuCode),
                price: Number(result.price),
                discountPrice: Number(result.discountPrice),
                saleStartAt: new Date(String(result.saleStartAt)),
                saleEndAt: new Date(String(result.saleEndAt)),
                status: String(result.status),
                stock: Number(result.stock),
                description: String(result.description),
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
                        productId: Number(insertProduct[0].productId),
                        categoryId: Number(categoryId)
                    })
                )) ?? []),

                ...(result.colorIds?.map((colorId) => (
                    tx.insert(productColors).values({
                        productId: Number(insertProduct[0].productId),
                        colorId: Number(colorId)
                    })
                )) ?? [])
            ])
            return NextResponse.json({ ok: true, formdata });
        })
    } catch (err) {
        console.error('エラー:', err);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}