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
    const { scrollY } = useScroll();  //Y座標のスクロール量を取得
    const [isFixed, setIsFixed] = useState(true); //trueでfixed、falseでabsolute
    const [releasedTop, setReleasedTop] = useState(0);//topの高さを設定
    const tickingRef = useRef(false);  //連続発火を阻止

    const offsetY = 100; // fixed表示時の
    const [vh10, setVh10] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            if (!tickingRef.current) {
                requestAnimationFrame(() => {
                    const currentScroll = window.scrollY; //スクロール量を測定
                    const stopY = window.innerHeight * 0.8; //現在のブラウザの高さ*0.8
                    const buffer = 20;

                    if (currentScroll >= stopY - buffer && isFixed) { //現在のスクロール量が、半分以上かつ要素はfixedだったら、
                        setReleasedTop(currentScroll + offsetY); //現在のスクロール量＋元の要素の高さ
                        setIsFixed(false); //absoluteに変更
                    } else if (currentScroll < stopY - buffer && !isFixed) { //違うなら、
                        setIsFixed(true); //fixedに変更
                    }
                    tickingRef.current = false;
                });
                tickingRef.current = true;
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);

    }, [isFixed]);

    //要素を半分にするための高さを抽出するためのコード
    useEffect(() => {
        const updateVh = () => {
            setVh10(window.innerHeight * 0.08);
        };
        updateVh(); // 初回実行
        window.addEventListener('resize', updateVh);
        return () => window.removeEventListener('resize', updateVh);
    }, []);

    // 画面幅に応じた width のアニメーション
    const widthRaw = useTransform(scrollY, [0, vh10], ['100%', '50%']);
    const width = useSpring(widthRaw, { stiffness: 70, damping: 20 });

    return (
        <div style={{ height: '500vh', padding: '20px', position: 'relative' }}>
            <Header />

            <motion.div
                className="z-20 overflow-hidden h-[90vh] relative"
                style={{
                    position: isFixed ? 'fixed' : 'absolute',
                    top: isFixed ? 100 : releasedTop,
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
            {/* 商品説明 */}
            <div className="absolute top-[20%] left-1/2 translate-x-[10%] text-left z-100">
                <p className="text-4xl font-bold mb-2">{mainTitle.title}</p>
                <p className="text-2xl italic mb-4">{mainTitle.subtitle}</p>

                <p className="mb-4">
                    カカオと出会った、最初の感情。<br />
                    誰にも知られていないレシピが、湧き上がる衝動に導かれて生まれました。
                </p>

                <p className="mb-4">
                    ひとくちで広がる、はじまりの記憶。<br />
                    選び抜かれたカカオが、まるでまだ名前のない感情を語りかけるように、豊かに、そして力強く香ります。
                </p>

                <p className="mb-4">
                    レシピはシンプル。<br />
                    しかしその中には、初めてチョコレートと出会ったときの、あの純粋な衝動が宿っています。<br />
                    まだ何者でもなかった頃のピュアな情熱を封じ込めた、特別な一粒。<br />
                    クラシックでありながら、新しさを感じる——そんなチョコレートです。
                </p>

                <hr className="my-6" />

                <div className="space-y-2 text-sm">
                    <p><strong>消費期限：</strong> 製造日より30日</p>
                    <p><strong>保存方法：</strong> 直射日光・高温多湿を避け、冷暗所にて保存してください</p>
                    <p><strong>特定原材料等：</strong> 乳成分・大豆</p>
                    <p><strong>販売箇所：</strong> 白十字 各店舗および公式オンラインショップ</p>
                    <p><strong>値段：</strong> 税込 1,480円</p>
                    <p><strong>販売期間：</strong> 通年販売（※数量限定あり）</p>
                </div>

                <div className="mt-6">
                    <a
                        href="#"
                        className="inline-block bg-brown-700 hover:bg-brown-800 text-white text-sm font-semibold py-2 px-4 rounded transition"
                    >
                        ご購入はこちら
                    </a>
                </div>

            </div>
        </div>
    );



}