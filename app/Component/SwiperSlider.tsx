'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';

type Slide = {
    label: StaticImageData;
};

type Props = {
    slides: Slide[];            // スライド画像の配列
    interval: number;           // 自動切り替えの間隔（ミリ秒）
    duration: number;           // スライドの切り替え速度（ミリ秒）
    slidesPerView: number;      // 一度に表示する画像の数
    loop: boolean;              // スライドをループさせるかどうか
};



export default function SwiperSlider({ slides, interval, duration, slidesPerView, loop }: Props) {
    return (
        <Swiper
            modules={[Autoplay]}
            slidesPerView={slidesPerView}
            loop={loop}
            autoplay={{ delay: interval, disableOnInteraction: false }}
            speed={duration}
        >
            {slides.map((item, index) => (
                <SwiperSlide key={index}>
                    <Image
                        className="z-10 w-full h-[77vh] object-cover block rounded-[2%]"
                        src={item.label}
                        alt={`Slide ${index + 1}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}