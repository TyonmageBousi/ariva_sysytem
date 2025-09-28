'use client';
import type { UseFormRegister } from "react-hook-form";
import { Path, FieldValues } from "react-hook-form";

export type FiledOptions = {
    id: number
    label: string
}
export type FieldOptionsProps<T extends FieldValues> = {
    label: string;
    labelStyle: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    inputStyle: string;
    options: FiledOptions[];

};

export default function NormalForm<T extends FieldValues>(props: FieldOptionsProps<T>) {
    const { label, name, register, labelStyle, inputStyle, options } = props;
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <select
                id={name}
                {...register(name, { valueAsNumber: true })}
                className={inputStyle}
            >
                {
                    options.map((option, index) => (
                        < option value={index}>{option.label}</option>
                    ))}
            </select>
        </div >
    );
}
