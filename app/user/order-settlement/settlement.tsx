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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
        } catch (error) {

        }

    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextForm props={cartNumberProps} />
                <TextForm props={cardHolderNameProps} />
                <TextForm props={expiryMonthProps} />
                <TextForm props={expiryYearProps} />
                <TextForm props={securityCodeProps} />
            </form>
        </div >

    )

}