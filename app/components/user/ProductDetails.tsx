'use client';

import type { StaticImageData } from 'next/image';
import ProductDetail from './ProductDetail';

type ProductImage = {
    label: StaticImageData;
    alt: string;
};

type Props = {
    productTitles: string[];
    productImageGroups: ProductImage[][];
    productExplains: string[]
    productPrices: string[]
};

export default function ProductDetails({ productTitles, productImageGroups, productExplains, productPrices }: Props) {
    return (
        <div className="flex justify-between w-[90%] mx-auto">
            {productImageGroups.map((productImages, index) => (
                <ProductDetail
                    key={index}
                    productTitle={productTitles[index]}
                    productImages={productImages}
                    productExplain={productExplains[index]}
                    productPrice={productPrices[index]}
                />
            ))}
        </div>
    );
}
