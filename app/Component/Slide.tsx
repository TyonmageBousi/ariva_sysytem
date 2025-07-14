'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import slide1 from '../assets/main-slide/slide1.png';
import slide2 from '../assets/main-slide/slide2.png';
import slide3 from '../assets/main-slide/slide3.png';
import slide4 from '../assets/main-slide/slide4.png';
import slide5 from '../assets/main-slide/slide5.png';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

type Slide = {
    label: StaticImageData
}
const slide: Slide[] = [
    { label: slide1 },
    { label: slide2 },
    { label: slide3 },
    { label: slide4 },
    { label: slide5 }
];

let interval: number = 3000; // スライド切り替えの間隔（ms）
let duration: number = 700;  // スライドアニメーション時間（ms）

export default function Slide() {
    return (
        <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: interval,
                disableOnInteraction: false,
            }}
            speed={duration}
        >
            {slide.map((item, index) => (
                <SwiperSlide key={index}><Image className="relative z-10 w-full h-[77vh] object-cover block rounded-[2%]" src={item.label} alt={`Slide ${index + 1}`} /></SwiperSlide>
            ))}
            <div className="absolute top-[80%]  z-20">
                <p className="text-[3.5rem] my-2.5">自分へのご褒美に</p>
                <p className="text-[1.5rem] my-2.5">日々の忙しさのなかでひとつくらいご褒美があってもいいじゃないそんな思いで作りました</p>
            </div>
        </Swiper>
    );
};