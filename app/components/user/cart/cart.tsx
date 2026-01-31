'use client';

import { useState, useEffect, useRef } from 'react'
import { ProductPurchaseSchema } from '@/app/schemas/productPurchase'
import { useRouter } from 'next/navigation'
import { ProductCart } from '@/app/types/productCart'
import { StockError, PriceError, ProductErrors, Errors } from '@/app/api/user/settlement/route'
import { Minus, Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast';
import { z } from 'zod';
import { handleError } from '@/lib/errors';

type Props = {
    data: ProductCart[]
}

export default function Cart({ data }: Props) {
    const [carts, setCarts] = useState<ProductCart[]>([]);
    const [productError, setProductError] = useState<Record<number, ProductErrors[]>>()
    const router = useRouter()
    const controllerRef = useRef<AbortController | null>(null);
    const [zodErrors, setZodErrors] = useState<Record<number, string[]>>();

    useEffect(() => {
        setCarts(data);
    }, [data]);

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
                purchaseQuantity: cart.quantity
            }));


            const result = z.array(ProductPurchaseSchema).safeParse(formatCarts)

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

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/settlement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(result.data)
            });

            console.log("settlement結果", response)

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
                router.push('/page/user/address');
                return;
            }
            throw new Error('予期しないエラーが発生しました')
        } catch (error) {
            throw error instanceof Error ? error : new Error('予期しないエラーが発生しました')
        }
    })
    return (
        <div className="min-h-screen bg-[#07080b] text-white">
            {/* header */}
            <div className="mx-auto max-w-5xl px-6 pt-16 pb-10">
                <p className="text-[11px] tracking-[0.35em] text-white/55">CART</p>
                <h1 className="mt-3 text-3xl md:text-4xl font-extralight tracking-wide">
                    ショッピングカート
                </h1>
                <p className="mt-3 text-sm text-white/55">
                    静けさを崩さずに、必要な情報だけを。
                </p>
            </div>

            {carts.length === 0 ? (
                <div className="mx-auto max-w-5xl px-6 pb-20">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-white/70">
                        カートは空です
                    </div>
                </div>
            ) : (
                <div className="mx-auto max-w-5xl px-6 pb-24">
                    <div className="grid gap-10 lg:grid-cols-[1fr_360px]">

                        <div className="space-y-4">
                            {carts.map((cart) => {
                                const errors = productError ? productError[cart.productId] : [];
                                const hasErrors = errors.length > 0;

                                const zodError = zodErrors ? zodErrors[cart.id] : [];
                                const hasZodErrors = zodError.length > 0;

                                return (
                                    <div
                                        key={cart.id}
                                        className={`group rounded-2xl border bg-white/[0.03] backdrop-blur-xl
                  ${hasErrors || hasZodErrors ? 'border-red-500/30' : 'border-white/10'}
                `}
                                    >
                                        {(hasZodErrors || hasErrors) && (
                                            <div className="border-b border-white/10 px-5 py-4">
                                                <div className="space-y-2">
                                                    {hasZodErrors &&
                                                        zodError.map((e, i) => (
                                                            <p key={i} className="text-sm text-red-200/90">
                                                                {e}
                                                            </p>
                                                        ))}

                                                    {hasErrors &&
                                                        errors.map((error, index) => (
                                                            <div
                                                                key={index}
                                                                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3"
                                                            >
                                                                {error.type === 'STOCK_ERROR' && (
                                                                    <div className="text-sm text-red-100">
                                                                        <p className="font-medium tracking-wide">在庫不足</p>
                                                                        <p className="mt-1 text-red-100/80">
                                                                            リクエスト: {(error as StockError).requested} / 在庫: {(error as StockError).stock}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                                {error.type === 'PRICE_ERROR' && (
                                                                    <div className="text-sm text-red-100">
                                                                        <p className="font-medium tracking-wide">価格変更</p>
                                                                        <p className="mt-1 text-red-100/80">
                                                                            カート内: ¥{(error as PriceError).price.toLocaleString()}
                                                                            {' '}→ 現在: ¥{(error as PriceError).productPrice.toLocaleString()}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-5 px-5 py-5">
                                            {/* image */}
                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/30">
                                                <img
                                                    src={cart.image}
                                                    alt={cart.name}
                                                    className="h-full w-full object-cover opacity-[0.92] transition duration-700 group-hover:scale-[1.03]"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="min-w-0">
                                                        <p className="truncate text-[15px] font-light tracking-wide">
                                                            {cart.name}
                                                        </p>
                                                        <p className="mt-2 text-sm text-white/55">
                                                            単価 <span className="text-white/80">¥{cart.price.toLocaleString()}</span>
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() => removeItem(cart.id)}
                                                        className="rounded-full border border-white/10 bg-white/[0.02] p-2 text-white/65
                                   transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                                                        title="削除"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>

                                                <div className="mt-5 flex items-center justify-between gap-4">

                                                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-3 py-2">
                                                        <button
                                                            onClick={() => decreaseQuantity(cart.id)}
                                                            disabled={cart.quantity <= 1 || hasErrors}
                                                            className="h-8 w-8 rounded-full border border-white/10 bg-black/30
                                     text-white/70 transition hover:bg-white/[0.05]
                                     disabled:opacity-40 disabled:cursor-not-allowed"
                                                        >
                                                            <div className="flex items-center justify-center">
                                                                <Minus size={14} />
                                                            </div>
                                                        </button>

                                                        <span className="w-10 text-center text-sm font-light tracking-widest text-white/85">
                                                            {cart.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() => increaseQuantity(cart.id)}
                                                            disabled={hasErrors}
                                                            className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.06]
                                     text-white transition hover:bg-white/[0.10]
                                     disabled:opacity-40 disabled:cursor-not-allowed"
                                                        >
                                                            <div className="flex items-center justify-center">
                                                                <Plus size={14} />
                                                            </div>
                                                        </button>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-[11px] tracking-[0.25em] text-white/45">SUBTOTAL</p>
                                                        <p className="mt-1 text-lg font-light tracking-wide text-white/90">
                                                            ¥{(cart.price * cart.quantity).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6">
                            <p className="text-[11px] tracking-[0.35em] text-white/55">SUMMARY</p>

                            <div className="mt-5 flex items-end justify-between">
                                <span className="text-sm text-white/60">合計金額</span>
                                <span className="text-2xl font-light tracking-wide text-white">
                                    ¥{total.toLocaleString()}
                                </span>
                            </div>

                            <div className="mt-5 h-px w-full bg-white/10" />

                            <button
                                onClick={() => settlement()}
                                className="mt-6 w-full rounded-xl border border-white/10 bg-white/[0.06] py-4
                       text-sm tracking-[0.18em] uppercase text-white/90
                       transition hover:bg-white/[0.10] hover:border-white/20"
                            >
                                購入手続きへ進む
                            </button>

                            <p className="mt-4 text-xs leading-relaxed text-white/45">
                                在庫・価格は購入手続き時点で確定します。
                            </p>
                        </aside>
                    </div>
                </div>
            )}
        </div>

    )


}