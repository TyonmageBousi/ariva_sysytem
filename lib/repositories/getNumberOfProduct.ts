import { db } from "@/lib/db";
import { count } from "drizzle-orm";
import { products } from "@/lib/schema";

export async function getNumberOfProduct() {
    //全件の商品数取得
    const [{ value: totalCount }] = await db
        .select({ value: count() })
        .from(products);

    const totalPages = Math.ceil(totalCount / 12);

    return totalPages;
}