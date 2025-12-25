import ProductDetail, { ProductDetailData } from '@/app/components/user/product/ProductDetail'
import ProductDetails, { ProductDetailsData } from '@/app/components/user/product/ProductDetails'

type Props = {
    productDetail: ProductDetailData,
    productDetails: ProductDetailsData[]
}

export default function ProductPage({ productDetail, productDetails }: Props) {
    return (
        <div className='relative'>
            <ProductDetail productDetailData={productDetail} />
            <ProductDetails productDetailsData={productDetails} />
            <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-950 to-black z-50'>
                <div className='text-center text-amber-100'>
                    <h2 className='text-7xl font-bold mb-6'>白十字</h2>
                    <p className='text-2xl opacity-80'>伝統と革新が織りなす、至福のひととき</p>
                </div>
            </div>
        </div>
    );

}