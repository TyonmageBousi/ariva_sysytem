import { db } from "@/lib/db";
import { eq, not, sql } from "drizzle-orm";
import { products } from "@/lib/schema";

export const baseQuery = {
    columns: {
        id: true,
        skuCode: true,
        name: true,
        price: true,
        discountPrice: true,
        description: true,
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

export type ProductList = Awaited<ReturnType<typeof productList>>;

export async function productList(productId: number | null) {
    const productQuery = productId
        ? {
            ...baseQuery,
            where: not(eq(products.id, productId)),
            orderBy: sql`RANDOM()`,
            limit: 20,
        }
        : baseQuery;

    const productList = await db.query.products.findMany(productQuery);
    return productList;
}
