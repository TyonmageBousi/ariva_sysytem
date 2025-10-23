'use client';
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../admin/products/page"

export type FieldNormalProps = {
    label: string;
    labelStyle?: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    inputStyle?: string;
    placeholder?: string;
};

type Props = { props: FieldNormalProps };

export default function NormalForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle, placeholder } = props;
    const isNumberField = name === "price";
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <input
                id={name}
                type={isNumberField ? "number" : "text"}
                inputMode={isNumberField ? "numeric" : "text"}
                {...register(name, isNumberField ? { valueAsNumber: true } : undefined)}
                className={inputStyle}
                placeholder={placeholder}
            />
        </div>
    );
}
