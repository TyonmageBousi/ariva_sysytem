import React, { useState } from 'react'


export default function () {

    const [email, setEmail] = useState<string>("")
    const emailError = (() => {
        if (!email) return "メールアドレスを入力してください";
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        return ok ? null : "メールアドレスの形式が正しくありません";
    })();

    return (
        <div>

            <div>
                <label>
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


        </div>
    )
}
