import React from 'react'
import { FormValues } from "@/app/schemas/product"
import TextAreaForm, { type FiledTextAreaProps } from "../../form/TextAreaForm";
import { UseFormRegister, FieldErrors } from "react-hook-form";

type Props = {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>
};



export default function ProductInfoSection({ register, errors }: Props) {

    // テキストエリア設定
    const descriptionTextAreaProps: FiledTextAreaProps = {
        label: "説明",
        name: "description",
        labelStyle: "block text-sm font-medium mb-1",
        register,
        error: errors.name,
        inputStyle: "w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]",
        rows: 5,
        placeholder: "口どけのよいビターガナッシュに、ほのかな洋酒の香り…"
    };

    return (
        < section className="rounded-2xl border border-black/10 bg-neutral-800 p-6" >
            <div className="md:col-span-2">
                <TextAreaForm props={descriptionTextAreaProps} />
            </div>
        </section >
    )
}