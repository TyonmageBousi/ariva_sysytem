'use client';
import type { UseFormRegister, FieldError } from "react-hook-form";
import { FormValues } from "@/app/schemas/product"

export type FiledOptions = {
    id: number
    label: string
}
export type FiledOptionsProps = {
    label: string;
    labelStyle: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    error?: FieldError;
    inputStyle: string;
    options: FiledOptions[];

};

type Props = { props: FiledOptionsProps };

export default function NormalForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle, options, error } = props;
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <select
                id={name}
                {...register(name, { valueAsNumber: true })}
                className={inputStyle}
            >
                {error && (
                    <p className="text-red-500">{error.message}</p>
                )}
                {
                    options.map((option, index) => (
                        < option value={index}>{option.label}</option>
                    ))}
            </select>
        </div >
    );
}
