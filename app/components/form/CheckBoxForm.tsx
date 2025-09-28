import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
export type FiledCheckBoxLabels = {
    id: number
    label: string
}

export type FiledCheckBoxProps<T extends FieldValues> = {
    label: string;
    labelStyle: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    inputStyle: string;
    labels: FiledCheckBoxLabels[];
};


export default function CheckBoxForm<T extends FieldValues>(props: FiledCheckBoxProps<T>) {
    const { label, labelStyle, name, register, inputStyle, labels } = props;

    return (
        <div>
            <label className={labelStyle}>{label}</label>
            {labels.map((item: FiledCheckBoxLabels) => (
                <label key={item.id} className={inputStyle}>
                    <input
                        type="checkbox"
                        {...register(name)}
                        value={item.id}
                    />
                    {item.label}
                </label>
            ))}
        </div>
    )
}