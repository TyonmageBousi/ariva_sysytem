'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

type SlideImage  = {
    src: StaticImageData;
};

type Props = {
    slideImages: SlideImage [];
    interval: number;
    duration: number;
    slidesPerView: number;
    loop: boolean
};


export default function SwiperSlider({ slideImages, interval, duration, slidesPerView, loop }: Props) {
    return (
        <Swiper
            modules={[Autoplay]}
            slidesPerView={slidesPerView}
            loop={loop}
            autoplay={{ delay: interval, disableOnInteraction: false }}
            speed={duration}
        >
            {slideImages.map((slideImage, index) => (
                <SwiperSlide key={index}>
                    <Image
                        className="z-10 w-full h-[77vh] object-cover block rounded-lg"
                        src={slideImage.src}
                        alt={`Slide ${index + 1}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
