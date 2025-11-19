'use client'

import React, { useState } from 'react';
import { Mail, LockKeyhole, Eye, EyeOff, Loader2, ArrowRight, ShoppingBag } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import TextForm, { FieldTextProps } from '@/app/components/public/form/TextForm'
import PasswordForm, { FieldPasswordProps } from '@/app/components/public/form/PassWordForm';
import { LoginSchema, LoginValues } from '@/app/schemas/login'
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';


export default function Login() {

    const { handleSubmit, register, formState: { errors } } = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema)
    });
    const [submitting, setSubmitting] = useState<boolean>(false);

    const router = useRouter();

    const onSubmit = async (data: LoginValues) => {
        setSubmitting(true);
        try {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.ok) {
                toast.success('ログインに成功しました');
            } else {
                toast.error('メールアドレスまたはパスワードが正しくありません');
                return;
            }
            const shoppingFlg = sessionStorage.getItem('shopping');
            router.push(shoppingFlg === '1' ? '/cart' : '/home')

        } catch (error) {
            console.error('Login error:', error);
            toast.error('エラーが発生しました');
        } finally {
            setSubmitting(false);
        }
    };
    const emailProps: FieldTextProps<LoginValues> = {
        label: 'メールアドレス',
        name: 'email',
        register,
        inputStyle: 'mt-1 w-[90%] rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: 'you@example.com',
        errors
    }

    const passwordProps: FieldPasswordProps<LoginValues> = {
        label: 'パスワード',
        name: 'password',
        register,
        inputStyle: 'mt-1 w-[90%] rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        errors

    }

    return (
        <>
            <Toaster position='top-right' />
            <div className='min-h-screen grid grid-cols-1 md:grid-cols-2'>

                <div className='hidden md:flex items-center justify-center p-12 bg-gradient-to-br from-black via-[#050505] to-[#0a255f]'>
                    <div className='relative z-10 text-center'>
                        <h1 className='text-4xl lg:text-5xl font-extrabold tracking-tight text-brown-900 dark:text-white'>
                            Velour Cacao
                            <span className='block text-amber-400 mt-2'>Treat Yourself </span>

                        </h1>
                        <p className='mt-4 text-brown-700/80 dark:text-neutral-300 max-w-md mx-auto'>
                            ログインして、あなたのとっておきのチョコをお届け。<br />会員限定の先行セールや、バレンタインのギフト予約も。
                        </p>
                    </div>
                </div>
                <div className='grid place-items-center p-6 sm:p-10 bg-black/80 backdrop-blur-xl border-black/5'>
                    <div className='w-full max-w-md h-[75vh] border bg-black grid p-6 font-bold rounded-2xl'>
                        <div className='mt-5'>
                            <h1 className='text-3xl'>ログイン</h1>
                            <p className='mt-2'>メールアドレスとパスワードを入力してください</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                            <div>

                                <label className='inline-flex items-center gap-1.5'>
                                    <Mail className='w-4 h-4' aria-hidden='true' />
                                    メールアドレス
                                </label>
                                <TextForm props={emailProps} />
                            </div>
                            <div className='mt-1 relative'>
                                <label className='inline-flex items-center gap-1.5'>
                                    <LockKeyhole className='w-4 h-4' aria-hidden='true' />
                                    パスワード
                                </label>
                                <PasswordForm props={passwordProps} />
                            </div>
                            <div>
                                <a href='/account/reset' className='block text-sm font-medium text-amber-700 hover:underline dark:text-amber-400'>
                                    パスワードをお忘れですか？
                                </a>
                            </div>
                            <div>
                                <button
                                    type='submit'
                                    className='
                            group 
                            relative 
                            inline-flex 
                            w-full 
                            items-center 
                            justify-center 
                            gap-2 
                            rounded-xl 
                            bg-neutral-50 
                            px-4 
                            py-2.5 
                            text-custom-blue 
                            shadow-lg  
                            hover:bg-neutral-200 
                            hover:disabled:opacity-60 
                            hover:disabled:cursor-not-allowed'
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className='size-4 animate-spin' />
                                            ログインしています…
                                        </>
                                    ) : (
                                        <>
                                            ログイン
                                            <ArrowRight
                                                className='size-4 transition-transform group-hover:translate-x-0.5' />
                                        </>
                                    )
                                    }
                                </button>
                            </div>
                        </form>
                        <div>
                            <p className='mt-6 text-center text-sm text-brown-700/80 dark:text-neutral-300'>
                                アカウントをお持ちでないですか？
                                <a href='/account/register' className='ml-1 font-semibold text-amber-700 hover:underline dark:text-amber-400'>
                                    新規登録
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}