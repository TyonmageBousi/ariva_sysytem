'use client'

import { Mail, Lock, User, Phone, Calendar, } from 'lucide-react'
import { useForm } from 'react-hook-form';
import TextForm, { FieldTextProps } from '@/app/components/public/form/TextForm';
import DateForm, { FieldDateProps } from '@/app/components/public/form/DateForm';
import PasswordForm, { FieldPasswordProps } from '@/app/components/public/form/PassWordForm';
import { NewAccountSchema, NewAccountValues } from '@/app/schemas/newAccount'
import { zodResolver } from '@hookform/resolvers/zod';
import AddressContainer from '@/app/components/user/address/AddressContainer';
import { handleError } from '@/lib/errors';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import AccountSection from '@/components/layouts/AccountSection'



export default function NewAccount() {

    const { handleSubmit, register, formState: { errors }, watch }
        = useForm<NewAccountValues>({
            resolver: zodResolver(NewAccountSchema),
        });

    const prefecture = watch('prefecture');


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

    const addressProps = {
        register,
        errors,
        style: "space-y-4"
    }
    const router = useRouter();


    const onSubmit = async (data: NewAccountValues) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/newAccountRegister`, {
                method: 'POST',
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!result.ok || !result.success) {
                handleError(result)
            }

            if (result.success) {
                const result = await signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                });
                if (result.ok) {
                    toast.success('ログインに成功しました');
                    router.push(`${process.env.NEXT_PUBLIC_API_URL}`)
                    return;
                } else {
                    toast.error('自動ログインに失敗しました。ログインページからログインしてください。');
                    router.push(`${process.env.NEXT_PUBLIC_API_URL}/page/user/login`);
                }
            }
            throw new Error('予期しないエラーが発生しました')
        }
        catch (error) {
            throw error instanceof Error ? error : new Error('予期しないエラーが発生しました')
        }
    }
    return (
        <div className="min-h-screen md:pl-[50vw] relative bg-[#07080b] text-white">
            {/* LEFT fixed panel */}
            <AccountSection />
            {/* RIGHT scroll area */}
            <div className="relative grid place-items-center px-6 py-14 sm:px-10">
                {/* right subtle background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(255,220,170,0.10),rgba(0,0,0,0.0)_55%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65),rgba(0,0,0,0.92))]" />
                </div>

                <div className="relative w-full max-w-xl">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                        <div className="p-7 sm:p-8">
                            <p className="text-[11px] tracking-[0.45em] text-white/55">CREATE ACCOUNT</p>
                            <h1 className="mt-4 text-3xl font-extralight tracking-wide">新規登録</h1>
                            <p className="mt-3 text-sm text-white/55">
                                必要事項を入力してください。後から変更できる項目もあります。
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-10">
                                {/* アカウント情報 */}
                                <section className="space-y-5">
                                    <div className="flex items-end justify-between">
                                        <h2 className="text-sm tracking-[0.35em] text-white/70">ACCOUNT</h2>
                                        <span className="text-xs text-white/40">アカウント情報</span>
                                    </div>

                                    <div className="grid gap-5">
                                        <div>
                                            <label htmlFor="fullName" className="mb-2 inline-flex items-center gap-2 text-sm text-white/70">
                                                <User className="h-4 w-4" aria-hidden="true" /> 氏名
                                            </label>
                                            <TextForm props={nameProps} />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="mb-2 inline-flex items-center gap-2 text-sm text-white/70">
                                                <Mail className="h-4 w-4" aria-hidden="true" /> メールアドレス
                                            </label>
                                            <TextForm props={emailProps} />
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="password" className="mb-2 inline-flex items-center gap-2 text-sm text-white/70">
                                                    <Lock className="h-4 w-4" aria-hidden="true" /> パスワード
                                                </label>
                                                <PasswordForm props={passwordProps} />
                                            </div>

                                            <div>
                                                <label htmlFor="confirmPwd" className="mb-2 inline-flex items-center gap-2 text-sm text-white/70">
                                                    <Lock className="h-4 w-4" aria-hidden="true" /> 確認用
                                                </label>
                                                <PasswordForm props={confirmPassWordProps} />
                                            </div>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="phone" className="mb-2 inline-flex items-center gap-2 text-sm text-white/70">
                                                    <Phone className="h-4 w-4" aria-hidden="true" /> 電話番号 <span className="text-white/40">（任意）</span>
                                                </label>
                                                <TextForm props={phoneProps} />
                                            </div>

                                            <div>
                                                <label htmlFor="birthday" className="mb-2 inline-flex items-center gap-2 text-sm text-white/70">
                                                    <Calendar className="h-4 w-4" aria-hidden="true" /> 生年月日 <span className="text-white/40">（任意）</span>
                                                </label>
                                                <DateForm props={birthdayProps} />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <div className="h-px w-full bg-white/10" />

                                {/* お届け先情報 */}
                                <section className="space-y-5">
                                    <div className="flex items-end justify-between">
                                        <h2 className="text-sm tracking-[0.35em] text-white/70">ADDRESS</h2>
                                        <span className="text-xs text-white/40">お届け先情報</span>
                                    </div>

                                    <AddressContainer props={addressProps} />
                                </section>

                                {/* submit */}
                                <button
                                    type="submit"
                                    className="
                group w-full rounded-xl border border-white/12
                bg-white/[0.06] py-4
                text-sm tracking-[0.18em] uppercase text-white/90
                transition
                hover:bg-white/[0.10] hover:border-white/20
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/10
                disabled:opacity-50 disabled:cursor-not-allowed
              "
                                >
                                    登録する
                                </button>

                                <p className="text-center text-sm text-white/55">
                                    すでにアカウントをお持ちの方は{" "}
                                    <a href="/account/login" className="text-amber-200/90 hover:text-amber-200 hover:underline">
                                        ログイン
                                    </a>
                                </p>
                            </form>
                        </div>

                        <div className="h-px w-full bg-white/10" />
                        <div className="px-7 sm:px-8 py-5 text-xs text-white/45">
                            入力内容は安全に送信されます。パスワードは暗号化して管理します。
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}