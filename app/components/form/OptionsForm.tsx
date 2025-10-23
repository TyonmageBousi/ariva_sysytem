'use client';
import type { UseFormRegister } from "react-hook-form";
import { Control, useController, Path } from "react-hook-form";
import type { FormValues } from "../../types/product"

export type FiledOptions = {
    id: number
    label: string
}

export type FiledOptionsProps = {
    label: string;
    labelStyle: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    inputStyle: string;
    options: FiledOptions[];

};

type Props = { props: FiledOptionsProps };

export default function NormalForm({ props }: Props) {
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
