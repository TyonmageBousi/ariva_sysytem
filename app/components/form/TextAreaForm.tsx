'use client';
import { option } from "framer-motion/client";
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../types/product"

export type Options = string[];

export type FiledTextAreaProps = {
    label: string;
    labelStyle: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    inputStyle: string;
    rows: number
    placeholder?: string;
};

type Props = { props: FiledTextAreaProps };

export default function TextAreaForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle, rows, placeholder } = props;
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
            </textarea>
        </div >
    );
}
