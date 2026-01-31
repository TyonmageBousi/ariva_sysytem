import { getProductList } from '@/lib/repositories/productInventoryRepositories'
import { searchProductSchema } from '@/app/schemas/searchProduct'
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const getNum = (key: string) => {
            const v = searchParams.get(key);
            return v === null ? undefined : Number(v);
        };

        const name = searchParams.get("name") ?? undefined;
        const skuCode = searchParams.get("skuCode") ?? undefined;

        const startPrice = getNum("startPrice");
        const endPrice = getNum("endPrice");

        const categoryIds = searchParams.getAll("categoryIds").map(Number).filter(Number.isFinite);
        const colorIds = searchParams.getAll("colorIds").map(Number).filter(Number.isFinite);

        const page = Number(searchParams.get("page") ?? "1");

        const data = { name, skuCode, startPrice, endPrice, categoryIds, colorIds, page };

        const addQuery = searchProductSchema.parse(data)

        const productList = await getProductList(page, addQuery);

        return NextResponse.json({ success: true, data: productList },
            { status: 200 })

    }
    catch (error) {
    }
}