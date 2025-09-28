import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@/lib/schema';
import { products, productCategories, productColorCategories, productImages } from "@/lib/schema"
import { and, like, eq, gte, lte, inArray, exists } from 'drizzle-orm';
import { success } from 'zod';
import { createClient } from "@supabase/supabase-js";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // サーバー側は service_role を使う
);

export const db = drizzle(client, { schema });

export async function POST(request: Request) {

    try {
        const formData = await request.formData();
        const name = formData.get('name') as String;
        const skuCode = formData.get('skuCode') as String;
        const minimumPrice = formData.get('minimumPrice');
        const maxPrice = formData.get('maxPrice');
        const minimumSalePrice = formData.get('minimumSalePrice');
        const maxSalePrice = formData.get('maxSalePrice');
        const saleStartAt = formData.get('saleStartAt');
        const saleEndAt = formData.get('saleEndAt');
        const colorCategoryIds = formData.getAll('colorCategoryIds');
        const categoryIds = formData.getAll('categoryIds');
        const status = formData.get('status');
        const stock = formData.get('stock');
        const searchWhere = [];

        if (name && name.trim()) { searchWhere.push(like(products.name, `%${name}%`)) }
        if (skuCode && skuCode.trim()) { searchWhere.push(like(products.skuCode, `%${skuCode}%`)) }
        if (minimumPrice && !isNaN(Number(minimumPrice))) { searchWhere.push(gte(products.price, Number(minimumPrice))) }
        if (maxPrice && !isNaN(Number(maxPrice))) { searchWhere.push(lte(products.price, Number(maxPrice))) }
        if (minimumSalePrice && !isNaN(Number(minimumSalePrice))) { searchWhere.push(gte(products.discountPrice, Number(minimumSalePrice))) }
        if (maxSalePrice && !isNaN(Number(maxSalePrice))) { searchWhere.push(lte(products.discountPrice, Number(maxSalePrice))) }
        if (saleStartAt) { searchWhere.push(gte(products.saleStartAt, new Date(String(saleStartAt)))) }
        if (saleEndAt) { searchWhere.push(lte(products.saleEndAt, new Date(String(saleEndAt)))) }
        if (status && !isNaN(Number(status))) { searchWhere.push(eq(products.status, Number(status))) }
        if (colorCategoryIds && colorCategoryIds.length > 0) {
            searchWhere.push(
                exists(
                    db.select().from(productColorCategories)
                        .where(
                            and(
                                eq(productColorCategories.productId, products.id),
                                inArray(productColorCategories.colorId, colorCategoryIds.map((id => Number(id))))
                            )
                        )
                ))
        }
        if (categoryIds && categoryIds.length > 0) {
            searchWhere.push(
                exists(
                    db.select().from(productCategories)
                        .where(
                            and(
                                eq(productCategories.productId, products.id),
                                inArray(productCategories.categoryId, categoryIds.map((id => Number(id))))
                            )
                        )
                )
            )
        }
        const result = await db.select()
            .from(products)
            .where(searchWhere.length > 0 ? and(...searchWhere) : undefined)

        const productData = await Promise.all(
            result.map(async (product) => {
                const imagesPath = await db.select().
                    from(productImages)
                    .where(eq(productImages.productId, product.id))
                    .limit(1);

                let imageUrl = null;
                if (imagesPath.length > 0) {
                    const { data } = supabase.storage.from('images').getPublicUrl(imagesPath[0].filePath)
                    imageUrl = data.publicUrl;
                }
                const categories = await db.select({ categoryId: productCategories.categoryId }).
                    from(productCategories)
                    .where(eq(productCategories.productId, product.id),
                    )
                const colorCategories = await db.select({ colorId: productColorCategories.colorId }).
                    from(productColorCategories)
                    .where(eq(productColorCategories.productId, product.id),
                    )
                return {
                    name: product.name,
                    skuCode: product.skuCode,
                    price: product.price,
                    discountPrice: product.discountPrice,
                    saleStartAt: product.saleStartAt,
                    saleEndAt: product.saleEndAt,
                    status: product.status,
                    description: product.description,
                    categoryIds: categories,
                    colorIds: colorCategories,
                    stock: product.stock,
                    imagesUrl: imageUrl
                }
            }));
        return Response.json({
            success: true,
            data: productData
        })

    } catch (err) {

    }


}



