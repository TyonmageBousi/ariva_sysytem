import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export type ProductDetailsData = {
    id: number;
    name: string;
    price: string;
    image: string;
};
type Props = {
    productDetailsData: ProductDetailsData[];
}
const DURATION = 30;

export default function ProductDetails({ productDetailsData}: Props) {

    const [selected, setSelected] = useState<ProductDetailsData | null>(null); 
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-amber-950 to-black text-amber-50">
            <header className="pt-14 pb-6 text-center">
                <h1 className="text-5xl font-bold">白十字 商品ギャラリー</h1>
                <p className="mt-2 text-amber-200/70">クリックで詳細表示</p>
            </header>

            <div className="relative h-80 overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10" />

                <motion.div
                    className="flex h-80 items-center gap-8 absolute"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: DURATION, ease: 'linear', repeat: Infinity }}
                >
                    {productDetailsData.map((product, i) => (
                        <motion.div
                            key={`${product.id}-${i}`}
                            className="w-80 h-72 shrink-0 rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer relative"
                            whileHover={{ scale: 1.05, y: -4 }}
                            onClick={() => setSelected(product)}
                        >
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-lg font-semibold">{product.name}</h3>
                                <span className="text-2xl font-bold text-amber-300">{product.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <AnimatePresence>{/* 消えるときもアニメーションを入れるため */}
                {selected && (
                    <motion.div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-3xl max-w-4xl w-full overflow-hidden"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()} // モーダル内をクリックしても閉じる 
                        >
                            <div className="grid md:grid-cols-2">
                                <img src={selected.image} alt={selected.name} className="w-full h-96 md:h-auto object-cover" />
                                <div className="p-8 flex flex-col justify-center">
                                    <h2 className="text-5xl font-bold mb-4">{selected.name}</h2>
                                    <p className="text-gray-300 mb-6">厳選されたカカオ豆を使用した、こだわりのチョコレート。</p>
                                    <p className="text-6xl font-bold text-amber-300 mb-8">{selected.price}</p>
                                    <div className="flex gap-4">
                                        <button className="bg-amber-600 hover:bg-amber-700 font-bold py-4 px-8 rounded-full flex-1">
                                            詳細へ
                                        </button>
                                        <button className="bg-white/20 hover:bg-white/30 font-bold py-4 px-8 rounded-full" onClick={() => setSelected(null)}>
                                            ✕
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}