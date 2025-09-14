import type { FieldError, UseFormRegister } from "react-hook-form";
import React, { useState } from 'react';
import { FormValues } from "@/app/schemas/product"


export type FiledCheckBoxLabels = {
    id: number
    label: string
}

type Props = { props: FiledCheckBoxProps };


export type FiledCheckBoxProps = {
    label: string;
    labelStyle: string;
    name: keyof FormValues;
    register: UseFormRegister<FormValues>;
    error?: FieldError;
    inputStyle: string;
    labels: FiledCheckBoxLabels[];
};


export default function CheckBoxForm({ props }: Props) {
    const { label, labelStyle, name, register, inputStyle, labels, error } = props;

    return (
        <div>
            <label className={labelStyle}>{label}</label>
            {labels.map((label, index) => (
                <label key={index} className={inputStyle}>
                    <input
                        type="checkbox"
                        {...register(name)}
                        value={label.id}
                    />
                    {error && (
                        <p className="text-red-500">{error.message}</p>
                    )}
                    {label.label}
                </label>
            ))}
        </div>
    )
}