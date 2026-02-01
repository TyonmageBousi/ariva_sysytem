'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AddressSchema, AddressValues } from '@/app/schemas/address'
import AddressContainer from '@/app/components/user/address/AddressContainer'
import { zodResolver } from '@hookform/resolvers/zod'
import { useErrorHandler } from '@/app/components/public/error/error';
import { useRouter } from 'next/navigation';

type Props = {
    defaultData: AddressValues
}

export default function Address({ defaultData }: Props) {

    const [showForm, setShowForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const { register, formState: { errors }, handleSubmit, setValue, reset }
        = useForm<AddressValues>({
            resolver: zodResolver(AddressSchema),
            defaultValues: {
                postalCode: defaultData?.postalCode ?? "",
                prefecture: defaultData?.prefecture ?? "",
                city: defaultData?.city ?? "",
                address1: defaultData?.address1 ?? "",
                address2: defaultData?.address2 ?? "",
            }
        });
    const handleError = useErrorHandler();
    const router = useRouter();

    useEffect(() => {
        if (showForm) {
            reset();
        } else {
        }
    }, [showForm]);


    const onSubmit = async (data: AddressValues) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/shippingAddresses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (!response.ok) {
                handleError(result);
                return
            }
            if (!result.success) {
                handleError(result);
                return;
            }
            if (result.success) {
                router.push('');
                return
            }
            throw new Error('予期しないエラーが発生しました')
        } catch (error) {
            throw error instanceof Error ? error : new Error('予期しないエラーが発生しました')
        }
    }
    return (
        <div className='w-[70%]'>
            <label>
                <input
                    type='radio'
                    name='addressType'
                    checked={!showForm}
                    onChange={() => setShowForm(false)}
                />
                <p>登録済の住所を使う</p>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="addressType"
                    checked={showForm}
                    onChange={() => setShowForm(true)}
                />
                <span>新しい住所を使う</span>
            </label>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='text-lg font-semibold'>お届け先情報</h2>
                    <AddressContainer
                        props={{
                            register,
                            errors,
                            style: '',
                        }}
                    />
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {showForm ? 'この住所に配送' : '登録住所に配送'}
                    </button>
                </form>
            </div>
        </div >
    )
}
