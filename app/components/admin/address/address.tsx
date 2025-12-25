'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AddressSchema, AddressValues } from '@/app/schemas/address'
import AddressContainer from '@/app/components/user/address/AddressContainer'
import { zodResolver } from '@hookform/resolvers/zod'
import { useErrorHandler } from '@/app/components/public/error/error';
import { useRouter } from 'next/navigation';

export default function Address(data: AddressValues) {

    const [showForm, setShowForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const { register, formState: { errors }, handleSubmit, setValue, reset }
        = useForm<AddressValues>({
            resolver: zodResolver(AddressSchema),
        });
    const handleError = useErrorHandler();
    const router = useRouter();

    const fetchAddress = async () => {
        const controller = new AbortController();
        (async () => {
            try {
                setValue('postalCode', data.postalCode);
                setValue('prefecture', data.prefecture);
                setValue('city', data.city);
                setValue('address1', data.address1);
                setValue('address2', data.address2 ?? '');
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error(error);
                }
            } finally {
                setLoading(false)
            }
        })();
        return () => controller.abort();
    }
    useEffect(() => {
        fetchAddress()
    }), [];

    useEffect(() => {
        if (showForm) {
            reset();
        } else {
            fetchAddress();
        }
    }, [showForm]);


    const onSubmit = async (data: AddressValues) => {
        try {
            const response = await fetch('http://localhost:3000/api/user/shippingAddresses', {
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
