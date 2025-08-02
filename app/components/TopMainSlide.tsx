'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { StaticImageData } from 'next/image';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
//DBに置き換える予定
import slide1 from '../assets/main-slide/slide1.png';
import slide2 from '../assets/main-slide/slide2.png';
import slide3 from '../assets/main-slide/slide3.png';
import slide4 from '../assets/main-slide/slide4.png';
import slide5 from '../assets/main-slide/slide5.png';


type SlideImage = {
    src: StaticImageData;
    alt: string;
};

const slideImages: SlideImage[] = [
    { src: slide1, alt: "" },
    { src: slide2, alt: "" },
    { src: slide3, alt: "" },
    { src: slide4, alt: "" },
    { src: slide5, alt: "" },
];

export default function TopMainSlide() {
    return (
        <div className="relative">
            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                speed={800}
            >
                {slideImages.map((slideImage, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            className="z-10 w-full h-[77vh] object-cover block rounded-lg"
                            src={slideImage.src}
                            alt={slideImage.alt}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute top-[80%] z-20 text-white px-6">
                <p className="text-[3.5rem] my-2.5">自分へのご褒美に</p>
                <p className="text-[1.5rem] my-2.5">
                    日々の忙しさのなかでひとつくらいご褒美があってもいいじゃない
                    そんな思いで作りました
                </p>
            </div>
        </div>
    );
}
