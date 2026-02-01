'use client'

import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form'
import TextForm, { FieldTextProps } from '@/components/TextForm';
import OptionsForm, { FiledOptionsProps } from '@/components/OptionsForm';
import { prefectures } from '@/app/types/address'

type AddressProps<T extends FieldValues> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    style: string
}


export default function Address<T extends FieldValues>({ props }: { props: AddressProps<T> }) {
    const { register, errors, style } = props

    const postalCodeProps: FieldTextProps<T> = {
        label: '郵便番号',
        name: 'postalCode' as Path<T>,
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        errors
    }

    const prefectureProps: FiledOptionsProps<T> = {
        label: '都道府県',
        name: 'prefecture' as Path<T>,
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        options: prefectures,
        errors
    }

    const cityProps: FieldTextProps<T> = {
        label: '市町村',
        name: 'city' as Path<T>,
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        errors
    }
    const address1Props: FieldTextProps<T> = {
        label: '丁目・番地',
        name: 'address1' as Path<T>,
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text:[15px] text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        errors
    }

    const address2Props: FieldTextProps<T> = {
        label: '建物名・部屋番号（任意）',
        name: 'address2' as Path<T>,
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        errors
    }

    return (
        < section className={style}>
            <div>
                <TextForm props={postalCodeProps} />
            </div>

            <div>
                <OptionsForm props={prefectureProps} />
            </div>

            <div>
                <TextForm props={cityProps} />
            </div>

            <div>
                <TextForm props={address1Props} />
            </div>

            <div>
                <TextForm props={address2Props} />
            </div>
        </section>
    )
}
