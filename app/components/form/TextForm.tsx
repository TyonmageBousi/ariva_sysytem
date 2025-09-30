'use client';
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../admin/products/page"

export type FieldTextProps = {
    label: string;
    labelStyle?: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    inputStyle?: string;
    placeholder?: string;
};

type Props = { props: FieldTextProps };

export default function NormalForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle, placeholder } = props;
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
        </div>
    );
}
