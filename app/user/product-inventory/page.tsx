
import { getAllCategories, getAllColorCategories } from '@/lib/db'
import ProductInventoryContainer from '@/app/user/product-inventory/productInventoryContainer'
import { getProductList } from '@/lib/repositories/productInventoryRepositories'
import { getNumberOfProduct } from '@/lib/repositories/getNumberOfProduct'

export default async function ProductInventoryPage() {

    //allSettledで失敗時、空配列を返す関数
    const unwrap = <T,>(
        r: PromiseSettledResult<T>,
        fallback: T,
        label: string
    ): T => {
        if (r.status === "fulfilled") return (r.value ?? fallback) as T;
        console.error(`${label} failed:`, r.reason);
        return fallback;
    };

    const currentPage = 1;

    try {
        //商品一覧、検索用のカテゴリを取得、どれか取得失敗しても、残りは表示できるように、allSettledを使用
        const settled = await Promise.allSettled([
            getProductList(currentPage),
            getAllCategories(),
            getAllColorCategories(),
            getNumberOfProduct()
        ]);

        const productList = unwrap(settled[0], [] as Awaited<ReturnType<typeof getProductList>>, "getProductList");
        const categories = unwrap(settled[1], [] as Awaited<ReturnType<typeof getAllCategories>>, "getAllCategories");
        const colorCategories = unwrap(settled[2], [] as Awaited<ReturnType<typeof getAllColorCategories>>, "getAllColorCategories");
        const NumberOfProducts = unwrap(settled[3], 0 as Awaited<ReturnType<typeof getNumberOfProduct>>, "getNumberOfProduct");


        return (
            <ProductInventoryContainer
                productList={productList}
                categories={categories}
                colorCategories={colorCategories}
                currentPage={currentPage}
                totalPages={NumberOfProducts}
            />
        )
    }
    catch (error) {
        // if (error instanceof Error)
        //     // return (
        //     //     <HandleFrontError {...error} />
        //     // )
    }
}