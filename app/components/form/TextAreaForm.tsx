'use client';
import type { UseFormRegister, FieldError } from "react-hook-form";
import { FormValues } from "@/app/schemas/product"

export type Options = string[];

export type FiledTextAreaProps = {
    label: string;
    labelStyle: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    error?: FieldError;
    inputStyle: string;
    rows: number
    placeholder?: string;
};

type Props = { props: FiledTextAreaProps };

export default function TextAreaForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle, rows, placeholder, error } = props;
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <textarea
                id={name}
                rows={rows}
                {...register(name)}
                className={inputStyle}
                placeholder={placeholder}
            >
                {error && (
                    <p className="text-red-500">{error.message}</p>
                )}
            </textarea>
        </div >
    );
}
