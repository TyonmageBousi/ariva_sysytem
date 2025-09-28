import React from 'react'
import { Save, Eye, Upload, Trash2, Send, Package } from "lucide-react";
import type { FormValues } from '@/app/types/product';
import NumberForm, { type FieldNumberProps } from "../../form/NumberForm";
import { UseFormRegister } from "react-hook-form";


type Props = {
    register: UseFormRegister<FormValues>;
};


export default function ProductStockSection({ register }: Props) {
    const priceFieldProps: FieldNumberProps<FormValues> = {
        label: "在庫数",
        labelStyle: "block text-sm font-medium mb-1",
        name: "stock",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        placeholder: ""
    };
    return (
        <section className="rounded-2xl border border-black/10 bg-neutral-800 p-6">
            <h1 className="flex items-center gap-2 text-lg font-semibold">
                <Package className="size-4" />
                <span>在庫</span>
            </h1>
            <p className="mt-1 text-sm text-black/60">在庫を管理する</p>
            <div className='grid grid-cols-2 gap-x-6 gap-y-5 mt-6'>
                <NumberForm {...priceFieldProps} />
            </div>
        </section>

    )


}