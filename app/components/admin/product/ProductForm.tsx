import React from 'react'
import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";
import NormalForm, { type FieldNormalProps } from "../../form/NormalForm";
import CheckBoxForm, { type FiledCheckBoxLabels, type FiledCheckBoxProps } from "../../form/CheckBoxForm"
import OptionsForm, { type FiledOptionsProps } from "../../form/OptionsForm";
import { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../../admin/products/page"

type Props = {
    register: UseFormRegister<FormValues>;
};

export default function ProductForm({ register }: Props) {

    // 基本情報のフォーム設定
    const productNameFieldProps: FieldNormalProps = {
        label: "商品名",
        labelStyle: "block text-sm font-medium mb-1",
        name: "name",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: "生チョコ・ビター 8粒"
    };

    const productCodeFieldProps: FieldNormalProps = {
        label: "商品コード",
        labelStyle: "block text-sm font-medium mb-1",
        name: "productCode",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: "SKU-XXXX"
    };

    const priceFieldProps: FieldNormalProps = {
        label: "価格",
        labelStyle: "block text-sm font-medium mb-1",
        name: "price",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };

    const salePriceFieldProps: FieldNormalProps = {
        label: "割引価格",
        labelStyle: "block text-sm font-medium mb-1",
        name: "salePrice",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };

    // セレクト系フォーム設定
    const SALES_PERIOD_OPTIONS = ["通年", "期間限定"];
    const salesPeriodSelectProps: FiledOptionsProps = {
        label: "販売期間",
        name: "productPeriod",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        options: SALES_PERIOD_OPTIONS,
    };

    const COLOR_CATEGORY_OPTIONS: FiledCheckBoxLabels[] = [
        { id: 1, label: "赤" }
        , { id: 2, label: "青" }
        , { id: 3, label: "緑" }
        , { id: 4, label: "白" }
        , { id: 5, label: "茶" }
        , { id: 6, label: "黒" }
    ];
    const colorCategoryCheckboxProps: FiledCheckBoxProps = {
        label: "色分け",
        name: "colorCategory",
        labelStyle: "block text-sm font-medium mb-4",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        labels: COLOR_CATEGORY_OPTIONS,
    };

    const PRODUCT_STATUS_OPTIONS = ["下書き", "公開", "販売中止"];
    const productStatusSelectProps: FiledOptionsProps = {
        label: "状態",
        name: "productState",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        options: PRODUCT_STATUS_OPTIONS,
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
                    <NormalForm props={productNameFieldProps} />
                </div>
                <div>
                    <NormalForm props={productCodeFieldProps} />
                </div>
                <div>
                    <OptionsForm props={salesPeriodSelectProps} />
                </div>
                <div>
                    <NormalForm props={priceFieldProps} />
                </div>
                <div>
                    <NormalForm props={salePriceFieldProps} />
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
