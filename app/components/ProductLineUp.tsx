'use client';

import type { StaticImageData } from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

//DBに格納予定
import image1 from '../assets/line-up/image1.png';
import image2 from '../assets/line-up/image2.png';
import image3 from '../assets/line-up/image3.png';
import image4 from '../assets/line-up/image4.png';

type Props = {
    titleCss: string;
};


type ProductsInfo = {  //修正箇所
    src: StaticImageData;
    tagLabel: boolean;
    name: string;
    price: number;
    description: string;
};

const productsInfo: ProductsInfo[] = [{
    src: image1,
    tagLabel: true,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
}, {
    src: image2,
    tagLabel: true,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
},
{
    src: image3,
    tagLabel: false,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
}, {
    src: image4,
    tagLabel: false,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
},
{
    src: image2,
    tagLabel: true,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
}]


export default function ProductLineUp({ titleCss }: Props) {
    return (
        <div>
            <p className={titleCss}>Line Up</p>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={4}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                speed={800}
                spaceBetween={20}
            >
                {productsInfo.map((productInfo, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            className="aspect-square"
                            src={productInfo.src}
                            alt={`Slide ${index + 1}`}
                        />
                        <p
                            className={`inline-block px-2 py-1 text-sm font-semibold rounded-full mt-4 
                                ${productInfo.tagLabel ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                        >
                            {productInfo.tagLabel ? '期間限定' : '通年販売'}
                        </p>
                        <div className="flex justify-between items-center px-4 mt-4">
                            <p className="text-lg font-bold">{productInfo.name}</p>
                            <p className="text-base font-semibold">¥{productInfo.price}円</p>
                        </div>

                        <p className="mt-4 text-sm">{productInfo.description}</p>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
