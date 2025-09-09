'use client';
import type { UseFormRegister } from "react-hook-form";
import type { FormValues } from "../../admin/products/page";

export type FieldDateProps = {
    label: string;
    labelStyle?: string;
    name: keyof FormValues;                  // 例: "startDate" | "finishDate"
    register: UseFormRegister<FormValues>;
    inputStyle?: string;
};

type Props = { props: FieldDateProps };

export default function NormalDateForm({ props }: Props) {
    const { label, name, register, labelStyle, inputStyle} = props;

    return (
        <div>
            <label className={labelStyle} htmlFor={String(name)}>
                {label}
            </label>
            <input
                id={String(name)}
                type="date"
                {...register(name, { valueAsDate: true })}
                className={inputStyle}
            />
        </div>
    );
}
