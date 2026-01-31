import { ProductList } from '@/app/types/productList';
import ProductListPage from '@/app/components/user/productList/productList';
import HandleFrontError from '@/app/components/error/error'
import ProductDetails, { ProductDetailsData } from '@/app/components/user/product/ProductDetails'

export default async function TopMainContainer({ titleCss }: { titleCss: string }) {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/productDetails`)

        const result = await res.json();

        if (!res.ok) throw new Error(result);

        if (!result.success) throw new Error(result)

        const productDetails: ProductDetailsData[] = result.data;
        if (productDetails.length === 0) {
            throw new Error(result);
        }
        return <ProductDetails productDetailsData={productDetails} />
    } catch (error) {
        if (error instanceof Error)
            return <HandleFrontError {...error} />
    }
}