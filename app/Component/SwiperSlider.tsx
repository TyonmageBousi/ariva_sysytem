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
    slides: Slide[];
    interval: number;
    duration: number;
    slidesPerView: number;
    loop: boolean
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