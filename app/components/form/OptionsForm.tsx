'use client';
import type { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";
import { Control, useController, Path } from "react-hook-form";

export type FiledOptions = {
    id: number
    label: string
}
export type FiledOptionsProps<T extends FieldValues> = {
    label: string;
    labelStyle?: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    inputStyle?: string;
    options: FiledOptions[];
    errors: FieldErrors<T>
};

type Props<T extends FieldValues> = { props: FiledOptionsProps<T> };

export default function NormalForm<T extends FieldValues>({ props }: Props<T>) {
    const { label, name, register, labelStyle, inputStyle, options,errors } = props;
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
            {errors[name] && <p className="error">{String(errors[name]?.message)}</p>}

        </div >
    );
}
