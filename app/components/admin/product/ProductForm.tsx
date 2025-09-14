'use client';

import React from 'react'
import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";
import TextForm, { type FieldTextProps } from "../../form/TextForm";
import NumberForm, { type FieldNumberProps } from "../../form/NumberForm";
import CheckBoxForm, { type FiledCheckBoxLabels, type FiledCheckBoxProps } from "../../form/CheckBoxForm"
import OptionsForm, { type FiledOptionsProps } from "../../form/OptionsForm";
import DateForm, { FieldDateProps } from "../../form/DateForm";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "@/app/schemas/product"
type Props = {
    categories: FiledCheckBoxLabels[];
    colorCategories: FiledCheckBoxLabels[];
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
};

export default function ProductForm({ categories, colorCategories, register, errors }: Props) {
    // 基本情報のフォーム設定
    const productNameFieldProps: FieldTextProps = {
        label: "商品名",
        labelStyle: "block text-sm font-medium mb-1",
        name: "name",
        register,
        error: errors.name,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: "生チョコ・ビター 8粒"
    };

    const productCodeFieldProps: FieldTextProps = {
        label: "商品コード",
        labelStyle: "block text-sm font-medium mb-1",
        name: "skuCode",
        register,
        error: errors.skuCode,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: "SKU-XXXX"
    };

    const priceFieldProps: FieldNumberProps = {
        label: "価格",
        labelStyle: "block text-sm font-medium mb-1",
        name: "price",
        register,
        error: errors.price,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };

    const salePriceFieldProps: FieldNumberProps = {
        label: "割引価格",
        labelStyle: "block text-sm font-medium mb-1",
        name: "discountPrice",
        register,
        error: errors.discountPrice,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };

    const salesStartDateProps: FieldDateProps = {
        label: "販売期間",
        name: "saleStartAt",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        error: errors.saleStartAt,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
    };

    const salesEndDateProps: FieldDateProps = {
        label: "販売期間",
        name: "saleEndAt",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        error: errors.saleEndAt,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
    };
    const colorCategoryCheckboxProps: FiledCheckBoxProps = {
        label: "色分け",
        name: "colorCategoryIds",
        labelStyle: "block text-sm font-medium mb-4",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        labels: colorCategories,
    };

    const PRODUCT_STATUS_OPTIONS = ["下書き", "公開", "販売中止"];
    const productStatusSelectProps: FiledOptionsProps = {
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
                    <TextForm props={productNameFieldProps} />
                </div>
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
                    <OptionsForm props={productStatusSelectProps} />
                </div>
            </div>
        </section>
    );
}
