'use client';
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

export type FieldDateProps<T extends FieldValues> = {
    label: string;
    labelStyle?: string;
    name: Path<T>;                  
    register: UseFormRegister<T>;
    inputStyle?: string;
};

export default function NormalDateForm<T extends FieldValues>(props: FieldDateProps<T>) {
    const { label, name, register, labelStyle, inputStyle } = props;

    return (
        <div>
            <label className={labelStyle} htmlFor={String(name)}>
                {label}
            </label>
            <input
                id={name}
                type="date"
                {...register(name)}
                className={inputStyle}
            />
        </div>
    );
}
