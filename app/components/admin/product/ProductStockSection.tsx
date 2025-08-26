import React from 'react'
import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";
import CheckBoxForm, { type FiledCheckBoxLabels, type FiledCheckBoxProps } from "../../form/CheckBoxForm";
import type { FormValues } from "../../../admin/products/page"
import type { Control } from "react-hook-form";
import NormalForm, { type FieldNormalProps } from "../../form/NormalForm";
import { useWatch, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<FormValues>;
    control: Control<FormValues>; // controlを追加
};

export default function ProductStockSection({ register, control }: Props) {

    const PRODUCT_TYPE_OPTIONS: FiledCheckBoxLabels[] = [
        { id: 1, label: "2個入り" },
        { id: 2, label: "4個入り" },
        { id: 3, label: "6個入り" },
    ];

    const productTypesCheckboxProps: FiledCheckBoxProps = {
        label: "種類",
        name: "productTypes",
        labelStyle: "text-sm font-medium mb-1",
        register,
        inputStyle: "block px-3 py-1",
        labels: PRODUCT_TYPE_OPTIONS,
    };
    const watched = useWatch({
        control,
        name: 'productTypes',
    });

    // 文字列/数値/undefined でも必ず配列にする
    const selectedProductTypes = Array.isArray(watched) ? watched : watched != null && watched !== '' ? [watched] : [];

    return (
        <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
                <Package className="size-4" />
                <span>在庫</span>
            </h1>
            <p className="mt-1 text-sm text-black/60">在庫を管理する</p>
            <div className='grid grid-cols-2 gap-x-6 gap-y-5 mt-6'>
                <CheckBoxForm props={productTypesCheckboxProps} />
                <div></div> {/* チェックボックスの隣は空白 */}
                {selectedProductTypes.length === 0 ? (
                    <div className="col-span-2">
                        <p className="text-white">種類を入力してください</p>
                    </div>
                ) : (
                    selectedProductTypes.map((typeId, index) => {
                        const productType = PRODUCT_TYPE_OPTIONS.find(option => option.id === Number(typeId));
                        const stockFieldProps: FieldNormalProps = {
                            label: "在庫",
                            labelStyle: "block text-sm font-medium mb-1",
                            name: `stock${Number(typeId)}`,
                            register,
                            inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
                            placeholder: "1500",
                        };
                        return (
                            <>
                                {/* 商品種類ラベル */}
                                <div key={`label-${typeId}`} className="flex items-center">
                                    <span className="text-white">
                                        {productType?.label || `種類${typeId}`}
                                    </span>
                                </div>
                                {/* 在庫入力フィールド */}
                                <div key={`stock-${typeId}`}>
                                    <NormalForm props={stockFieldProps} />
                                </div>
                            </>
                        );
                    })
                )}
            </div>
        </section>

    )


}