"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, User, Phone, Calendar, Home } from 'lucide-react'

export default function NewAccount() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [showConfirmPwd, setShowConfirmPwd] = useState(false)
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [prefecture, setPrefecture] = useState('')
    const [city, setCity] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')




    const emailError: string | null = (() => {
        if (!email) return 'メールアドレスを入力してください'
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        return ok ? null : 'メールアドレスの形式が正しくありません'
    })();

    const nameError: string | null = (() => {
        if (!name) return '氏名を入力してください'
        if (name.length < 2) return '氏名は2文字以上で入力してください'
        return null
    })();

    const passwordError: string | null = (() => {
        if (!password) return 'パスワードを入力してください'
        if (password.length < 8) return '8文字以上で入力してください'
        const complexity = /^(?=.*[A-Za-z])(?=.*\d).+$/
        return complexity.test(password) ? null : '英字と数字を少なくとも1文字ずつ含めてください'
    })();

    const confirmPwdError: string | null = (() => {
        if (!confirmPwd) return "確認用パスワードを入れてください";
        if (password !== confirmPwd) return "パスワードが一致しません";
        return null;
    })();

    const postalError: string | null = (() => {
        if (!postalCode) return '郵便番号を入力してください'
        const ok = /^\d{3}-?\d{4}$/.test(postalCode)
        return ok ? null : '郵便番号は 123-4567 の形式で入力してください'
    })();
    const prefectureError = (() => (!prefecture ? '都道府県を選択してください' : null))();

    const address1Error = (() => (!address1 ? '丁目・番地を入力してください' : null))();

    const cityError = (() => (!city ? '市区町村を入力してください' : null))();

    const formValid = !emailError && !nameError && !passwordError && !confirmPwdError && !postalError && !prefectureError && !cityError && !address1Error



    const handleSubmit = (() => {
    })
    return (
        <div className="min-h-screen md:pl-[50vw] relative">
            <div className="
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
            ">
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-brown-900">
                        Velour Cacao
                        <span className="block text-amber-400 mt-2">Treat Yourself</span>
                    </h1>
                    <p className="mt-4 text-brown-700/80 max-w-md mx-auto">
                        ログインして、あなたのとっておきのチョコをお届け。<br />
                        会員限定の先行セールや、バレンタインのギフト予約も。
                    </p>
                </div>
            </div>
            <div className="grid place-items-center p-6 sm:p-10 bg-black">
                <div className="w-full max-w-md h-auto border bg-black grid p-6 font-bold rounded-2xl">
                    <div className="mt-5">
                        <h1 className="text-3xl">新規登録</h1>
                    </div>
                    <form onSubmit={handleSubmit} noValidate className="space-y-8">
                        {/* アカウント情報 */}
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold">アカウント情報</h2>

                            {/* 氏名 */}
                            <div>
                                <label htmlFor="fullName" className="inline-flex items-center gap-1.5">
                                    <User className="w-4 h-4" aria-hidden="true" /> 氏名
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    aria-invalid={!!nameError}
                                    aria-describedby={nameError ? 'fullName-error' : undefined}
                                    className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                    placeholder="山田 太郎"
                                />
                                {nameError && (
                                    <p id="fullName-error" className="mt-1 text-xs text-red-600">
                                        {nameError}
                                    </p>
                                )}
                            </div>

                            {/* メール */}
                            <div>
                                <label htmlFor="email" className="inline-flex items-center gap-1.5">
                                    <Mail className="w-4 h-4" aria-hidden="true" /> メールアドレス
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
                                    aria-invalid={!!emailError}
                                    aria-describedby={emailError ? 'email-error' : undefined}
                                    className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                    placeholder="you@example.com"
                                />
                                {emailError && (
                                    <p id="email-error" className="mt-1 text-xs text-red-600">{emailError}</p>
                                )}
                            </div>

                            {/* パスワード */}
                            <div>
                                <label htmlFor="password" className="inline-flex items-center gap-1.5">
                                    <Lock className="w-4 h-4" aria-hidden="true" /> パスワード
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPwd ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        aria-invalid={!!passwordError}
                                        aria-describedby={passwordError ? 'password-error' : undefined}
                                        className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] pr-10 outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPwd((v) => !v)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-brown-700/70 hover:bg-black/5 dark:text-neutral-400 dark:hover:bg-white/5"
                                        aria-label={showPwd ? 'パスワードを隠す' : 'パスワードを表示'}
                                    >
                                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {passwordError && (
                                    <p id="password-error" className="mt-1 text-xs text-red-600">{passwordError}</p>
                                )}
                            </div>

                            {/* パスワード（確認） */}
                            <div>
                                <label htmlFor="confirmPwd" className="inline-flex items-center gap-1.5">
                                    <Lock className="w-4 h-4" aria-hidden="true" /> パスワード（確認）
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="confirmPwd"
                                        name="confirmPwd"
                                        type={showConfirmPwd ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        value={confirmPwd}
                                        onChange={(e) => setConfirmPwd(e.target.value)}
                                        aria-invalid={!!confirmPwdError}
                                        aria-describedby={confirmPwdError ? 'confirmPwd-error' : undefined}
                                        className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] pr-10 outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPwd((v) => !v)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-brown-700/70 hover:bg-black/5 dark:text-neutral-400 dark:hover:bg-white/5"
                                        aria-label={showConfirmPwd ? '確認用パスワードを隠す' : '確認用パスワードを表示'}
                                    >
                                        {showConfirmPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {confirmPwdError && (
                                    <p id="confirmPwd-error" className="mt-1 text-xs text-red-600">{confirmPwdError}</p>
                                )}
                            </div>

                            {/* 電話番号(任意) */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="phone" className="inline-flex items-center gap-1.5">
                                        <Phone className="w-4 h-4" aria-hidden="true" /> 電話番号（任意）
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        inputMode="tel"
                                        autoComplete="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                        placeholder="09012345678"
                                    />
                                </div>
                                {/* 生年月日(任意) */}
                                <div>
                                    <label htmlFor="birthday" className="inline-flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" aria-hidden="true" /> 生年月日（任意）
                                    </label>
                                    <input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        value={birthday}
                                        onChange={(e) => setBirthday(e.target.value)}
                                        className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* お届け先情報 */}
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold">お届け先情報</h2>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="sm:col-span-1">
                                    <label htmlFor="postalCode" className="inline-flex items-center gap-1.5">
                                        <Home className="w-4 h-4" aria-hidden="true" /> 郵便番号
                                    </label>
                                    <input
                                        id="postalCode"
                                        name="postalCode"
                                        inputMode="numeric"
                                        autoComplete="postal-code"
                                        required
                                        value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value.replace(/[^\d-]/g, ''))}
                                        aria-invalid={!!postalError}
                                        aria-describedby={postalError ? 'postal-error' : undefined}
                                        className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                        placeholder="123-4567"
                                    />
                                    {postalError && (
                                        <p id="postal-error" className="mt-1 text-xs text-red-600">{postalError}</p>
                                    )}
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="prefecture" className="inline-flex items-center gap-1.5">
                                        都道府県
                                    </label>
                                    <select
                                        id="prefecture"
                                        name="prefecture"
                                        required
                                        value={prefecture}
                                        onChange={(e) => setPrefecture(e.target.value)}
                                        aria-invalid={!!prefectureError}
                                        aria-describedby={prefectureError ? 'prefecture-error' : undefined}
                                        className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                    >
                                        <option value="">選択してください</option>
                                        <option value="東京都">東京都</option>
                                        <option value="神奈川県">神奈川県</option>
                                        <option value="千葉県">千葉県</option>
                                        <option value="埼玉県">埼玉県</option>
                                        <option value="大阪府">大阪府</option>
                                        <option value="北海道">北海道</option>
                                        <option value="愛知県">愛知県</option>
                                        <option value="福岡県">福岡県</option>
                                        <option value="その他">その他</option>
                                    </select>
                                    {prefectureError && (
                                        <p id="prefecture-error" className="mt-1 text-xs text-red-600">{prefectureError}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="city">市区町村</label>
                                    <input
                                        id="city"
                                        name="city"
                                        autoComplete="address-level2"
                                        required
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        aria-invalid={!!cityError}
                                        aria-describedby={cityError ? 'city-error' : undefined}
                                        className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                        placeholder="渋谷区"
                                    />
                                    {cityError && (
                                        <p id="city-error" className="mt-1 text-xs text-red-600">{cityError}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="address1">丁目・番地</label>
                                    <input
                                        id="address1"
                                        name="address1"
                                        autoComplete="address-line1"
                                        required
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                        aria-invalid={!!address1Error}
                                        aria-describedby={address1Error ? 'address1-error' : undefined}
                                        className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text:[15px] text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                        placeholder="桜丘町1-2-3"
                                    />
                                    {address1Error && (
                                        <p id="address1-error" className="mt-1 text-xs text-red-600">{address1Error}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address2">建物名・部屋番号（任意）</label>
                                <input
                                    id="address2"
                                    name="address2"
                                    autoComplete="address-line2"
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                    className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-neutral-900 px-3 py-2.5 text-[15px] outline-none focus:ring-4 ring-amber-500/20 focus:border-amber-500"
                                    placeholder="チョコレートビル 101"
                                />
                            </div>
                        </section>

                        <button
                            type="submit"
                            disabled={!formValid}
                            className="flex w-full items-center justify-center rounded-xl 
                            bg-amber-400 px-4 py-2.5 text-white 
                            font-medium shadow-lg shadow-amber-400/20 
                            hover:bg-amber-500 focus-visible:outline-none focus-visible:ring-4 
                            focus-visible:ring-amber-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            送信
                        </button>
                        <p className="text-center text-sm text-brown-700/80 dark:text-white/70">
                            すでにアカウントをお持ちの方は{' '}
                            <a href="/account/login" className="font-medium text-amber-700 hover:underline dark:text-amber-400">こちら</a>
                            からログイン
                        </p>
                    </form>
                </div>
            </div >
        </div >
    )
}