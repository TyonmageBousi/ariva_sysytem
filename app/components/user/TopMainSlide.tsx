'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { StaticImageData } from 'next/image';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { motion } from "framer-motion";
import 'swiper/css/effect-flip';
import React, { useState, useEffect } from 'react';
//DBに置き換える予定
import slide1 from '../../assets/main-slide/slide1.png';
import slide2 from '../../assets/main-slide/slide2.png';
import slide3 from '../../assets/main-slide/slide3.png';
import slide4 from '../../assets/main-slide/slide4.png';
import slide5 from '../../assets/main-slide/slide5.png';


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

const radius: number = 400; // レイアウトで使用している円の半径:400px

export default function TopMainSlide() {

    const characters: string = "Velour Cacao – Treat Yourself – "; //回転の文字の内容
    const charArray: string[] = characters.split(''); //上記の文字を一文字づつ配列に格納
    const [isVisible, setIsVisible] = useState<boolean>(true);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsVisible(scrollY < 1000);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={
            'flex h-[93vh] mt-[7vh] w-full transition-all duration-500 ' +
            (isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-8'
            )
        }>
            <div className='relative w-[50%] '>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="relative">
                        <div
                            className="relative animate-spin"
                            style={{
                                width: `${radius * 2}px`,
                                height: `${radius * 2}px`,
                                animationDuration: '10s',
                            }}
                        >
                            {charArray.map((char, index) => {
                                const angle = (index / charArray.length) * 2 * Math.PI;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                return (
                                    <span
                                        key={index}
                                        className="absolute text-2xl font-bold text-yellow-300"
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,

                                        }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <motion.div
                    className='w-full h-[93vh]'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Swiper
                        style={{ width: '100%', height: '100%' }}
                        direction="vertical"
                        modules={[Autoplay]}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        speed={800}
                    >
                        {slideImages.map((slideImage, index) => (
                            <SwiperSlide
                                key={index}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100%'
                                }}
                            >
                                <Image
                                    className="w-[60%] aspect-square object-cover rounded-lg"
                                    src={slideImage.src}
                                    alt={slideImage.alt}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
            <div className='relative w-[50%]'>
                <motion.p
                    initial={{ y: +20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "tween",
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className='text-9xl mt-[25vh] underline decoration-3'>
                    Velour Cacao</motion.p>

                <motion.p
                    initial={{ y: +20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "tween",
                        duration: 0.9,
                        ease: "easeInOut",
                    }}
                    className="text-6xl mt-[10vh] underline decoration-3">自分へのご褒美に</motion.p>
                <motion.p
                    initial={{ y: +20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: "tween",
                        duration: 1.0,
                        ease: "easeInOut",
                    }}
                    className=" text-3xl mt-[5vh] underline decoration-3">
                    日々の忙しさのなかでひとつくらいご褒美があってもいいじゃない
                    そんな思いで作りました</motion.p>
            </div>
        </div >

    );
}
