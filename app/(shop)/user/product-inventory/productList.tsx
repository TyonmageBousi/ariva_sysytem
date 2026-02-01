'use client'
import { SearchProduct } from '@/app/types/searchProduct'


type Props = {
    productList: SearchProduct[]
}

export default function ProductList({ productList }: Props) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {productList.map((product) => (
                <div key={product.id} className="bg-neutral-800/50 rounded-lg overflow-hidden border border-neutral-700/50">
                    {/* 商品画像 */}
                    <div className="aspect-square bg-neutral-900/50">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-600">画像なし</div>
                        )}
                    </div>

                    {/* 商品情報 */}
                    <div className="p-4 space-y-2">
                        {/* 商品名 */}
                        <h3 className="text-amber-100/90 font-medium">{product.name}</h3>

                        {/* 価格 */}
                        <div className="flex items-baseline gap-2">
                            {product.discountPrice ? (
                                <>
                                    <span className="text-lg font-bold text-red-400">¥{product.discountPrice.toLocaleString()}</span>
                                    <span className="text-sm text-neutral-500 line-through">¥{product.price.toLocaleString()}</span>
                                </>
                            ) : (
                                <span className="text-lg font-bold text-amber-100/90">¥{product.price.toLocaleString()}</span>
                            )}
                        </div>

                        {/* カテゴリラベル */}
                        <div className="flex flex-wrap gap-1">
                            {product.categoryIds.map(cat => (
                                <span key={cat} className="px-2 py-1 text-xs bg-amber-500/20 text-amber-300 rounded">
                                    {cat}
                                </span>
                            ))}
                        </div>

                        {/* カラー */}
                        <div className="flex flex-wrap gap-1">
                            {product.colorIds.map(color => (
                                <span key={color} className="px-2 py-1 text-xs bg-neutral-700 text-neutral-300 rounded">
                                    {color}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}