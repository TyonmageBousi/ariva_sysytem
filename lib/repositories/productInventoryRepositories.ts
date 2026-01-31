import { db } from "@/lib/db";

import { searchProductSchema, SearchProductValues } from '@/app/schemas/searchProduct'
import { eq, and, gte, lte, like, inArray, desc, count } from "drizzle-orm";
import { products, productCategories, productColors } from "@/lib/schema";

export const baseQuery = {
    columns: {
        id: true,
        skuCode: true,
        name: true,
        price: true,
        discountPrice: true,
    },
    with: {
        productCategories: {
            with: { category: { columns: { id: true } } },
        },
        productColors: {
            with: { colorCategory: { columns: { id: true } } },
        },
        productImages: { columns: { filePath: true } },
    },
} as const;


export async function getProductList(currentPage: number, addQuery?: SearchProductValues,) {
    console.log('検索条件です', addQuery);

    try {
        const conditions = [];



        if (addQuery) {

            if (addQuery.name) {
                conditions.push(like(products.name, `%${addQuery.name}%`));
            }

            if (addQuery.skuCode) {
                conditions.push(like(products.skuCode, `%${addQuery.skuCode}%`));
            }

            if (addQuery.startPrice) {
                conditions.push(gte(products.price, addQuery.startPrice));
            }

            if (addQuery.endPrice) {
                conditions.push(lte(products.price, addQuery.endPrice));
            }

            if (addQuery.categoryIds && addQuery.categoryIds.length > 0) {
                conditions.push(
                    inArray(
                        products.id,
                        db.select({ id: productCategories.productId })
                            .from(productCategories)
                            .where(inArray(productCategories.categoryId, addQuery.categoryIds))
                    )
                );
            }
            if (addQuery.colorIds && addQuery.colorIds.length > 0) {
                conditions.push(
                    inArray(
                        products.id,
                        db.select({ id: productColors.productId })
                            .from(productColors)
                            .where(inArray(productColors.colorId, addQuery.colorIds))
                    )
                );
            }
        }

        //12件の商品を取得
        const rawProducts = await db.query.products.findMany({
            ...baseQuery,
            where: conditions.length > 0 ? and(...conditions) : undefined,
            orderBy: [desc(products.createdAt)],
            limit: 12,
            offset: (currentPage - 1) * 12
        });

        //データ整理
        const productList = rawProducts.map(product => ({
            id: product.id,
            skuCode: product.skuCode,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            imageUrl: product.productImages[0]?.filePath || null,
            categoryIds: product.productCategories.map(pc => pc.category.id),
            colorIds: product.productColors.map(pc => pc.colorCategory.id),
        }));

        return productList;

    } catch (error) {
        console.error('getProductList failed', error);
        throw error;
    }

}