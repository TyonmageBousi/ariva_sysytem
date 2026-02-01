'use client';

import Link from "next/link";

export default function FooterLuxury() {
    const links = [
        { label: "商品一覧", href: "/products" },
        { label: "ギフトについて", href: "/gift" },
        { label: "ブランド哲学", href: "/concept" },
        { label: "配送・返品", href: "/shipping" },
        { label: "お問い合わせ", href: "/contact" },
    ];

    return (
        <footer className="relative w-full bg-black text-white z-50">

            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.0),rgba(0,0,0,1))]" />

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_10%,rgba(255,220,170,0.10),rgba(0,0,0,0)_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_80%,rgba(255,255,255,0.04),rgba(0,0,0,0.0)_60%)] opacity-70" />
            </div>

            <div className="relative mx-auto max-w-7xl px-8 pt-20 pb-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

                    <div className="lg:col-span-5">
                        <p className="text-[11px] font-light tracking-[0.45em] text-white/55 uppercase">
                            ARIVA CHOCOLATE
                        </p>

                        <h3 className="mt-4 text-2xl font-extralight tracking-wide text-white">
                            静けさを、贅沢として設計する。
                        </h3>

                        <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/55">
                            余白、質感、温度。
                            口に運ぶ前から、体験が始まるチョコレート。
                        </p>

                        <div className="mt-8 h-px w-16 bg-white/10" />

                        <div className="mt-6 space-y-2 text-xs font-light text-white/45">
                            <p>東京都 / Online Store</p>
                            <p>Support: 10:00–18:00</p>
                        </div>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-8">
                        <p className="text-[11px] font-light tracking-[0.45em] text-white/55 uppercase">
                            MENU
                        </p>

                        <ul className="mt-5 space-y-3">
                            {links.map((l) => (
                                <li key={l.href}>
                                    <Link
                                        href={l.href}
                                        className="group inline-flex items-center gap-2 text-sm font-light text-white/70 transition-colors hover:text-white"
                                    >
                                        <span>{l.label}</span>
                                        <span className="text-white/35 transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-8 lg:mt-10">
                        <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                            <p className="text-[11px] font-light tracking-[0.45em] text-amber-200/70 uppercase">
                                NEWSLETTER
                            </p>
                            <p className="mt-3 text-sm font-light leading-relaxed text-white/55">
                                新作や限定情報だけ、静かに届く。
                            </p>

                            <div className="mt-5 flex items-center gap-3">
                                <input
                                    type="email"
                                    placeholder="メールアドレス"
                                    className="h-11 w-full rounded-full border border-white/10 bg-black/40 px-4 text-sm font-light text-white/80 outline-none placeholder:text-white/30 focus:border-amber-200/40"
                                />
                                <button
                                    className="h-11 shrink-0 rounded-full border border-amber-200/30 bg-amber-200/10 px-5 text-[11px] font-light tracking-[0.35em] text-amber-100 uppercase transition-all hover:border-amber-200/50 hover:bg-amber-200/15"
                                >
                                    登録
                                </button>
                            </div>

                            <p className="mt-3 text-[11px] font-light text-white/35">
                                ※いつでも解除できます
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-14 h-px w-full bg-white/10" />

                <div className="mt-8 flex flex-col gap-4 text-xs font-light text-white/40 md:flex-row md:items-center md:justify-between">
                    <p>© {new Date().getFullYear()} ARIVA CHOCOLATE. All rights reserved.</p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link href="/privacy" className="hover:text-white/70 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-white/70 transition-colors">
                            Terms
                        </Link>
                        <Link href="/law" className="hover:text-white/70 transition-colors">
                            特定商取引法
                        </Link>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none h-16 w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))]" />
        </footer>
    );
}
