import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductList } from '@/app/types/productList'

type Props = ProductList[];


export default function ProductListPage(productList: Props) {

    const [selected, setSelected] = useState<ProductList | null>(null)

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    商品一覧
                </h1>
                <div className="grid grid-cols-4 gap-6">
                    {productList.map((product, i) => (
                        <motion.div
                            key={`${product.id}-${i}`}
                            className='w-80 h-72 rounded-2xl overflow-hidden cursor-pointer relative'
                            whileHover={{ scale: 1.05, y: -4 }}
                            onClick={() => setSelected(product)}
                        >
                            <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
                            <div className='absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent'>
                                <h3 className='text-lg font-semibold'>{product.name}</h3>
                                <span className='text-2xl font-bold text-amber-300'>{product.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <AnimatePresence>
                {selected && (
                    <motion.div
                        className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            className='rounded-3xl max-w-4xl w-full overflow-hidden'
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className='grid md:grid-cols-2'>
                                <img src={selected.image} alt={selected.name} className='w-full h-96 md:h-auto object-cover' />
                                <div className='p-8 flex flex-col justify-center'>
                                    <h2 className='text-5xl font-bold mb-4'>{selected.name}</h2>
                                    <p className='text-gray-300 mb-6'>厳選されたカカオ豆を使用した、こだわりのチョコレート。</p>
                                    <p className='text-6xl font-bold text-amber-300 mb-8'>{selected.price}</p>
                                    <div className='flex gap-4'>
                                        <button className='bg-amber-600 hover:bg-amber-700 font-bold py-4 px-8 rounded-full flex-1'>
                                            詳細へ
                                        </button>
                                        <button className='bg-white/20 hover:bg-white/30 font-bold py-4 px-8 rounded-full' onClick={() => setSelected(null)}>
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

    )
}