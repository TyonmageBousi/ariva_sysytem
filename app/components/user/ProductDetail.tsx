'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

type Slide = {
    label: StaticImageData;
    alt: string;
};

type Props = {
    productTitle: string;
    productImages: Slide[];
    productExplain: string;
    productPrice: string;
};

export default function ProductDetail({ productTitle, productImages, productExplain, productPrice }: Props) {

    const [mainIndex, setMainIndex] = useState(0);

    return (
        <div className="w-[30%]">
            <p>{productTitle}</p>

            <Image
                src={productImages[mainIndex].label}
                alt={productImages[mainIndex].alt}
                className="w-full h-auto mb-4 aspect-square object-cover rounded-[2%]"
                priority
            />

            <div className="flex gap-4 justify-between">
                {productImages.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setMainIndex(index)}
                    >
                        <Image
                            src={image.label}
                            alt={image.alt}
                            className={`w-24 h-auto aspect-square object-cover ${mainIndex === index ? 'border-2 border-white' : ''}`}
                        />
                    </button>
                ))}
            </div>
            <p>{productExplain}</p>
            <p>{productPrice}</p>
        </div>
    );
}
