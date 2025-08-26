import React from 'react'
import CheckBoxForm, { type FiledCheckBoxLabels, type FiledCheckBoxProps } from "../../form/CheckBoxForm"
import { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../../admin/products/page"
import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";

type Props = {
    register: UseFormRegister<FormValues>;
};


export default function ProductCategorySection({ register }: Props) {
    const SEARCH_LABEL_OPTIONS: FiledCheckBoxLabels[] = [
        { id: 1, label: "NEW" },
        { id: 2, label: "ギフト" },
        { id: 3, label: "季節限定" },
    ];

    const searchLabelsCheckboxProps: FiledCheckBoxProps = {
        label: "検索・絞り込みに使用",
        name: "searchLabels",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "block px-3 py-1",
        labels: SEARCH_LABEL_OPTIONS
    };
    return (
        <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
                <Save className="size-4" />
                <span>カテゴリー & タグ</span>
            </h1>
            <p className="mt-1 text-sm text-black/60">検索・絞り込みに使用</p>
            <div className='mt-6'>
                <CheckBoxForm props={searchLabelsCheckboxProps} />
            </div>
        </section>
    )


}