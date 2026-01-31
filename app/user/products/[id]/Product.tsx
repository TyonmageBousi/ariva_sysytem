import ProductDetail, { ProductDetailData } from '@/app/components/user/product/ProductDetail'
import ProductDetails, { ProductDetailsData } from '@/app/components/user/product/ProductDetails'

type Props = {
    productDetail: ProductDetailData,
    productDetails: ProductDetailsData[]
}

export default function Product({ productDetail, productDetails }: Props) {
    return (
        <div className='relative'>
            <ProductDetail productDetailData={productDetail} />
            <ProductDetails productDetailsData={productDetails} />
        </div>
    );

}