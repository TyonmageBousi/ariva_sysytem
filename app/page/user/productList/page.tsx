import { ProductList } from '@/app/types/productList'
import ProductListPage from '@/app/components/user/productList/productList'
import HandleFrontError from '@/app/components/error/error';

export default async function ProductListPagePage() {
    const controller = new AbortController();
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/productList`, {
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
            return (
                <HandleFrontError {...error} />
            )
    }
}