'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type ProductDetailsData = {
    id: number;
    name: string;
    price: string;
    discountPrice: string;
    description: string;
    productCategories: string[];
    productColors: string[];
    productImages: string[];
};

type Props = {
    productDetailsData: ProductDetailsData[];
};

export default function ProductDetails({ productDetailsData }: Props) {
    const [selected, setSelected] = useState<ProductDetailsData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleProductClick = (product: ProductDetailsData) => {
        setSelected(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelected(null), 300); 
    };

    return (
        <section
            className="relative z-50 min-h-screen text-white pt-12"
            style={{
                background:
                    'radial-gradient(1200px circle at 50% 18%, rgba(255,220,170,0.10), rgba(0,0,0,0.0) 45%), radial-gradient(circle at 50% 60%, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.92) 58%, rgba(0,0,0,1) 100%)'

            }}
        >

            <div className="relative mx-auto  max-w-7xl px-6 pt-32 pb-16 z-50 bg-gradient-to-br from-[#1a1d22] via-[#0f1116] to-[#05070c]">
                {/* ヘッダー */}
                <header className="text-center">
                    <p className="text-[11px] font-light tracking-[0.45em] text-white/55 uppercase">
                        LINEUP
                    </p>

                    <h1 className="mt-5 text-[clamp(28px,3.3vw,44px)] font-extralight tracking-wide text-white">
                        白十字 商品ギャラリー
                    </h1>

                    <p className="mt-4 text-sm font-light leading-relaxed text-white/55">
                        クリックで詳細表示
                    </p>

                    <div className="mx-auto mt-8 h-px w-16 bg-white/10" />
                </header>

                <div className="relative mt-14 h-[320px] overflow-hidden">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black to-transparent z-10" />

                    <div className="slider-container absolute flex h-full items-center gap-8">
                        {[...productDetailsData, ...productDetailsData].map((product, index) => (
                            <button
                                key={`${product.id}-${index}`}
                                type="button"
                                onClick={() => handleProductClick(product)}
                                className="product-card group relative h-[280px] w-[340px] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.65)] transition-transform duration-300 hover:scale-[1.03] hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/20"
                            >
                                <img
                                    src={product.productImages[0]}
                                    alt={product.name}
                                    className="h-full w-full object-cover opacity-[0.95] transition-transform duration-700 group-hover:scale-[1.02]"
                                />

                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_20%,rgba(255,255,255,0.08),rgba(0,0,0,0.0)_55%)]" />
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.100),rgba(0,0,0,0.00)_55%)]" />

                                <div className="absolute inset-x-0 bottom-0 p-5">
                                    <h3 className="mt-2 text-lg font-light tracking-wide text-white">
                                        {product.name}
                                    </h3>

                                    <div className="mt-3 flex items-end justify-between">
                                        <span className="text-sm font-light text-white/85">Price</span>
                                        <span className="text-xl font-extralight tracking-wide text-amber-200/90">
                                            {product.price}
                                        </span>
                                    </div>

                                    <div className="mt-4 h-px w-full bg-white/10" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[10vh] z-50 bg-gradient-to-b from-transparent to-black pointer-events-none" />
            </div>

            {selected && (
                <div
                    className={`
            fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-6 backdrop-blur-2xl transition-opacity duration-300
            ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
                    onClick={handleCloseModal}
                >
                    <div
                        className={`
            w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_30px_180px_rgba(0,0,0,0.80)]
            transition-all duration-300
            ${isModalOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}
            `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="grid md:grid-cols-2">

                            <div className="relative h-[320px] md:h-[520px]">
                                <img
                                    src={selected.productImages[0]}
                                    alt={selected.name}
                                    className="h-full w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,0.55))]" />
                            </div>

                            <div className="flex flex-col justify-center p-10 md:p-12">
                                <p className="text-[11px] font-light tracking-[0.45em] text-white/55 uppercase">
                                    PRODUCT
                                </p>

                                <h2 className="mt-4 text-[clamp(26px,2.6vw,40px)] font-extralight tracking-wide text-white">
                                    {selected.name}
                                </h2>

                                <p className="mt-6 text-sm font-light leading-relaxed text-white/55">
                                    厳選されたカカオ豆を使用した、こだわりのチョコレート。
                                    <br />
                                    余韻まで含めて、体験になるように設計しました。
                                </p>

                                <div className="mt-10 flex items-end justify-between">
                                    <span className="text-sm font-light text-white/55">Price</span>
                                    <span className="text-[clamp(28px,3.2vw,54px)] font-extralight tracking-wide text-amber-200/95">
                                        {selected.price}
                                    </span>
                                </div>

                                <div className="mt-10 h-px w-full bg-white/10" />

                                <div className="mt-10 flex gap-4">
                                    <button
                                        className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-amber-200/30 bg-amber-200/10 px-8 py-4 text-[11px] font-light tracking-[0.35em] text-amber-100 uppercase transition-all duration-300 hover:border-amber-200/50 hover:bg-amber-200/15"
                                        onClick={() => router.push(`/user/products/${selected.id}`)}
                                    >
                                        <span>詳細へ</span>
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </button>

                                    <button
                                        className="inline-flex items-center justify-center rounded-full px-6 py-4 border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:border-white/20 hover:text-white"
                                        onClick={handleCloseModal}
                                        aria-label="閉じる"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <p className="mt-6 text-xs font-light text-white/35">
                                    ※ 背景をクリックしても閉じられます
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* CSSアニメーション定義 */}
            <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

            .slider-container {
            animation: slide 30s linear infinite;
            }

            /* ホバー時に一時停止 */
            .slider-container:hover {
            animation-play-state: paused;
            }
      `}</style>
        </section>
    );
}