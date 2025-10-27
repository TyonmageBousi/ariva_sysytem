'use client';

import type { StaticImageData } from 'next/image';
import ProductDetail from './ProductDetail';

type ProductImage = {
    label: StaticImageData;
    alt: string;
};

type Props = {
    productTitle: string[];
    productImages: ProductImage[][];
    productExplain: string[]
    productPrice: string[]
};

export default function ProductDetails({ productTitle, productImages, productExplain, productPrice }: Props) {
    return (
        <div className="flex justify-between w-[90%] mx-auto">
            {productImages.map((productImages, index) => (
                <ProductDetail
                    key={index}
                    productTitle={productTitle[index]}
                    productImages={productImages}
                    productExplain={productExplain[index]}
                    productPrice={productPrice[index]}
                />
            ))}
        </div>
    );
}
