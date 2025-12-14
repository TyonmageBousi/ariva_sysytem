'use client'

import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form'
import TextForm, { FieldTextProps } from '@/app/components/public/form/TextForm';
import OptionsForm, { FiledOptionsProps } from '@/app/components/public/form/OptionsForm';

type AddressProps<T extends FieldValues> = {
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    style: string
}
export const prefectures = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県',
    '山形県', '福島県', '茨城県', '栃木県', '群馬県',
    '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県',
    '富山県', '石川県', '福井県', '山梨県', '長野県',
    '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県',
    '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
    '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県',
    '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県',
    '鹿児島県', '沖縄県'
] as const;

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
