import React from 'react'
import { FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
import TextAreaForm, { type FiledTextAreaProps } from '@/app/components/public/form/TextAreaForm';
import { NewProductValues } from '@/app/schemas/product'

type Props<T extends FieldValues> = {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>
};



export default function ProductInfoSection({ register, errors }: Props<NewProductValues>) {

    const descriptionTextAreaProps: FiledTextAreaProps<NewProductValues> = {
        label: '説明',
        name: 'description',
        labelStyle: 'block text-sm font-medium mb-1',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 bg-neutral-700 px-3 py-2.5 text-[15px]',
        rows: 5,
        placeholder: '口どけのよいビターガナッシュに、ほのかな洋酒の香り…',
        errors
    };

    return (
        < section className='rounded-2xl border border-black/10 bg-neutral-800 p-6' >
            <div className='md:col-span-2'>
                <TextAreaForm props={descriptionTextAreaProps} />
            </div>
        </section >
    )
}