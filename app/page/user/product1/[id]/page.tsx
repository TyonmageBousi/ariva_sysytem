import { ProductDetailData } from '@/app/components/user/product/ProductDetail'
import { ProductDetailsData } from '@/app/components/user/product/ProductDetails'
import Product from '@/app/components/user/product/Product'
import HandleFrontError from '@/app/components/error/error';


async function fetchUrl<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(url, options);
    const result = await res.json();

    if (!res.ok) throw new Error(result);
    if (!result.success) throw new Error(result)


    console.log(result);
    return result.data
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {

    const paramId = await params;
    const id = paramId.id;
    const controller = new AbortController();

    let productDetail: ProductDetailData | null = null;
    let productDetails: ProductDetailsData[] | null = null;


    try {

        [productDetail, productDetails] = await Promise.all([
            fetchUrl<ProductDetailData>
                (`${process.env.NEXT_PUBLIC_API_URL}/api/admin/productDetail/${id}`,
                    { signal: controller.signal }),
            fetchUrl<ProductDetailsData[]>
                (`${process.env.NEXT_PUBLIC_API_URL}/api/user/productDetails/${id}`,
                    { signal: controller.signal })
        ]);

        return (
            <Product
                productDetail={productDetail}
                productDetails={productDetails}
            />
        );
    }
    catch (error) {
        if (error instanceof Error)
            return <HandleFrontError {...error} />
    }
}


