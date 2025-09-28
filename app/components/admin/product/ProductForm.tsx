'use client';

import React from 'react'
import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";
import TextForm, { type FieldTextProps } from "../../form/TextForm";
import NumberForm, { type FieldNumberProps } from "../../form/NumberForm";
import CheckBoxForm, { type FiledCheckBoxLabels, type FiledCheckBoxProps } from "../../form/CheckBoxForm"
import OptionsForm, { type FieldOptionsProps } from "../../form/OptionsForm";
import DateForm, { FieldDateProps } from "../../form/DateForm";
import { UseFormRegister } from "react-hook-form";
import type { FormValues } from '@/app/types/product';
type Props = {
    categories: FiledCheckBoxLabels[];
    colorCategories: FiledCheckBoxLabels[];
    register: UseFormRegister<FormValues>;
};

export default function ProductForm({ categories, colorCategories, register }: Props) {
    // 基本情報のフォーム設定
    const productNameFieldProps: FieldTextProps<FormValues> = {
        label: "商品名",
        labelStyle: "block text-sm font-medium mb-1",
        name: "name",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: "生チョコ・ビター 8粒"
    };

    const productCodeFieldProps: FieldTextProps<FormValues> = {
        label: "商品コード",
        labelStyle: "block text-sm font-medium mb-1",
        name: "skuCode",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: "SKU-XXXX"
    };

    const priceFieldProps: FieldNumberProps<FormValues> = {
        label: "価格",
        labelStyle: "block text-sm font-medium mb-1",
        name: "price",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };

    const salePriceFieldProps: FieldNumberProps<FormValues> = {
        label: "割引価格",
        labelStyle: "block text-sm font-medium mb-1",
        name: "discountPrice",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };

    const salesStartDateProps: FieldDateProps<FormValues> = {
        label: "販売期間",
        name: "saleStartAt",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
    };

    const salesEndDateProps: FieldDateProps<FormValues> = {
        label: "販売期間",
        name: "saleEndAt",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
    };
    const colorCategoryCheckboxProps: FiledCheckBoxProps<FormValues> = {
        label: "色分け",
        name: "colorCategoryIds",
        labelStyle: "block text-sm font-medium mb-4",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        labels: colorCategories,
    };

    const PRODUCT_STATUS_OPTIONS = ["下書き", "公開", "販売中止"];
    const productStatusSelectProps: FieldOptionsProps<FormValues> = {
        label: "状態",
        name: "status",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        options: categories,
    };

    return (
        // 商品情報セクション
        <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
                <Package className="size-4" />
                <span>商品情報</span>
            </h1>
            <p className="mt-1 text-sm text-black/60">商品名、商品コード、価格など</p>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
                <div>
                    <TextForm {...productNameFieldProps} />
                </div>
                <div>
                    <TextForm {...productCodeFieldProps} />
                </div>
                <div>
                    <NumberForm {...priceFieldProps} />
                </div>
                <div>
                    <NumberForm {...salePriceFieldProps} />
                </div>
                <div>
                    <DateForm {...salesStartDateProps} />
                </div>
                <div>
                    <DateForm {...salesEndDateProps} />
                </div>
                <div>
                    <CheckBoxForm {...colorCategoryCheckboxProps} />
                </div>
                <div>
                    <OptionsForm {...productStatusSelectProps} />
                </div>
            </div>
        </section>
    );
}
