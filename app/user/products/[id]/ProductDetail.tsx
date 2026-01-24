'use client';

import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ShoppingCart, Package, Palette, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import OptionsForm, { FiledOptionsProps } from '@/app/components/public/form/OptionsForm';
import toast from 'react-hot-toast';
import { PurchaseValues } from '@/app/types/productPurchase';
import { ProductPurchaseSchema } from '@/app/schemas/productPurchase';
import { handleError } from '@/lib/errors';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// ==================== 型定義 ====================
export type ProductDetailData = {
    id: number;
    skuCode: string;
    name: string;
    price: number;
    discountPrice: number;
    stock: number;
    description: string;
    productCategories: string[];
    productColors: string[];
    productImages: string[];
};

type Props = {
    productDetailData: ProductDetailData;
};

// ==================== メインコンポーネント ====================
export default function ProductDetail({ productDetailData }: Props) {
    const {
        id,
        skuCode,
        name,
        price,
        discountPrice,
        stock,
        description,
        productCategories,
        productColors,
        productImages
    } = productDetailData;

    const router = useRouter();
    const { status } = useSession();
    const { scrollY } = useScroll();
    const [screenHeight, setScreenHeight] = useState<number>(1000);

    const { register, getValues, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { purchaseQuantity: 1 }
    });

    // ==================== 計算値 ====================
    const actualPrice = (discountPrice > 0 && discountPrice < price) ? discountPrice : price;
    const discountRate = discountPrice > 0 && discountPrice < price
        ? Math.round(((price - discountPrice) / price) * 100)
        : 0;
    const stockOptions = Array.from({ length: stock }, (_, i) => String(i + 1));
    const animationRange = screenHeight * 0.8;

    // ==================== アニメーション設定 ====================
    // 画像の幅: 100% → 50%
    const widthRaw = useTransform(scrollY, [0, animationRange], ['100%', '50%']);
    const width = useSpring(widthRaw, { stiffness: 70, damping: 20 });

    // 説明パネルの位置: 画面外 → 画面内
    const descriptionXRaw = useTransform(scrollY, [0, animationRange], ['100%', '0%']);
    const descriptionX = useSpring(descriptionXRaw, { stiffness: 70, damping: 20 });

    // ==================== Effects ====================
    useEffect(() => {
        const updateHeight = () => setScreenHeight(window.innerHeight);
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    // ==================== ハンドラー ====================
    const onSubmit = async () => {
        if (status === 'loading') {
            toast('読み込み中です');
            return;
        }

        const cartItem = {
            productId: id,
            name,
            price: actualPrice,
            purchaseQuantity: getValues().purchaseQuantity,
        };

        const parseCartItem = ProductPurchaseSchema.parse(cartItem);

        if (status === 'authenticated') {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/insertCart`, {
                    method: 'POST',
                    body: JSON.stringify(parseCartItem),
                });
                const result = await response.json();

                if (!response.ok || !result.success) {
                    handleError(result);
                    return;
                }

                router.push('');
                return;
            } catch (error) {
                throw error instanceof Error ? error : new Error('予期しないエラーが発生しました');
            }
        }

        try {
            sessionStorage.setItem('pendingCartItem', JSON.stringify(cartItem));
            sessionStorage.setItem('shopping', '1');
            toast('ログインしてください');
            router.push('/page/user/login');
        } catch (error) {
            console.error('カート情報の保存に失敗しました:', error);
            toast.error('データの保存に失敗しました');
        }
    };

    // ==================== フォーム設定 ====================
    const optionsProps: FiledOptionsProps<PurchaseValues> = {
        label: '個数',
        labelStyle: 'text-sm font-semibold text-stone-900',
        name: 'purchaseQuantity',
        register,
        inputStyle: 'border-2 border-stone-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all',
        options: stockOptions,
        errors
    };

    if (!productDetailData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-stone-500 text-lg">該当の商品がありません。</p>
            </div>
        );
    }

    return (
        <div className="relative">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* メインコンテンツエリア */}
                <div className="h-[200vh] relative">
                    {/* 画像エリア */}
                    <motion.div
                        className="fixed top-0 left-0 h-screen"
                        style={{ width }}
                    ><Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                        loop={true}
                        className="h-full w-full"
                    >
                            {productImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="h-full w-full flex items-center justify-center p-8">
                                        <img
                                            src={image}
                                            alt={`${name} - 画像${index + 1}`}
                                            className="max-h-[85vh] w-auto object-contain"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>

                    {/* 説明パネル */}
                    <motion.div
                        className="fixed top-0 right-0 h-screen w-1/2 bg-white flex items-center justify-center p-12 overflow-y-auto"
                        style={{ x: descriptionX }}
                    >
                        <div className="max-w-2xl w-full">
                            {/* 商品タイトル */}
                            <h1 className="text-6xl font-bold mb-8 text-stone-900 leading-tight tracking-tight">
                                {name}
                            </h1>

                            {/* 商品説明 */}
                            <p className="mb-10 text-stone-700 leading-relaxed text-xl font-light">
                                {description}
                            </p>

                            <hr className="my-8 border-stone-300" />

                            {/* 商品情報 */}
                            <div className="space-y-5">
                                {/* 商品コード */}
                                <div className="flex items-center gap-4 text-base">
                                    <Package size={22} className="text-stone-400" />
                                    <span className="font-semibold text-stone-900">商品コード:</span>
                                    <span className="text-stone-600 font-light">{skuCode}</span>
                                </div>

                                {/* 価格 */}
                                <div className="flex items-center gap-4">
                                    <Tag size={22} className="text-stone-400" />
                                    <span className="font-semibold text-stone-900 text-base">価格:</span>
                                    {discountRate > 0 ? (
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg text-stone-400 line-through font-light">
                                                ¥{price.toLocaleString()}
                                            </span>
                                            <span className="text-3xl font-bold text-red-600">
                                                ¥{discountPrice.toLocaleString()}
                                            </span>
                                            <span className="text-sm bg-red-600 text-white px-3 py-1.5 rounded-full font-bold">
                                                {discountRate}% OFF
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-3xl font-bold text-stone-900">
                                            ¥{price.toLocaleString()}
                                        </span>
                                    )}
                                </div>

                                {/* カテゴリー */}
                                <div className="flex items-start gap-4">
                                    <Tag size={22} className="text-stone-400 mt-1" />
                                    <span className="font-semibold text-stone-900 text-base">カテゴリー:</span>
                                    <div className="flex flex-wrap gap-2.5">
                                        {productCategories.map((category, index) => (
                                            <span
                                                key={index}
                                                className="text-sm px-4 py-2 bg-stone-100 text-stone-800 rounded-lg font-medium border border-stone-200"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* カラー */}
                                <div className="flex items-start gap-4">
                                    <Palette size={22} className="text-stone-400 mt-1" />
                                    <span className="font-semibold text-stone-900 text-base">カラー:</span>
                                    <div className="flex flex-wrap gap-2.5">
                                        {productColors.map((color, index) => (
                                            <span
                                                key={index}
                                                className="text-sm px-4 py-2 bg-stone-100 text-stone-800 rounded-lg font-medium border border-stone-200"
                                            >
                                                {color}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 購入フォーム */}
                            <div className="mt-10 flex items-end gap-5">
                                <div className="flex-shrink-0">
                                    <OptionsForm props={optionsProps} />
                                </div>
                                <button
                                    type="submit"
                                    className="flex-1 bg-stone-900 hover:bg-stone-800 text-white text-base font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
                                    aria-label="商品を購入する"
                                >
                                    <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                                    <span>カートに追加</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* フッターセクション */}
                <div className="relative min-h-screen overflow-hidden bg-black">
                    {/* Deep layers */}
                    <div className="pointer-events-none absolute inset-0">
                        {/* vignette */}
                        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_35%,rgba(255,255,255,0.06),rgba(0,0,0,0.92)_55%,#000_78%)]" />
                        {/* subtle warm glow */}
                        <div className="absolute -top-32 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,120,0.10),rgba(255,200,120,0.00)_70%)] blur-2xl" />
                        {/* thin light streak */}
                        <div className="absolute left-1/2 top-1/2 h-[520px] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent blur-[0.5px]" />
                        {/* grain */}
                        <div
                            className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
                            style={{
                                backgroundImage:
                                    "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2290%22 height=%2290%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%2290%22 height=%2290%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')",
                            }}
                        />
                    </div>

                    {/* Center concept */}
                    <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
                        <div className="relative w-full max-w-4xl">
                            {/* outer halo ring */}
                            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 shadow-[0_0_140px_rgba(255,210,150,0.08)]" />

                            {/* glass card */}
                            <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
                                {/* inner highlight */}
                                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.00)_45%,rgba(255,200,120,0.06))]" />
                                {/* top hairline */}
                                <div className="pointer-events-none absolute left-6 right-6 top-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                <div className="relative px-10 py-14 sm:px-14 sm:py-16 text-center">
                                    {/* micro label */}
                                    <div className="mb-6 inline-flex items-center gap-3 text-xs tracking-[0.35em] text-white/60">
                                        <span className="h-px w-10 bg-white/20" />
                                        CONCEPT
                                        <span className="h-px w-10 bg-white/20" />
                                    </div>

                                    {/* title */}
                                    <h2 className="text-6xl sm:text-7xl font-semibold tracking-[0.18em] text-white">
                                        白十字
                                    </h2>

                                    {/* subtitle */}
                                    <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-white/75">
                                        伝統と革新が織りなす、至福のひととき
                                    </p>

                                    {/* accent line */}
                                    <div className="mx-auto mt-10 h-px w-28 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                                    {/* small “innovative” detail */}
                                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/55 tracking-[0.28em]">
                                        <span className="inline-block h-2 w-2 rounded-full bg-white/25" />
                                        <span>BLACK DEPTH / QUIET LUXURY</span>
                                    </div>
                                </div>
                            </div>

                            {/* corner tiny glows */}
                            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,210,150,0.10),rgba(255,210,150,0.00)_70%)] blur-2xl" />
                            <div className="pointer-events-none absolute -right-10 -bottom-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06),rgba(255,255,255,0.00)_70%)] blur-2xl" />
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
}