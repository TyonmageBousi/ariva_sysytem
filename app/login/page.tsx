"use client"

import React, { useCallback, useMemo, useState } from "react";
import { Mail, LockKeyhole, Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

export default function Login() {

    //メールアドレスバリデーション
    const [email, setEmail] = useState<string>("");

        const emailError = (() => {
            if (!email) return "メールアドレスを入力してください";
            const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            return ok ? null : "メールアドレスの形式が正しくありません";
        })();

    //パスワードバリデーション
    const [password, setPassword] = useState<string>("");
    const [showPwd, setShowPwd] = useState(false);

    const passwordError = (() => {
        if (!password) return "パスワードを入力してください";
        if (password.length < 8) return "8文字以上で入力してください";
        return null;
    })();
    const formValid = !emailError && !passwordError;

    const [remember, setRemember] = useState<boolean>(false);

    const [submitting, setSubmitting] = useState<boolean>(false);


    const handleSubmit = (() => { });
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

            <div className="hidden md:flex items-center justify-center p-12 bg-gradient-to-br from-black via-[#050505] to-[#0a255f]">
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-brown-900 dark:text-white">
                        Velour Cacao
                        <span className="block text-amber-400 mt-2">Treat Yourself </span>

                    </h1>
                    <p className="mt-4 text-brown-700/80 dark:text-neutral-300 max-w-md mx-auto">
                        ログインして、あなたのとっておきのチョコをお届け。<br />会員限定の先行セールや、バレンタインのギフト予約も。
                    </p>
                </div>
            </div>
            <div className="grid place-items-center p-6 sm:p-10 bg-black/80 backdrop-blur-xl border-black/5">
                <div className="w-full max-w-md h-[75vh] border bg-black grid p-6 font-bold rounded-2xl">
                    <div className="mt-5">
                        <h1 className="text-3xl">ログイン</h1>
                        <p className="mt-2">メールアドレスとパスワードを入力してください</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="inline-flex items-center gap-1.5">
                                <Mail className="w-4 h-4" aria-hidden="true" />
                                メールアドレス
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                inputMode="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-[90%] rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                placeholder="you@example.com"
                            />

                            {email && emailError ? <p className="mt-1 text-xs text-red-600">{emailError}</p> : null}
                        </div>
                        <div className="mt-1 relative">
                            <label className="inline-flex items-center gap-1.5">
                                <LockKeyhole className="w-4 h-4" aria-hidden="true" />
                                パスワード
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPwd ? "text" : "password"}
                                autoComplete="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-[90%] rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                placeholder="••••••••"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPwd((v) => !v)}
                                className="absolute right-15 top-[70%] -translate-y-1/2 p-2 rounded-lg text-brown-700/70 hover:bg-black/5 dark:text-neutral-400 dark:hover:bg-white/5"
                                aria-label={showPwd ? "パスワードを隠す" : "パスワードを表示"}
                            >
                                {showPwd ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border border-black/20 dark:border-white/20 accent-amber-600 mt-10"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                次回から自動的にログイン
                            </label>
                            <a href="/account/reset" className="block text-sm font-medium text-amber-700 hover:underline dark:text-amber-400">
                                パスワードをお忘れですか？
                            </a>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={!formValid || submitting}
                                className="
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
                            hover:disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        ログインしています…
                                    </>
                                ) : (
                                    <>
                                        ログイン
                                        <ArrowRight
                                            className="size-4 transition-transform group-hover:translate-x-0.5" />
                                    </>
                                )
                                }
                            </button>
                        </div>
                    </form>
                    <div>
                        <p className="mt-6 text-center text-sm text-brown-700/80 dark:text-neutral-300">
                            アカウントをお持ちでないですか？
                            <a href="/account/register" className="ml-1 font-semibold text-amber-700 hover:underline dark:text-amber-400">
                                新規登録
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}