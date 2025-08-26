'use client';
import type { UseFormRegister } from "react-hook-form";
import { Control, useController, Path } from "react-hook-form";
import type { FormValues } from "../../admin/products/page"


export type Options = string[];

export type FiledOptionsProps = {
    label: string;
    labelStyle: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    inputStyle: string;
    options: string[];

};

type Props = { props: FiledOptionsProps };

export default function NormalForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle, options } = props;
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <select
                id={name}
                {...register(name)}
                className={inputStyle}
            >
                {
                    options.map((option, index) => (
                        < option value={index}>{option}</option>
                    ))}
            </select>
        </div >
    );
}
