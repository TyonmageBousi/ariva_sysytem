import { ProductDetailData } from '@/app/user/products/[id]/ProductDetail'
import { ProductDetailsData } from '@/app/user/products/[id]/ProductGallery'
import ProductContainer from '@/app/user/products/[id]/ProductContainer'


async function fetchUrl<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(url, options);
    const result = await res.json();

    if (!res.ok) throw new Error(result);
    if (!result.success) throw new Error(result)
    return result.data
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {

    const paramId = await params;
    const id = paramId.id;

    let productDetail: ProductDetailData | null = null;
    let productDetails: ProductDetailsData[] | null = null;


    try {

        [productDetail, productDetails] = await Promise.all([
            fetchUrl<ProductDetailData>
                (`${process.env.NEXT_PUBLIC_API_URL}/api/admin/productDetail/${id}`),
            fetchUrl<ProductDetailsData[]>
                (`${process.env.NEXT_PUBLIC_API_URL}/api/user/productDetails?id=${id}`)
        ]);

        return (
            <ProductContainer
                productDetail={productDetail}
                productDetails={productDetails}
            />
        );
    }
    catch (error) {

    }
}


