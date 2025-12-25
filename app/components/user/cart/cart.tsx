import { useState, useEffect, useRef } from 'react'
import { productPurchaseSchema } from '@/app/schemas/productPurchase'
import { useRouter } from 'next/navigation'
import { ProductCart } from '@/app/types/productCart'
import { StockError, PriceError, ProductErrors, Errors } from '@/app/api/user/settlement/route'
import { Minus, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast';
import { z } from 'zod';
import { handleError } from '@/lib/errors';


export default function Cart(data: ProductCart[]) {
    const [carts, setCarts] = useState<ProductCart[]>([]);
    const [productError, setProductError] = useState<Record<number, ProductErrors[]>>()
    const router = useRouter()
    const controllerRef = useRef<AbortController | null>(null);
    const [zodErrors, setZodErrors] = useState<Record<number, string[]>>();

    setCarts(data);

    const decreaseQuantity = (id: number) => {
        setCarts(carts.map((cart) => (
            cart.quantity > 1 && cart.id === id) ?
            { ...cart, quantity: cart.quantity - 1 }
            : cart
        ))
    }
    const increaseQuantity = (id: number) => {
        setCarts(carts.map((cart) => (
            cart.id === id) ?
            { ...cart, quantity: cart.quantity + 1 }
            : cart
        ))
    }

    const removeItem = (id: number) => {
        setCarts(carts.filter(cart => cart.id !== id))
    }

    const total = carts.reduce((totalPrice, cart) => {
        return totalPrice + (cart.price * cart.quantity)
    }, 0)



    const settlement = (async () => {
        try {
            const formatCarts = carts.map((cart) => ({
                productId: cart.productId,
                name: cart.name,
                price: cart.price,
                quantity: cart.quantity
            }));

            const result = z.array(productPurchaseSchema).safeParse(formatCarts)

            if (!result.success) {
                const zodErrors: Record<number, string[]> = {};
                result.error.issues.forEach((issue) => {
                    const index = issue.path[0] as number;
                    const cart = formatCarts[index]
                    if (cart) {
                        const productId = cart.productId
                        if (!zodErrors[productId]) {
                            zodErrors[productId] = [];
                        }
                        zodErrors[productId].push(issue.message)
                    }
                })
                setZodErrors(zodErrors)
                return;
            };

            const response = await fetch('http://localhost:3000/api/user/settlement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result.data)
            });

            if (!response.ok) {
                toast.error('通信エラーが発生しました');
                return;
            }

            const data = await response.json();
            if (!data.success) {
                const errorType = data.errorType
                switch (errorType) {
                    case 'PRODUCT_NOT_FOUND':
                        toast('カート内の商品が見つかりませんでした。')
                        break;
                    case 'PRODUCT_ERROR':
                        const errorProduct: Record<number, ProductErrors[]> = {};
                        (data.details as Errors[]).forEach(({ productId, errors }) => {
                            errorProduct[productId] = errors;
                        });
                        setProductError(errorProduct)
                        break;
                    default: handleError(data)
                        break;
                }
            }
            if (data.success) {
                router.push('http://localhost:3000/page/user/addrss');
                return;
            }
            throw new Error('予期しないエラーが発生しました')
        } catch (error) {
            throw error instanceof Error ? error : new Error('予期しないエラーが発生しました')
        }
    })
    return (
        <div>
            <h1>ショッピングカート</h1>
            {carts.length === 0 ? (
                <div>カートは空です</div>
            ) : (
                <div className="min-h-screen bg-gray-50 p-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">カート商品一覧</h2>
                        <div className="space-y-4">
                            {carts.map((cart) => {
                                const errors = productError ? productError[cart.productId] : [];
                                const hasErrors = errors.length > 0;
                                const zodError = zodErrors ? zodErrors[cart.id] : [];
                                const hasZodErrors = zodError.length > 0;
                                return (

                                    <div
                                        key={cart.id}
                                        className="bg-white rounded-lg shadow-md p-6 flex items-center gap-6 hover:shadow-lg transition-shadow"
                                    >
                                        {hasZodErrors && (
                                            zodError.map((error, index) => (
                                                <p key={index}>{error}</p>
                                            ))
                                        )}
                                        {/* 商品画像 */}
                                        <img
                                            src={cart.image}
                                            alt={cart.name}
                                            className="w-24 h-24 object-cover rounded-lg"
                                        />

                                        {/* 商品情報 */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                {cart.name}
                                            </h3>
                                            <p className="text-2xl font-bold text-blue-600">
                                                ¥{cart.price.toLocaleString()}
                                            </p>
                                            {/* エラー表示 */}
                                            {hasErrors && (
                                                <div className='mt-3 space-y-2'>
                                                    {errors.map((error, index) => (
                                                        <div key={index} className='bg-red-50 border-l-4 border-red-500 p-3 rounded'>
                                                            {error.type === 'STOCK_ERROR' && (
                                                                <div className='text-sm text-red-700'>
                                                                    <p className='font-semibold'>⚠️ 在庫不足</p>
                                                                    <p>リクエスト: {(error as StockError).requested}個 / 在庫: {(error as StockError).stock}個</p>
                                                                </div>
                                                            )}
                                                            {error.type === 'PRICE_ERROR' && (
                                                                <div className='text-sm text-red-700'>
                                                                    <p className='font-semibold'>⚠️ 価格変更</p>
                                                                    <p>カート内: ¥{(error as PriceError).price.toLocaleString()} → 現在: ¥{(error as PriceError).productPrice.toLocaleString()}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* 数量調整 */}
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => decreaseQuantity(cart.id)}
                                                disabled={cart.quantity <= 1 || hasErrors}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="text-2xl font-bold text-gray-800 w-12 text-center">
                                                {cart.quantity}
                                            </span>
                                            <button
                                                onClick={() => increaseQuantity(cart.id)}
                                                disabled={hasErrors}
                                                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors disabled:opacity-50"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        {/* 小計 */}
                                        <div className="text-right min-w-[120px]">
                                            <p className="text-sm text-gray-500 mb-1">小計</p>
                                            <p className="text-2xl font-bold text-gray-800">
                                                ¥{(cart.price * cart.quantity).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* 削除ボタン */}
                                        <button
                                            onClick={() => removeItem(cart.id)}
                                            className="ml-4 p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                                            title="削除"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 合計金額 */}
                        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold text-gray-700">合計金額</span>
                                <span className="text-3xl font-bold text-blue-600">
                                    ¥{total.toLocaleString()}
                                </span>
                            </div>
                            <button
                                onClick={() => settlement()}
                                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                            >
                                購入手続きへ進む
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )


}