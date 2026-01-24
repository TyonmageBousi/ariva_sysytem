import React from 'react'
import OptionsForm, { type FiledOptionsProps } from '@/app/components/public/form/OptionsForm'
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { Save } from 'lucide-react';
import { NewProductValues } from '@/app/schemas/product'

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>
};

export default function ProductStatusSection({ register, errors }: Props<NewProductValues>) {

    const options = [
        '下書き',
        '販売中',
        '在庫切れ',
        '公開停止',
    ]

    const statusOptionsProps: FiledOptionsProps<NewProductValues> = {
        label: '検索・絞り込みに使用',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'status',
        register,
        inputStyle: 'block px-3 py-1',
        options: options,
        errors
    };
    return (
        <section className='rounded-2xl border border-black/10 bg-neutral-800 p-6'>
            <h1 className='flex items-center gap-2 text-lg font-semibold'>
                <Save className='size-4' />
                <span>カテゴリー & タグ</span>
            </h1>
            <p className='mt-1 text-sm text-black/60'>検索・絞り込みに使用</p>
            <div className='mt-6'>
                <OptionsForm props={statusOptionsProps} />
            </div>
        </section>
    )


}