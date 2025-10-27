'use client';

import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ProductDetails from './../components/user/ProductDetails';
import type { StaticImageData } from 'next/image';

const mainTitle = {
    title: 'Classic Chocolate',
    subtitle: 'はじまりのレシピ、名前のない衝動',
};

const productDescription = {
    explain: "カカオと出会った、最初の感情。誰にも知られていないレシピが、湧き上がる衝動に導かれて生まれました。ひとくちで広がる、はじまりの記憶。選び抜かれたカカオが、まだ名前のない感情を語りかけるように、豊かに、そして力強く香ります。",
    expirationPeriod: "製造日より30日",
    storageInstructions: "直射日光・高温多湿を避け、冷暗所にて保存してください",
    allergens: "乳成分・大豆",
    salesLocations: "白十字 各店舗および公式オンラインショップ",
    price: "税込 1,480円",
    salesPeriod: "通年販売(※数量限定あり)"
};

const dummyImage1: StaticImageData = {
    src: "/images/chocolate-main.jpg",
    height: 800,
    width: 1200,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
};

const dummyImage2: StaticImageData = {
    src: "/images/chocolate-detail.jpg",
    height: 800,
    width: 1200,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
};

const dummyImage3: StaticImageData = {
    src: "/images/chocolate-package.jpg",
    height: 800,
    width: 1200,
    blurDataURL: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
};
type Slide = {
    label: StaticImageData;
    alt: string;
};
type Props = {
    productTitle: string;
    productImages: Slide[];
    productExplain: string;
    productPrice: string;
};

const sampleProps: Props = {
    productTitle: "プレミアムダークチョコレート",
    productImages: [
        {
            label: dummyImage1,
            alt: "ダークチョコレート全体"
        },
        {
            label: dummyImage2,
            alt: "チョコレートの断面"
        },
        {
            label: dummyImage3,
            alt: "チョコレートのパッケージ"
        }
    ],
    productExplain: "カカオ分72%の濃厚な味わい。エクアドル産の厳選されたカカオ豆を使用し、職人が丁寧に仕上げました。ほろ苦さの中に広がる深いコクと、余韻に残る芳醇な香りが特徴です。",
    productPrice: "税込 1,980円"
};

export default function Product() {
    const { scrollY } = useScroll(); //farmerモーションの関数 スクロールするたびに、縦のスクロール量が自動で、入る
    const [screenHeight, setScreenHeight] = useState(0); //現在の画面の高さを保持

    useEffect(() => {
        const updateHeight = () => {
            setScreenHeight(window.innerHeight);
        };
        updateHeight(); //初期値の画面の高さを取得
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const animationRange = screenHeight * 0.5;

    // 幅のアニメーション: 100% → 50%
    const widthRaw = useTransform(scrollY, [0, animationRange], ['100%', '50%']);
    const width = useSpring(widthRaw, { stiffness: 70, damping: 20 });

    // 商品説明の位置アニメーション: 1画面分下 → 中央
    const descriptionYRaw = useTransform(scrollY, [0, animationRange], [screenHeight, 0]);
    const descriptionY = useSpring(descriptionYRaw, { stiffness: 70, damping: 20 });

    // 最初のセクションの透明度
    const firstSectionOpacity = useTransform(scrollY, [screenHeight * 1.5, screenHeight * 2], [1, 0]);

    return (
        <div className="relative">
            {/* 最初のセクション - スペースを追加 */}
            <div className="h-[200vh]">
                <motion.div
                    className="sticky top-0 min-h-screen bg-gradient-to-b from-amber-50 to-white"
                    style={{ opacity: firstSectionOpacity }}
                >
                    {/* 画像エリア */}
                    <motion.div
                        className="fixed top-20 left-5 z-20 h-[85vh] overflow-hidden rounded-lg shadow-2xl"
                        style={{ width }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1511381939415-e44015466834?w=1200"
                            alt="Classic Chocolate"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* 商品説明エリア */}
                    <motion.div
                        className="fixed top-[50%] -translate-y-1/2 left-[52%] z-10 max-w-xl pr-8"
                        style={{ y: descriptionY }}
                    >
                        <h1 className="text-5xl font-bold mb-6 text-gray-900">
                            {mainTitle.title}
                        </h1>
                        <p className="text-2xl italic mb-8 text-gray-700">
                            {mainTitle.subtitle}
                        </p>
                        <p className="mb-8 text-gray-600 leading-relaxed text-sm">
                            {productDescription.explain}
                        </p>

                        <hr className="my-6 border-gray-300" />

                        <div className="space-y-3 text-sm text-gray-700">
                            <p><strong>消費期限:</strong> {productDescription.expirationPeriod}</p>
                            <p><strong>保存方法:</strong> {productDescription.storageInstructions}</p>
                            <p><strong>特定原材料等:</strong> {productDescription.allergens}</p>
                            <p><strong>販売箇所:</strong> {productDescription.salesLocations}</p>
                            <p><strong>値段:</strong> {productDescription.price}</p>
                            <p><strong>販売期間:</strong> {productDescription.salesPeriod}</p>
                        </div>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label htmlFor="quantity" className="text-sm font-medium">
                                    個数
                                </label>
                                <select
                                    id="quantity"
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    defaultValue={1}
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <button className="bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all">
                                🛒 ご購入はこちら
                            </button>
                        </div>
                    </motion.div>

                    {/* スクロールを促すテキスト */}
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-sm animate-bounce z-30">
                        ↓ スクロールしてください
                    </div>
                </motion.div>
            </div>
            {/* <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-950 to-black z-50">
                <ProductDetails {...sampleProps} />
            </div> */}
            {/* 最終セクション */}
            <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-950 to-black z-50">
                <div className="text-center text-amber-100">
                    <h2 className="text-7xl font-bold mb-6">白十字</h2>
                    <p className="text-2xl opacity-80">伝統と革新が織りなす、至福のひととき</p>
                </div>
            </div>
        </div>
    );
}