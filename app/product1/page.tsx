'use client';

import { useScroll, useTransform, useMotionValueEvent, useSpring, motion } from 'framer-motion';
import Header from '../Component/Header';

import SwiperSlider from '../Component/SwiperSlider';
import { useEffect, useRef, useState } from 'react';
import { TitleInfo } from '../Component/Product';


import tyoko1 from './assets/production/tyoko1.png';
import tyoko2 from './assets/production/tyoko2.png';
import tyoko3 from './assets/production/tyoko3.png';
import tyoko4 from './assets/production/tyoko4.png';
import image1 from '../assets/line-up/image1.png';
import image2 from '../assets/line-up/image2.png';
import image3 from '../assets/line-up/image3.png';
import image4 from '../assets/line-up/image4.png';
import type { StaticImageData } from 'next/image';

type Slide = {
    label: StaticImageData;
};

const slides: Slide[] = [
    { label: tyoko1 },
    { label: tyoko2 },
    { label: tyoko3 },
    { label: tyoko4 },
];

const otherProducts = [
    { label: tyoko1, alt: '商品画像1' },
    { label: tyoko2, alt: '商品画像2' },
    { label: tyoko3, alt: '商品画像3' },
    { label: tyoko4, alt: '商品画像4' },
];

const mainTitle: TitleInfo = {
    title: 'Classic Chocolate',
    subtitle: 'はじまりのレシピ、名前のない衝動',
    description: 'カカオと出会った最初の感情。まだ誰にも知られていないレシピが、湧き上がる衝動に導かれる。',
};

const productTitles = ['ちょんまげチョコ', 'ちょんまげチョコ', 'ちょんまげチョコ'];

const productImageGroups = [
    [image1, image2, image3, image4].map((img, i) => ({ label: img, alt: `商品画像${i + 1}` })),
    [image1, image2, image3, image4].map((img, i) => ({ label: img, alt: `商品画像${i + 1}` })),
    [image1, image2, image3, image4].map((img, i) => ({ label: img, alt: `商品画像${i + 1}` })),
];

const productExplains = [
    '和風テイストのチョコレートに、ちょんまげのユーモアを加えた逸品。',
    '京都の老舗が監修した、伝統と革新の融合。',
    '口どけと風味にこだわった、大人向けスイーツ。',
];
const productPrices = ['¥1,200（税込）', '¥1,500（税込）', '¥1,800（税込）'];

const otherProductTitles = [
    'はじまりのレシピ、名前のない衝動',
    '甘い反抗期、舌先のキスは唐辛子',
    '静けさの革命、和をほどいて編む',
    '期間限定',
];
export default function Index() {
    const { scrollY } = useScroll();
    const [isFixed, setIsFixed] = useState(true);
    const [releasedTop, setReleasedTop] = useState(0);
    const tickingRef = useRef(false);

    const offsetY = 100; // fixed表示時のtopオフセット

    useEffect(() => {
        const onScroll = () => {
            if (!tickingRef.current) {
                requestAnimationFrame(() => {
                    const currentScroll = window.scrollY;
                    const stopY = window.innerHeight * 0.5;
                    const buffer = 20;

                    if (currentScroll >= stopY - buffer && isFixed) {
                        setReleasedTop(currentScroll + offsetY); // ← スクロール位置を記録
                        setIsFixed(false);
                    } else if (currentScroll < stopY - buffer && !isFixed) {
                        setIsFixed(true);
                    }

                    tickingRef.current = false;
                });
                tickingRef.current = true;
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [isFixed]);

    // 画面幅に応じた width のアニメーション
    const widthRaw = useTransform(scrollY, [0, 200], ['100%', '50%']);
    const width = useSpring(widthRaw, { stiffness: 70, damping: 20 });

    return (
        <div style={{ height: '500vh', padding: '20px', position: 'relative' }}>
            <Header />

            <motion.div
                className="z-20 overflow-hidden h-[90vh] relative"
                style={{
                    position: isFixed ? 'fixed' : 'absolute',
                    top: isFixed ? 100 : releasedTop, // ←ここがポイント！
                    width,
                    transformOrigin: 'left center',
                    left: 20, // ←追加（固定時のずれ防止）
                }}
            >
                <div className="w-screen">
                    <SwiperSlider
                        slides={slides}
                        interval={3000}
                        duration={800}
                        slidesPerView={1}
                        loop={true}
                        style="z-10 w-full h-screen object-cover block rounded-[2%]"
                    />
                </div>
            </motion.div>

            {/* タイトル（固定表示） */}
            <div className="z-30 fixed top-[50%] text-white px-6">
                <p className="text-4xl font-bold drop-shadow-lg">{mainTitle.title}</p>
                <p className="text-xl mt-2 drop-shadow">{mainTitle.subtitle}</p>
            </div>

            {/* 商品説明 */}
            <div className="absolute top-[30%] left-1/2 translate-x-[10%] text-left">
                <p>クラシックチョコレート</p>
                <p>「はじまりのレシピ、名前のない衝動」</p>
                <p>
                    カカオと出会った最初の感情。まだ誰にも知られていないレシピが、湧き上がる衝動に導かれる。
                </p>
            </div>
        </div>
    );



