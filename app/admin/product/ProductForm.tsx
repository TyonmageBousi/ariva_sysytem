'use client';

import React from 'react'
import { Package } from 'lucide-react';
import TextForm, { type FieldTextProps } from '@/app/components/public/form/TextForm';
import NumberForm, { type FieldNumberProps } from '@/app/components/public/form/NumberForm';
import CheckBoxForm, { type FiledCheckBoxLabels, type FiledCheckBoxProps } from '@/app/components/public/form/CheckBoxForm'
import DateForm, { FieldDateProps } from '@/app/components/public/form/DateForm';
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { NewProductValues } from '@/app/schemas/product'


type Props<T extends FieldValues> = {
    categories: FiledCheckBoxLabels[];
    colorCategories: FiledCheckBoxLabels[];
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;

};

export default function ProductForm({ categories, colorCategories, register, errors }: Props<NewProductValues>) {
    // 基本情報のフォーム設定
    const productNameFieldProps: FieldTextProps<NewProductValues> = {
        label: '商品名',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'name',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        placeholder: '生チョコ・ビター 8粒',
        errors
    };

    const productCodeFieldProps: FieldTextProps<NewProductValues> = {
        label: '商品コード',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'skuCode',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        placeholder: 'SKU-XXXX',
        errors
    };

    const priceFieldProps: FieldNumberProps<NewProductValues> = {
        label: '価格',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'price',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        placeholder: '',
        errors
    };
    const salePriceFieldProps: FieldNumberProps<NewProductValues> = {
        label: '割引価格',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'discountPrice',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        placeholder: '',
        errors
    };

    const salesStartDateProps: FieldDateProps<NewProductValues> = {
        label: '販売期間',
        name: 'saleStartAt',
        labelStyle: 'block text-sm font-medium mb-1',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        errors
    };

    const salesEndDateProps: FieldDateProps<NewProductValues> = {
        label: '販売期間',
        name: 'saleEndAt',
        labelStyle: 'block text-sm font-medium mb-1',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        errors
    };
    const colorCategoryCheckboxProps: FiledCheckBoxProps<NewProductValues> = {
        label: 'タグ',
        name: 'categoryIds',
        labelStyle: 'block text-sm font-medium mb-4',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        labels: categories,
        errors
    };

    const categoryCheckboxProps: FiledCheckBoxProps<NewProductValues> = {
        label: '色分け',
        name: 'colorIds',
        labelStyle: 'block text-sm font-medium mb-4',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        labels: colorCategories,
        errors
    };

    return (
        // 商品情報セクション
        <section className='rounded-2xl border border-black/10 bg-neutral-800 p-6'>
            <h1 className='flex items-center gap-2 text-lg font-semibold'>
                <Package className='size-4' />
                <span>商品情報</span>
            </h1>
            <p className='mt-1 text-sm text-black/60'>商品名、商品コード、価格など</p>

            <div className='mt-6 grid grid-cols-2 gap-x-6 gap-y-5'>
                <div>
                    <TextForm props={productNameFieldProps} />
                </div >
                <div>
                    <TextForm props={productCodeFieldProps} />
                </div>
                <div>
                    <NumberForm props={priceFieldProps} />
                </div>
                <div>
                    <NumberForm props={salePriceFieldProps} />
                </div>
                <div>
                    <DateForm props={salesStartDateProps} />
                </div>
                <div>
                    <DateForm props={salesEndDateProps} />
                </div>
                <div>
                    <CheckBoxForm props={colorCategoryCheckboxProps} />
                </div>
                <div>
                    <CheckBoxForm props={categoryCheckboxProps} />
                </div>
            </div >
        </section >
    );
}
