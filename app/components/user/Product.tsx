'use client';

import { useScroll, useTransform, useMotionValueEvent, useSpring, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';



import tyoko1 from '../assets/explain/explain1.png';
import tyoko2 from '../assets/explain/explain1.png';
import tyoko3 from '../assets/explain/explain1.png';
import tyoko4 from '../assets/explain/explain1.png';
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

type TitleInfo = {
    title: string,
    subtitle: string,
    description: string
}
const mainTitle: TitleInfo = {
    title: 'Classic Chocolate',
    subtitle: 'はじまりのレシピ、名前のない衝動',
    description: 'カカオと出会った最初の感情。まだ誰にも知られていないレシピが、湧き上がる衝動に導かれる。',
};

type ProductDescription = {
    explain: string,
    expirationPeriod: string,
    storageInstructions: string,
    allergens: string,
    salesLocations: string,
    price: string,
    salesPeriod: string
}

const productDescription: ProductDescription = {
    explain: " カカオと出会った、最初の感情。誰にも知られていないレシピが、湧き上がる衝動に導かれて生まれました。ひとくちで広がる、はじまりの記憶。選び抜かれたカカオが、まだ名前のない感情を語りかけるように、豊かに、そして力強く香ります。レシピはシンプル。しかしその中には、初めてチョコレートと出会ったときの純粋な衝動が宿っています。まだ何者でもなかった頃のピュアな情熱を封じ込めた、特別な一粒。クラシックでありながら、新しさを感じる——そんなチョコレートです。",
    expirationPeriod: " 製造日より30日",
    storageInstructions: "直射日光・高温多湿を避け、冷暗所にて保存してください",
    allergens: "乳成分・大豆",
    salesLocations: "白十字 各店舗および公式オンラインショップ",
    price: "税込 1,480円",
    salesPeriod: "通年販売（※数量限定あり）"
}

export default function Product() {
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
        <div style={{ position: 'relative' }}>
        

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
                    {/* <SwiperSlider
                        slides={slides}
                        interval={3000}
                        duration={800}
                        slidesPerView={1}
                        loop={true}
                        style="z-10 w-full h-screen object-cover block rounded-[2%]"
                    /> */}
                </div>
            </motion.div>
            {/* 商品説明 */}
            <div className="absolute top-[17.9%] left-1/2 translate-x-[10%] text-left z-100">
                <p className="text-6xl font-bold mb-10">{mainTitle.title}</p>
                <p className="text-3xl italic mb-10">{mainTitle.subtitle}</p>
                <p className="mb-10">{productDescription.explain}</p>
                <hr className="my-6" />
                <div className="space-y-5 text-m">
                    <p><strong>消費期限：</strong>{productDescription.expirationPeriod}</p>
                    <p><strong>保存方法：</strong>{productDescription.storageInstructions}</p>
                    <p><strong>特定原材料等：</strong>{productDescription.allergens}</p>
                    <p><strong>販売箇所：</strong>{productDescription.salesLocations}</p>
                    <p><strong>値段：</strong>{productDescription.price}</p>
                    <p><strong>販売期間：</strong>{productDescription.salesPeriod}</p>
                </div>

                <div className="mt-15 flex flex-col sm:flex-row items-center gap-4">
                    {/* 個数選択 */}
                    <div className="flex items-center gap-2">
                        <label htmlFor="quantity" className="text-sm font-medium">
                            個数
                        </label>
                        <select
                            id="quantity"
                            name="quantity"
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brown-400"
                            defaultValue={1}
                        >
                            {[...Array(100)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* 購入ボタン */}
                    <a
                        href="#"
                        className="inline-flex items-center justify-center bg-brown-700 hover:bg-brown-800 text-white text-sm font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        🛒 ご購入はこちら
                    </a>
                </div>


            </div>
        </div>
    );



}