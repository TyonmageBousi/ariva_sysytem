'use client'

import NumberForm, { type FieldNumberProps } from "@/components/NumberForm"
import TextForm, { type FieldTextProps } from "@/components/TextForm"
import CheckBoxForm, { type FiledCheckBoxLabels, type FiledCheckBoxProps } from "@/components/CheckBoxForm"
import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import { SearchProductValues } from '@/app/schemas/searchProduct'



type Props<T extends FieldValues> = {
    categories: FiledCheckBoxLabels[];
    colorCategories: FiledCheckBoxLabels[];
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;

};

export default function SearchFunction({ categories, colorCategories, register, errors }: Props<SearchProductValues>) {



    const productNameFieldProps: FieldTextProps<SearchProductValues> = {
        label: '商品名',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'name',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        placeholder: '生チョコ・ビター 8粒',
        errors
    };

    const skuCodeFieldProps: FieldTextProps<SearchProductValues> = {
        label: 'SKUコード',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'skuCode',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        placeholder: 'SKU-XXXX',
        errors
    };

    const startPriceFieldProps: FieldNumberProps<SearchProductValues> = {
        label: '価格（開始）',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'startPrice',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        placeholder: '0',
        errors
    };

    const endPriceFieldProps: FieldNumberProps<SearchProductValues> = {
        label: '価格（終了）',
        labelStyle: 'block text-sm font-medium mb-1',
        name: 'endPrice',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        placeholder: '10000',
        errors
    };

    const categoryCheckboxProps: FiledCheckBoxProps<SearchProductValues> = {
        label: 'カテゴリー',
        name: 'categoryIds',
        labelStyle: 'block text-sm font-medium mb-4',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        labels: categories,
        errors
    };

    const colorCheckboxProps: FiledCheckBoxProps<SearchProductValues> = {
        label: '色',
        name: 'colorIds',
        labelStyle: 'block text-sm font-medium mb-4',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        labels: colorCategories,
        errors
    };

    return (
        <section className="rounded-xl border border-amber-900/20 bg-neutral-900/80 backdrop-blur p-5 shadow-lg sticky top-4">
            <div className="space-y-4">
                {/* ヘッダー */}
                <div className="flex items-center justify-between pb-3 border-b border-amber-900/30">
                    <h2 className="text-lg font-medium text-amber-100/90">絞り込み</h2>
                    <button
                        type="button"
                        // onClick={() => reset()}
                        className="text-xs text-neutral-400 hover:text-amber-100 transition"
                    >
                        クリア
                    </button>
                </div>

                {/* フィールド */}
                <div className="space-y-3">
                    <TextForm props={productNameFieldProps} />
                    <TextForm props={skuCodeFieldProps} />

                    {/* 価格範囲 - コンパクト */}
                    <div className="space-y-2">
                        <p className="text-xs font-medium text-amber-100/70">価格</p>
                        <div className="flex items-center gap-2">
                            <NumberForm props={{ ...startPriceFieldProps, label: '' }} />
                            <span className="text-neutral-500 text-sm">〜</span>
                            <NumberForm props={{ ...endPriceFieldProps, label: '' }} />
                        </div>
                    </div>

                    <CheckBoxForm props={categoryCheckboxProps} />
                    <CheckBoxForm props={colorCheckboxProps} />
                </div>

                {/* 検索ボタン */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-900 to-amber-800 hover:from-amber-800 hover:to-amber-700 text-amber-50 font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    この条件で検索
                </button>
            </div>
        </section>
    );




}