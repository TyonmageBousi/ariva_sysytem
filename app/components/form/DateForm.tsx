'use client';
import type { UseFormRegister, FieldError } from "react-hook-form";
import { FormValues } from "@/app/schemas/product"

export type FieldDateProps = {
    label: string;
    labelStyle?: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    error?: FieldError;
    inputStyle?: string;
};

type Props = { props: FieldDateProps };

export default function NormalDateForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle, error } = props;

    return (
        <div>
            <label className={labelStyle} htmlFor={String(name)}>
                {label}
            </label>
            <input
                id={String(name)}
                type="date"
                {...register(name, { valueAsDate: true })}
                className={inputStyle}
            />
            {error && (
                <p className="text-red-500">{error.message}</p>
            )}
        </div>
    );
}
