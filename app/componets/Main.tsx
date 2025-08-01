'use client';

import type { StaticImageData } from 'next/image';
import SwiperSlider from './SwiperSlider'; 

//DBに置き換える予定
import slide1 from '../assets/main-slide/slide1.png';
import slide2 from '../assets/main-slide/slide2.png';
import slide3 from '../assets/main-slide/slide3.png';
import slide4 from '../assets/main-slide/slide4.png';
import slide5 from '../assets/main-slide/slide5.png';


type Slide = {
    src: StaticImageData;
};

const slides: Slide[] = [
    { src: slide1 },
    { src: slide2 },
    { src: slide3 },
    { src: slide4 },
    { src: slide5 },
];

export default function MainSlide() {
    return (
        <div className="relative">
            <SwiperSlider slideImages={slides} interval={3000} duration={800} slidesPerView={1} loop= {true} />
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
