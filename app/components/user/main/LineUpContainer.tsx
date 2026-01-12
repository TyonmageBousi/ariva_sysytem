import { ProductList } from '@/app/types/productList';
import ProductListPage from '@/app/components/user/productList/productList';
import HandleFrontError from '@/app/components/error/error'

export default async function TopMainContainer({ titleCss }: { titleCss: string }) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/productList`)

        const result = await res.json();

        if (!res.ok) throw new Error(result);

        if (!result.success) throw new Error(result)

        const data: ProductList[] = result.data;
        console.log("📦 result.data:", result.data);
        if (data.length === 0) {
            throw new Error(result);
        }
        return <ProductListPage productList={data} />
    } catch (error) {
        if (error instanceof Error)
            return <HandleFrontError {...error} />
    }
}