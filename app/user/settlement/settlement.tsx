'use client'

import TextForm, { FieldTextProps } from "@/app/components/public/form/TextForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { settlementSchema, SettlementSchema } from '@/app/schemas/settlement'
import { useState } from 'react'

export default function Settlement() {
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit'>('cash')

    const { handleSubmit, register, formState: { errors } } = useForm<SettlementSchema>({
        resolver: zodResolver(settlementSchema)
    });

    const cartNumberProps: FieldTextProps<SettlementSchema> = {
        label: 'カード番号',
        name: 'cartNumber',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const cardHolderNameProps: FieldTextProps<SettlementSchema> = {
        label: 'カード名義',
        name: 'cardHolderName',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const expiryMonthProps: FieldTextProps<SettlementSchema> = {
        label: '有効期限（月）',
        name: 'expiryMonth',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const expiryYearProps: FieldTextProps<SettlementSchema> = {
        label: '有効期限（年）',
        name: 'expiryYear',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const securityCodeProps: FieldTextProps<SettlementSchema> = {
        label: 'セキュリティコード',
        name: 'securityCode',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }

    const onSubmit = async (data: SettlementSchema) => {
        try {
            const requestData = {
                paymentMethod,
                ...(paymentMethod === 'credit' ? data : {})
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });
            const result = await response.json();
        } catch (error) {
            console.error('Payment error:', error)
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 支払い方法選択 */}
                <div>
                    <label className="block text-sm font-medium mb-3">
                        支払い方法
                    </label>
                    <div className="flex gap-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={(e) => setPaymentMethod('cash')}
                                className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                            />
                            <span>現金</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="credit"
                                checked={paymentMethod === 'credit'}
                                onChange={(e) => setPaymentMethod('credit')}
                                className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                            />
                            <span>クレジットカード</span>
                        </label>
                    </div>
                </div>

                {/* クレジットカード情報（クレジット選択時のみ表示） */}
                {paymentMethod === 'credit' && (
                    <div className="space-y-4 border-t pt-6">
                        <h3 className="font-medium text-lg mb-4">カード情報</h3>
                        <TextForm props={cartNumberProps} />
                        <TextForm props={cardHolderNameProps} />
                        <div className="grid grid-cols-2 gap-4">
                            <TextForm props={expiryMonthProps} />
                            <TextForm props={expiryYearProps} />
                        </div>
                        <TextForm props={securityCodeProps} />
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-xl transition-colors"
                >
                    {paymentMethod === 'cash' ? '注文を確定する' : '支払いを確定する'}
                </button>
            </form>
        </div>
    )
}