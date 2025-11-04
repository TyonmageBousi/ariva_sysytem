'use client';
import type { UseFormRegister, FieldValues, Path, FieldErrors } from 'react-hook-form';

export type FiledCheckBoxLabels = {
    id: number,
    label: string
}
export type FiledCheckBoxProps<T extends FieldValues> = {
    label: string;
    labelStyle: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    inputStyle: string;
    labels: FiledCheckBoxLabels[];
    errors: FieldErrors<T>
};

type Props<T extends FieldValues> = { props: FiledCheckBoxProps<T> }

export default function CheckBoxForm<T extends FieldValues>({ props }: Props<T>) {
    const { label, labelStyle, name, register, inputStyle, labels, errors } = props;

    return (
        <div>
            <label className={labelStyle}>{label}</label>
            {labels.map((label, index) => (
                <label key={index} className={inputStyle}>
                    <input
                        type='checkbox'
                        {...register(name)}
                        value={label.id}
                    />
                    {label.label}
                </label>
            ))}
            {errors[name] && <p className='error'>{String(errors[name]?.message)}</p>}

        </div>
    )
}