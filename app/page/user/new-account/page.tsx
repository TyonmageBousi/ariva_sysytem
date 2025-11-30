'use client'

import { Mail, Lock, User, Phone, Calendar, Home } from 'lucide-react'
import { useForm } from 'react-hook-form';
import TextForm, { FieldTextProps } from '@/app/components/public/form/TextForm';
import DateForm, { FieldDateProps } from '@/app/components/public/form/DateForm';
import OptionsForm, { FiledOptionsProps} from '@/app/components/public/form/OptionsForm';
import PasswordForm, { FieldPasswordProps } from '@/app/components/public/form/PassWordForm';
import { NewAccountSchema, NewAccountValues } from '@/app/schemas/newAccount'
import { zodResolver } from '@hookform/resolvers/zod';
import  AddressContainer  from '@/app/components/user/address/AddressContainer';


export default function NewAccount() {
    const { handleSubmit, register, formState: { errors } }
        = useForm<NewAccountValues>({
            resolver: zodResolver(NewAccountSchema),
        });

    const nameProps: FieldTextProps<NewAccountValues> = {
        label: '名前',
        name: 'name',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const phoneProps: FieldTextProps<NewAccountValues> = {
        label: '携帯番号',
        name: 'phone',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const birthdayProps: FieldDateProps<NewAccountValues> = {
        label: '誕生日',
        name: 'birthday',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        errors
    }

    const emailProps: FieldTextProps<NewAccountValues> = {
        label: 'メールアドレス',
        name: 'email',
        register,
        inputStyle: 'wmt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }
    const postalCodeProps: FieldTextProps<NewAccountValues> = {
        label: '郵便番号',
        name: 'postalCode',
        register,
        inputStyle: 'mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        placeholder: '',
        errors
    }

    const passwordProps: FieldPasswordProps<NewAccountValues> = {
        label: 'パスワード',
        name: 'password',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] pr-10 outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        errors
    }
    const confirmPassWordProps: FieldPasswordProps<NewAccountValues> = {
        label: '確認用パスワード',
        name: 'confirmPassword',
        register,
        inputStyle: 'w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] pr-10 outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500',
        errors
    }

    const onSubmit = async (data: NewAccountValues) => {
        try {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('name', data.name);
            formData.append('phone', data.phone);
            formData.append('birthday', data.birthday.toISOString().split('T')[0]);
            formData.append('password', data.password);
            formData.append('confirmPassword', data.confirmPassword);
            formData.append('postalCode', data.postalCode);
            formData.append('prefecture', String(data.prefecture));
            formData.append('city', data.city);
            formData.append('address1', data.address1);
            if (data.address2) formData.append('address2', data.address2);

            console.log(formData)
            const response = await fetch('http://localhost:3000/api/newAccount', {
                method: 'POST',
                body: formData
            });
        }
        catch (error) {
            console.error('送信エラー:', error);
        }
    }
    return (
        <div className='min-h-screen md:pl-[50vw] relative'>
            <div className='
            md:flex
            md:fixed 
            md:inset-y-0 
            md:left-0 
            md:w-1/2 
            hidden 
            items-center 
            justify-center 
            p-12
            bg-gradient-to-br from-black via-[#050505] to-[#0a255f]
            '>
                <div className='relative z-10 text-center'>
                    <h1 className='text-4xl lg:text-5xl font-extrabold tracking-tight text-brown-900'>
                        Velour Cacao
                        <span className='block text-amber-400 mt-2'>Treat Yourself</span>
                    </h1>
                    <p className='mt-4 text-brown-700/80 max-w-md mx-auto'>
                        ログインして、あなたのとっておきのチョコをお届け。<br />
                        会員限定の先行セールや、バレンタインのギフト予約も。
                    </p>
                </div>
            </div>
            <div className='grid place-items-center p-6 sm:p-10 bg-black'>
                <div className='w-full max-w-md h-auto border bg-black grid p-6 font-bold rounded-2xl'>
                    <div className='mt-5'>
                        <h1 className='text-3xl'>新規登録</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className='space-y-8'>
                        {/* アカウント情報 */}
                        <section className='space-y-4'>
                            <h2 className='text-lg font-semibold'>アカウント情報</h2>
                            {/* 氏名 */}
                            <div>
                                <label htmlFor='fullName' className='inline-flex items-center gap-1.5'>
                                    <User className='w-4 h-4' aria-hidden='true' /> 氏名
                                </label>\\\\
                                <TextForm props={nameProps} />
                            </div>
                            {/* メール */}
                            <div>
                                <label htmlFor='email' className='inline-flex items-center gap-1.5'>
                                    <Mail className='w-4 h-4' aria-hidden='true' /> メールアドレス
                                </label>
                                <TextForm props={emailProps} />
                            </div>

                            {/* パスワード */}
                            <div>
                                <label htmlFor='password' className='inline-flex items-center gap-1.5'>
                                    <Lock className='w-4 h-4' aria-hidden='true' /> パスワード
                                </label>
                                <PasswordForm props={passwordProps} />
                            </div>

                            {/* パスワード（確認） */}
                            <div>
                                <label htmlFor='confirmPwd' className='inline-flex items-center gap-1.5'>
                                    <Lock className='w-4 h-4' aria-hidden='true' /> パスワード（確認）
                                </label>
                                <PasswordForm props={confirmPassWordProps} />
                            </div>

                            {/* 電話番号(任意) */}
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor='phone' className='inline-flex items-center gap-1.5'>
                                        <Phone className='w-4 h-4' aria-hidden='true' /> 電話番号（任意）
                                    </label>
                                    <TextForm props={phoneProps} />
                                </div>
                                {/* 生年月日(任意) */}
                                <div>
                                    <label htmlFor='birthday' className='inline-flex items-center gap-1.5'>
                                        <Calendar className='w-4 h-4' aria-hidden='true' /> 生年月日（任意）
                                    </label>
                                    <DateForm props={birthdayProps} />
                                </div>
                            </div>
                        </section>

                        {/* お届け先情報 */}
                        <section className='space-y-4'>
                            <h2 className='text-lg font-semibold'>お届け先情報</h2>
                            <div className='grid gap-4 sm:grid-cols-3'>
                                <div className='sm:col-span-1'>
                                    <label htmlFor='postalCode' className='inline-flex items-center gap-1.5'>
                                        <Home className='w-4 h-4' aria-hidden='true' /> 郵便番号
                                    </label>
                                    <TextForm props={postalCodeProps} />
                                </div>
                                <div className='sm:col-span-2'>
                                    <label htmlFor='prefecture' className='inline-flex items-center gap-1.5'>
                                        都道府県
                                    </label>
                                    <OptionsForm props={prefectureProps} />
                                </div>
                            </div>
                            <div className='grid gap-4 sm:grid-cols-2'>
                                <div>
                                    <label htmlFor='city'>市区町村</label>
                                    <TextForm props={cityProps} />
                                </div>
                                <div>
                                    <label htmlFor='address1'>丁目・番地</label>
                                    <TextForm props={address1Props} />
                                </div>
                            </div>
                            <div>
                                <label htmlFor='address2'>建物名・部屋番号（任意）</label>
                                <TextForm props={address2Props} />
                            </div>
                        </section>
                        <button
                            type='submit'
                            className='flex w-full items-center justify-center rounded-xl 
                            bg-amber-400 px-4 py-2.5 text-white 
                            font-medium shadow-lg shadow-amber-400/20 
                            hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-4 
                            focus-visible:ring-amber-500/30 disabled:opacity-70 disabled:cursor-not-allowed'
                        >
                            送信
                        </button>
                        <p className='text-center text-sm text-brown-700/80 dark:text-white/70'>
                            すでにアカウントをお持ちの方は{' '}
                            <a href='/account/login' className='font-medium text-amber-700 hover:underline dark:text-amber-400'>こちら</a>
                            からログイン
                        </p>
                    </form>
                </div>
            </div >
        </div >
    )
}