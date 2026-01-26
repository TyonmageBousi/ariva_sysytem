'use client'

import TextForm, { FieldTextProps } from "@/app/components/public/form/TextForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { settlementSchema, SettlementSchema } from '@/app/schemas/settlement'

export default function Settlement() {

    const { handleSubmit, register, formState: { errors } } = useForm<SettlementSchema>({
        resolver: zodResolver(settlementSchema)
    });

    const cartNumberProps: FieldTextProps<SettlementSchema> = {
        label: 'カート番号',
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/requestSettlement`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
        } catch (error) {

        }

    }

    return (
        <div className="min-h-screen  py-8">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        カード情報入力
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <TextForm props={cartNumberProps} />
                        <TextForm props={cardHolderNameProps} />

                        <div className="grid grid-cols-2 gap-4">
                            <TextForm props={expiryMonthProps} />
                            <TextForm props={expiryYearProps} />
                        </div>

                        <TextForm props={securityCodeProps} />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                        >
                            送信
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )

}