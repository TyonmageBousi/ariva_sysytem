import ProductDetail, { ProductDetailData } from '@/app/user/products/[id]/ProductDetail'
import ProductGallery, { ProductDetailsData } from '@/app/user/products/[id]/ProductGallery'
import CommercePolicy from '@/app/user/products/[id]/CommercePolicy'

type Props = {
    productDetail: ProductDetailData,
    productDetails: ProductDetailsData[]
}

export default function ProductContainer({ productDetail, productDetails }: Props) {
    return (
        <div className='relative'>
            <ProductDetail productDetailData={productDetail} />
            <CommercePolicy />
            <ProductGallery productDetailsData={productDetails} />
        </div>
    );

}