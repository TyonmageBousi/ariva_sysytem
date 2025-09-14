'use client';
import type { UseFormRegister, FieldError } from "react-hook-form";
import { FormValues } from "@/app/schemas/product"

export type FieldTextProps = {
    label: string;
    labelStyle?: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    error?: FieldError;
    inputStyle?: string;
    placeholder?: string;
};

type Props = { props: FieldTextProps };

export default function NormalForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle, placeholder, error } = props;
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <input
                id={name}
                type="text"
                inputMode="text"
                {...register(name)}
                className={inputStyle}
                placeholder={placeholder}
            />
            {error && (
                <p className="text-red-500">{error.message}</p>
            )}
        </div>
    );
}
