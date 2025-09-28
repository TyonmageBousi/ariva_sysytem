import React from 'react'
import { UseFormRegister } from "react-hook-form";
import type { FormValues } from '@/app/types/product';
import TextAreaForm, { type FiledTextAreaProps } from "../../form/TextAreaForm";

type Props = {
    register: UseFormRegister<FormValues>;
};



export default function ProductInfoSection({ register }: Props) {

    // テキストエリア設定
    const descriptionTextAreaProps: FiledTextAreaProps<FormValues> = {
        label: "説明",
        name: "description",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        rows: 5,
        placeholder: "口どけのよいビターガナッシュに、ほのかな洋酒の香り…"
    };

    return (
        < section className="rounded-2xl border border-black/10 bg-neutral-800 p-6" >
            <div className="md:col-span-2">
                <TextAreaForm {...descriptionTextAreaProps} />
            </div>
        </section >
    )
}