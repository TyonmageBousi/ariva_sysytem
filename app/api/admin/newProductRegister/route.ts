import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { db } from '@/lib/db'
import { NewProductSchema } from '@/app/schemas/product'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // サーバー側は service_role を使う
);

export async function POST(request: Request) {

    try {
        const formdata = await request.formData();
        const data = Object.fromEntries(formdata);
        const result = NewProductSchema.safeParse(data)
        if (!result.success) {
            return Response.json({
                success: false,
                error: '入力に誤りがあります。'
            },
                { status: 400 });
        }
        const imageEntries = formdata.getAll('images')
        const imagesFiles = imageEntries.filter(entry => entry instanceof File) as File[];
        const uploadImages = imagesFiles.map(async (image) => {
            const { data, error } = await supabase.storage
                .from('images')
                .upload(`images/${Date.now()}-${image.name}`, image);
            if (error) {
                console.error('upload error:', error);
                throw error
            }
            return data.path;
        })
        const uploadResults = await Promise.all(uploadImages)
        const insertProduct = await db.insert(products).values({
            name: String(data.name),
            skuCode: String(data.skuCode),
            price: Number(data.price),
            discountPrice: Number(data.discountPrice),
            saleStartAt: new Date(String(data.saleStartAt)),
            saleEndAt: new Date(String(data.saleEndAt)),
            status: String(data.status),
            stock: Number(data.stock),
            description: String(data.description),
        }).returning({ productId: products.id });

        await Promise.all(
            uploadResults.map((uploadImage) => (
                db.insert(productImages).values({
                    productId: insertProduct[0].productId,
                    filePath: uploadImage
                })
            )));
        await Promise.all(
            formdata.getAll('categoryIds').map((categoryId) => (
                db.insert(productCategories).values({
                    productId: Number(insertProduct[0].productId),
                    categoryId: Number(categoryId)
                })
            ))
        )
        await Promise.all(
            formdata.getAll('colorCategoryIds').map((colorCategoryId) => (
                db.insert(productColors).values({
                    productId: Number(insertProduct[0].productId),
                    colorId: Number(colorCategoryId)
                })
            ))
        )
        return NextResponse.json({ ok: true, formdata });
    }
    catch (err) {
        console.error('エラー:', err);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}