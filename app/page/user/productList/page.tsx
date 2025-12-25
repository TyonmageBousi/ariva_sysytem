import { ProductList } from '@/app/types/productList'
import ProductListPage from '@/app/components/user/productList/productList'
import { handleFrontError } from '@/lib/front-error';



export default async function ProductListPagePage() {
    const controller = new AbortController();
    try {
        const res = await fetch('http://localhost:3000/api/user/productList', {
            signal: controller.signal
        });
        const result = await res.json();

        if (!res.ok) throw new Error(result)

        if (!result.success) throw new Error(result)

        const data: ProductList[] = result.data;

        return (
            <ProductListPage {...data} />
        )
    }
    catch (error) {
        if (error instanceof Error)
            return handleFrontError(error)
    }
}