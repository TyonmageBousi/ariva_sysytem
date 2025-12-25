'use client';

import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import OptionsForm, { FiledOptionsProps } from '@/app/components/public/form/OptionsForm';
import toast from 'react-hot-toast';
import { PurchaseValues } from '@/app/types/productPurchase'
import { productPurchaseSchema } from '@/app/schemas/productPurchase'
import { handleError } from '@/lib/errors';

export type ProductDetailData = {
    id: number;
    skuCode: string;
    name: string;
    price: number;
    discountPrice: number;
    stock: number;
    description: string
    categoryId: string[]
    colorCategories: string[]
    ProductImages: string[]
}

type Props = {
    productDetailData: ProductDetailData;
}

export default function ProductDetail({ productDetailData }: Props) {
    const { scrollY } = useScroll();
    const [screenHeight, setScreenHeight] = useState<number>(0);
    const { id, skuCode, name, price, discountPrice, stock, description, categoryId, colorCategories, ProductImages } = productDetailData
    const { status } = useSession();
    const router = useRouter()
    const { register, getValues, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            purchaseQuantity: 1
        }
    });
    const controllerRef = useRef<AbortController | null>(null);

    const stockOptions = Array.from({ length: stock }, (_, i) => (
        String(i + 1)
    ));

    const optionsProps: FiledOptionsProps<PurchaseValues> = {
        label: '個数',
        labelStyle: 'text-sm font-medium text-stone-900',
        name: 'purchaseQuantity',
        register: register,
        inputStyle: 'border border-stone-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500',
        options: stockOptions,
        errors: errors
    }

    useEffect(() => {
        const updateHeight = () => {
            setScreenHeight(window.innerHeight);
        };
        updateHeight();
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

    // 背景色のグラデーション変化
    const bgOpacity = useTransform(scrollY, [0, animationRange], [0, 1]);


    const onSubmit = async () => {
        if (status === 'loading') {
            toast('読み込み中です');
            return;
        }

        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();

        const cartItem = {
            productId: id,
            name: name,
            price: (discountPrice > 0 && discountPrice < price) ? discountPrice : price,
            quantity: getValues().purchaseQuantity,
        }

        const parseCartItem = productPurchaseSchema.parse(cartItem)

        if (status === 'authenticated') {
            try {
                const response =
                    await fetch('http://localhost:3000/api/user/insertCart', {
                        method: 'POST',
                        body: JSON.stringify(parseCartItem),
                        signal: controllerRef.current.signal
                    })
                const result = await response.json();
                if (!response.ok) {
                    handleError(result)
                }
                if (!result.success) {
                    handleError(result);
                    return;
                }
                if (result.success) {
                    router.push('');
                    return
                }
                throw new Error('予期しないエラーが発生しました')
            }
            catch (error) {
                throw error instanceof Error ? error : new Error('予期しないエラーが発生しました')
            }
        }
        try {
            sessionStorage.setItem('pendingCartItem', JSON.stringify(cartItem));
            sessionStorage.setItem('shopping', '1');
            toast('ログインしてください');
            router.push('/page/user/login')
        } catch (error) {
            console.error('カート情報の保存に失敗しました:', error);
            toast.error('データの保存に失敗しました');
        }
    };
    return (
        <div className='relative'>
            {!productDetailData ? (
                <p>該当の商品がありません。</p>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='h-[200vh]'>
                        <motion.div
                            className='sticky top-0 min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20'
                            style={{ opacity: firstSectionOpacity }}
                        >
                            {/* 動的な背景オーバーレイ */}
                            <motion.div
                                className='absolute inset-0 bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-stone-100/50'
                                style={{ opacity: bgOpacity }}
                            />

                            {/* 画像エリア */}
                            <motion.div
                                className='fixed top-20 left-5 h-[85vh] overflow-hidden rounded-2xl shadow-2xl'
                                style={{ width }}
                            >
                                <img
                                    src={ProductImages[0]}
                                    alt=''
                                    className='w-full h-full object-cover'
                                />
                            </motion.div>

                            {/* 商品説明エリア */}
                            <motion.div
                                className='fixed top-1/2 -translate-y-1/2 left-[52%] max-w-xl pr-8'
                                style={{ y: descriptionY }}
                            >
                                <h1 className='text-5xl font-bold mb-6 text-stone-900'>
                                    {name}
                                </h1>
                                <p className='mb-8 text-stone-700 leading-relaxed text-sm'>
                                    {description}
                                </p>

                                <hr className='my-6 border-stone-300' />

                                <div className='space-y-3 text-sm text-stone-700'>
                                    <p><strong className='text-stone-900'>商品コード:</strong> {skuCode}</p>
                                    <div className='flex items-center gap-2'>
                                        <strong className='text-stone-900'>価格:</strong>
                                        {discountPrice > 0 && discountPrice < price ? (
                                            <>
                                                <span className='text-sm text-stone-400 line-through'>¥{price.toLocaleString()}</span>
                                                <span className='text-lg font-bold text-red-600'>¥{discountPrice.toLocaleString()}</span>
                                                <span className='text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold'>
                                                    {Math.round(((price - discountPrice) / price) * 100)}% OFF
                                                </span>
                                            </>
                                        ) : (
                                            <span className='text-lg font-bold text-stone-900'>¥{price.toLocaleString()}</span>
                                        )}
                                    </div>
                                    <p><strong className='text-stone-900'>カテゴリー：</strong> {categoryId.map((categories, index) => (<span key={index} className='text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded'>{categories}</span>))}</p>
                                    <p><strong className='text-stone-900'>カラー：</strong> {colorCategories.map((colorCategory, index) => (<span key={index} className='text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded'>{colorCategory}</span>))}</p>
                                </div>

                                <div className='mt-8 flex items-center gap-4'>
                                    <OptionsForm props={optionsProps} />
                                    <button
                                        type="submit"
                                        className='bg-amber-800 hover:bg-amber-900 text-white text-sm font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2'
                                        aria-label='商品を購入する'
                                    >
                                        <ShoppingCart size={18} />
                                        <span>ご購入はこちら</span>
                                    </button>

                                </div>
                            </motion.div>

                            {/* スクロールを促すテキスト */}
                            <div className='fixed bottom-10 left-1/2 -translate-x-1/2 text-stone-400 text-sm animate-bounce'>
                                ↓ スクロールしてください
                            </div>
                        </motion.div>
                    </div>

                    <div className='relative min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-950 to-black z-50'>
                        <div className='text-center text-amber-100'>
                            <h2 className='text-7xl font-bold mb-6'>白十字</h2>
                            <p className='text-2xl opacity-80'>伝統と革新が織りなす、至福のひととき</p>
                        </div>
                    </div>
                </form>
            )}
        </div >

    );
}


