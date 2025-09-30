import type { UseFormRegister } from "react-hook-form";
import React, { useState } from 'react';
import type { FormValues } from "../../types/product"


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
    inputStyle: string;
    labels: FiledCheckBoxLabels[];
};


export default function CheckBoxForm({ props }: Props) {
    const { label, labelStyle, name, register, inputStyle, labels } = props;

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
                    {label.label}
                </label>
            ))}
        </div>
    )
}