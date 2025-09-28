'use client';
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

export type Options = string[];

export type FiledTextAreaProps<T extends FieldValues> = {
    label: string;
    labelStyle: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    inputStyle: string;
    rows: number
    placeholder?: string;
};

export default function TextAreaForm<T extends FieldValues>(props: FiledTextAreaProps<T>) {
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
d