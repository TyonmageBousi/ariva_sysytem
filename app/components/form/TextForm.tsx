'use client';
import type { FieldValues, UseFormRegister, Path ,FieldErrors} from "react-hook-form";

export type FieldTextProps<T extends FieldValues> = {
    label: string;
    labelStyle?: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    inputStyle?: string;
    placeholder?: string;
    errors: FieldErrors<T>
};

type Props<T extends FieldValues> = { props: FieldTextProps<T> };

export default function NormalForm<T extends FieldValues>({ props }: Props<T>) {

    const { label, name, register, labelStyle, inputStyle, placeholder ,errors} = props;
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <input
                id={name}
                type="text"
                inputMode="text"
                {...register(name)}
                className={inputStyle}
                placeholder={placeholder}
            />
            {errors[name] && <p className="error">{String(errors[name]?.message)}</p>}
        </div>
    );
}
