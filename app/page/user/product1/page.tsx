import { ProductDetailData } from '@/app/components/user/product/ProductDetail'
import { ProductDetailsData } from '@/app/components/user/product/ProductDetails'
import ProductPageC from '@/app/components/user/product/Product'
import { handleFrontError } from '@/lib/front-error';

type Props = {
    id: string
}

async function fetchUrl<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(url, options);
    const result = await res.json();
    if (!res.ok) throw new Error(result);
    if (!result.success) throw new Error(result)
    return result.data
}

export default async function ProductPage({ id }: Props) {
    const controller = new AbortController();

    let productDetail: ProductDetailData | null = null;
    let productDetails: ProductDetailsData[] | null = null;

    try {
        [productDetail, productDetails] = await Promise.all([
            fetchUrl<ProductDetailData>
                (`http://localhost:3000/api/user/productDetail/id=${id}`,
                    { signal: controller.signal }),
            fetchUrl<ProductDetailsData[]>
                (`http://localhost:3000/api/user/productDetails?id=${id}`,
                    { signal: controller.signal })
        ]);
        return (
            <ProductPageC productDetail={productDetail} productDetails={productDetails} />
        );
    }
    catch (error) {
        if (error instanceof Error)
            return handleFrontError(error)
    }
}


