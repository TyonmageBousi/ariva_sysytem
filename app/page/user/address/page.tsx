'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { AddressSchema, AddressValues } from '@/app/schemas/address'
import AddressContainer from '@/app/components/user/address/AddressContainer'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast';

export default function Address() {

    const [showForm, setShowForm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const { register, formState: { errors }, handleSubmit, setValue, reset }
        = useForm<AddressValues>({
            resolver: zodResolver(AddressSchema),
        });

    const fetchAddress = async () => {
        const controller = new AbortController();
        (async () => {
            try {
                setLoading(true)
                const res = await fetch('http://localhost:3000/api/user/address', { signal: controller.signal })
                if (!res.ok) throw new Error('住所取得に失敗しました。')
                const data = await res.json()
                setValue('postalCode', data.address.postalCode);
                setValue('prefecture', data.address.prefecture);
                setValue('city', data.address.city);
                setValue('address1', data.address.address1);
                setValue('address2', data.address.address2);
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
            const response = await fetch('http://localhost:3000/api/user/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error('送信に失敗しました。')
            }

        } catch (error) {
            toast.error('エラーが発生しました');

        } finally {

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