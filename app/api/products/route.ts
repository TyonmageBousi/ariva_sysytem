import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@supabase/supabase-js";
import { products, productImages, productCategories, productColors } from '@/lib/schema'
import { db } from '@/lib/db' // データベース接続


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // サーバー側は service_role を使う
);

export async function POST(request: Request) {

    try {
        const formdata = await request.formData();
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
            name: formdata.get('name') as string,
            skuCode: String(formdata.get('skuCode')),
            price: Number(formdata.get('price')),
            discountPrice: Number(formdata.get('discountPrice')),
            saleStartAt: new Date(formdata.get('saleStartAt') as string),
            saleEndAt: new Date(formdata.get('saleEndAt') as string),
            status: Number(formdata.get('status')),
            description: String(formdata.get('description')),
        }).returning({ productId: products.id });

        await Promise.all(
            uploadResults.map(async (uploadImage) => (
                await db.insert(productImages).values({
                    productId: insertProduct[0].productId,
                    filePath: uploadImage
                })
            )));


        await Promise.all(
            formdata.getAll("categoryIds").map(async (categoryId) => {
                await db.insert(productCategories).values({
                    productId: Number(insertProduct[0].productId),
                    categoryId: Number(categoryId)
                })
            })
        )
        await Promise.all(
            formdata.getAll("colorCategoryIds").map(async (colorCategoryId) => {
                await db.insert(productColors).values({
                    productId: Number(insertProduct[0].productId),
                    colorId: Number(colorCategoryId)
                })
            })
        )
        return NextResponse.json({ ok: true, formdata });
    }
    catch (err) {
        console.error('エラー:', err);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}




