'use client';
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

export type FieldTextProps<T extends FieldValues> = {
    label: string;
    labelStyle?: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    inputStyle?: string;
    placeholder?: string;
};

export default function NormalForm<T extends FieldValues>(props: FieldTextProps<T>) {
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
