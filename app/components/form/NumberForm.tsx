'use client';
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

export type FieldNumberProps<T extends FieldValues> = {
    label: string;
    labelStyle?: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    inputStyle?: string;
    placeholder?: string;
};

export default function NormalForm<T extends FieldValues>(props: FieldNumberProps<T>) {
    const { label, name, register, labelStyle, inputStyle, placeholder } = props;
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <input
                id={name}
                type="number"
                inputMode="numeric"
                {...register(name, { valueAsNumber: true })}
                className={inputStyle}
                placeholder={placeholder}
            />
        </div>
    );
}
