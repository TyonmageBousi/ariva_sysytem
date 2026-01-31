'use client'

import { Mail, LockKeyhole, Eye, EyeOff, Loader2, ArrowRight, ShoppingBag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import TextForm, { FieldTextProps } from '@/app/components/public/form/TextForm'
import PasswordForm, { FieldPasswordProps } from '@/app/components/public/form/PassWordForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { LoginSchema, LoginValues } from '@/app/schemas/login'
import { signIn } from 'next-auth/react';
import Link from "next/link"
import AccountSection from '@/components/layouts/AccountSection'

export default function LoginPage() {

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

            if (result.ok) {
                toast.success('ログインに成功しました');
                const shoppingFlg = sessionStorage.getItem('shopping');
                router.push(shoppingFlg === '1' ? '/cart' : '/home')
                return;
            }

            if (result.status >= 400 && result.status < 500) {
                toast.error('メールアドレスまたはパスワードが正しくありません');
                return;
            } else if (result.status >= 500) {
                toast.error('サーバエラーが発生しました。');
                return;
            } else {
                toast.error('ログインに失敗しました。')
            }



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
            <Toaster position="top-right" />

            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#07080b] text-white">
                {/* LEFT / Brand panel */}
                <AccountSection />
                {/* RIGHT / Form panel */}
                <div className="relative grid place-items-center px-6 py-14 md:px-10">
                    {/* right background layers */}
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(255,220,170,0.10),rgba(0,0,0,0.0)_55%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.65),rgba(0,0,0,0.92))]" />
                    </div>

                    <div className="relative w-full max-w-md">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
                            <div className="p-7 sm:p-8">
                                <div>
                                    <p className="text-[11px] tracking-[0.45em] text-white/55">SIGN IN</p>
                                    <h1 className="mt-4 text-3xl font-extralight tracking-wide">ログイン</h1>
                                    <p className="mt-3 text-sm text-white/55">
                                        メールアドレスとパスワードを入力してください
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
                                    <div>
                                        <label className="mb-2 inline-flex items-center gap-2 text-sm text-white/70">
                                            <Mail className="h-4 w-4" aria-hidden="true" />
                                            メールアドレス
                                        </label>
                                        <TextForm props={emailProps} />
                                    </div>

                                    <div>
                                        <label className="mb-2 inline-flex items-center gap-2 text-sm text-white/70">
                                            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                                            パスワード
                                        </label>
                                        <PasswordForm props={passwordProps} />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <a
                                            href="/account/reset"
                                            className="text-xs tracking-wide text-white/55 hover:text-white/80 hover:underline"
                                        >
                                            パスワードをお忘れですか？
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="
                    group relative w-full
                    rounded-xl border border-white/12
                    bg-white/[0.06] py-3.5
                    text-sm tracking-[0.18em] uppercase text-white/90
                    transition
                    hover:bg-white/[0.10] hover:border-white/20
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                                    >
                                        <span className="inline-flex items-center justify-center gap-2">
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    processing
                                                </>
                                            ) : (
                                                <>
                                                    ログイン
                                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                                </>
                                            )}
                                        </span>
                                    </button>

                                    <div className="pt-4">
                                        <p className="text-center text-sm text-white/55">
                                            アカウントをお持ちでないですか？
                                        </p>
                                        <div className="mt-2 text-center">
                                            <Link href={'user/new-account'}>
                                                <span className="text-sm tracking-wide text-amber-200/90 hover:text-amber-200 hover:underline">
                                                    新規登録
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* bottom divider */}
                            <div className="h-px w-full bg-white/10" />

                            {/* subtle footer */}
                            <div className="px-7 sm:px-8 py-5 text-xs text-white/45">
                                静けさを崩さない体験のために、セキュアなログインを提供します。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}