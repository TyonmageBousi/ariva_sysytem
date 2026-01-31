'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { ProductFormatted } from "@/app/types/responseProduct";

type Props = {
    titleCss: string
    data: ProductFormatted[]
};

export default function ProductLineUp({ titleCss: titleCss, data: productsInfo }: Props) {
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
                            className='aspect-square'
                            src={productInfo.src}
                            alt={`Slide ${index + 1}`}
                            width={0}
                            height={0}
                            sizes='60vw'
                            style={{ width: '60%', height: 'auto' }}
                        />
                        <p
                            className={`inline-block px-2 py-1 text-sm font-semibold rounded-full mt-4 
                                ${productInfo.tagLabel ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                        >
                            {productInfo.tagLabel ? '期間限定' : '通年販売'}
                        </p>
                        <div className='flex justify-between items-center px-4 mt-4'>
                            <p className='text-lg font-bold'>{productInfo.name}</p>
                            <p className='text-base font-semibold'>¥{productInfo.price}円</p>
                        </div>

                        <p className='mt-4 text-sm'>{productInfo.description}</p>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
