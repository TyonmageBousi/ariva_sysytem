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
        productImages,
    } = productDetailData;

    const router = useRouter();
    const { status } = useSession();
    const { scrollY } = useScroll();
    const [screenHeight, setScreenHeight] = useState<number>(1000);

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { purchaseQuantity: 1 },
    });

    const actualPrice = discountPrice > 0 && discountPrice < price ? discountPrice : price;
    const discountRate =
        discountPrice > 0 && discountPrice < price
            ? Math.round(((price - discountPrice) / price) * 100)
            : 0;

    const stockOptions = Array.from({ length: stock }, (_, i) => String(i + 1));
    const animationRange = screenHeight * 0.8;

    const widthRaw = useTransform(scrollY, [0, animationRange], ['100%', '50%']);
    const width = useSpring(widthRaw, { stiffness: 70, damping: 20 });

    const descriptionXRaw = useTransform(scrollY, [0, animationRange], ['100%', '0%']);
    const descriptionX = useSpring(descriptionXRaw, { stiffness: 70, damping: 20 });

    useEffect(() => {
        const updateHeight = () => setScreenHeight(window.innerHeight);
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

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

    const optionsProps: FiledOptionsProps<PurchaseValues> = {
        label: '個数',
        labelStyle: 'text-sm font-semibold text-white/75 tracking-wide',
        name: 'purchaseQuantity',
        register,
        inputStyle:
            'border border-white/12 rounded-lg px-4 py-2.5 text-sm bg-white/[0.03] text-white/85 ' +
            'focus:outline-none focus:ring-2 focus:ring-[rgba(201,164,106,0.35)] focus:border-transparent transition-all',
        options: stockOptions,
        errors,
    };

    if (!productDetailData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <p className="text-white/60 text-lg font-light">該当の商品がありません。</p>
            </div>
        );
    }

    return (
        <div className="relative bg-black">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* メインコンテンツエリア */}
                <div className="h-[200vh] relative">
                    {/* 画像エリア */}
                    <motion.div className="fixed top-0 left-0 h-screen" style={{ width }}>
                        {/* 背景の深み（画像の背面に薄く） */}
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,200,120,0.08),rgba(255,200,120,0.00)_70%)] blur-2xl" />
                            <div
                                className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
                            />
                        </div>

                        {productImages.map((image, index) => (
                            <div className="h-full w-full flex items-center justify-center p-8">
                                <img
                                    src={image}
                                    alt={`${name} - 画像${index + 1}`}
                                    className="max-h-[85vh] w-auto object-contain"
                                />
                            </div>

                        ))}
                    </motion.div>

                    <motion.div
                        className="fixed top-0 right-0 h-screen w-1/2 flex items-center justify-center p-12 overflow-y-auto"
                        style={{
                            x: descriptionX,
                            background:
                                'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                            borderLeft: '1px solid rgba(255,255,255,0.10)',
                            backdropFilter: 'blur(18px)',
                        }}
                    >
                        {/* subtle inner layers */}
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_70%_20%,rgba(255,200,120,0.10),rgba(0,0,0,0)_60%)]" />
                            <div className="absolute left-10 right-10 top-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                            <div className="absolute left-10 right-10 bottom-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>

                        <div className="relative max-w-2xl w-full">
                            {/* 商品タイトル */}
                            <h1 className="lux-heading text-6xl font-semibold mb-8 text-white leading-tight tracking-[0.08em]">
                                {name}
                            </h1>

                            {/* 商品説明 */}
                            <p className="mb-10 text-white/70 leading-relaxed text-xl font-light">
                                {description}
                            </p>

                            <hr className="my-8 border-white/10" />

                            {/* 商品情報 */}
                            <div className="space-y-5">
                                {/* 商品コード */}
                                <div className="flex items-center gap-4 text-base">
                                    <Package size={22} className="text-white/40" />
                                    <span className="font-semibold text-white/80 tracking-wide">商品コード:</span>
                                    <span className="text-white/65 font-light">{skuCode}</span>
                                </div>

                                {/* 価格 */}
                                <div className="flex items-center gap-4">
                                    <Tag size={22} className="text-white/40" />
                                    <span className="font-semibold text-white/80 text-base tracking-wide">価格:</span>

                                    {discountRate > 0 ? (
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg text-white/40 line-through font-light">
                                                ¥{price.toLocaleString()}
                                            </span>
                                            <span className="text-3xl font-semibold" style={{ color: 'rgba(201,164,106,0.95)' }}>
                                                ¥{discountPrice.toLocaleString()}
                                            </span>
                                            <span
                                                className="text-[11px] px-3 py-1.5 rounded-full font-semibold tracking-[0.18em]"
                                                style={{
                                                    background: 'rgba(201,164,106,0.95)',
                                                    color: 'rgba(0,0,0,0.92)',
                                                }}
                                            >
                                                {discountRate}% OFF
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-3xl font-semibold text-white">¥{price.toLocaleString()}</span>
                                    )}
                                </div>

                                {/* カテゴリー */}
                                <div className="flex items-start gap-4">
                                    <Tag size={22} className="text-white/40 mt-1" />
                                    <span className="font-semibold text-white/80 text-base tracking-wide">
                                        カテゴリー:
                                    </span>
                                    <div className="flex flex-wrap gap-2.5">
                                        {productCategories.map((category, index) => (
                                            <span
                                                key={index}
                                                className="text-sm px-4 py-2 rounded-lg font-medium border"
                                                style={{
                                                    background: 'rgba(255,255,255,0.04)',
                                                    borderColor: 'rgba(255,255,255,0.10)',
                                                    color: 'rgba(255,255,255,0.82)',
                                                }}
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* カラー */}
                                <div className="flex items-start gap-4">
                                    <Palette size={22} className="text-white/40 mt-1" />
                                    <span className="font-semibold text-white/80 text-base tracking-wide">カラー:</span>
                                    <div className="flex flex-wrap gap-2.5">
                                        {productColors.map((color, index) => (
                                            <span
                                                key={index}
                                                className="text-sm px-4 py-2 rounded-lg font-medium border"
                                                style={{
                                                    background: 'rgba(255,255,255,0.04)',
                                                    borderColor: 'rgba(255,255,255,0.10)',
                                                    color: 'rgba(255,255,255,0.82)',
                                                }}
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
                                    className="flex-1 py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-3 group border"
                                    style={{
                                        background:
                                            'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                                        borderColor: 'rgba(255,255,255,0.12)',
                                        color: 'rgba(255,255,255,0.92)',
                                    }}
                                    aria-label="商品を購入する"
                                >
                                    <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                                    <span className="tracking-wide">カートに追加</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </form>
        </div>
    );
}
