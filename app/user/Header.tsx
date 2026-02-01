'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { User, ShoppingCart, Share2 } from 'lucide-react';

type Menu = {
    label: string;
    href: string;
};

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = useSession();

    const menu: Menu[] = useMemo(
        () => [
            { label: 'HOME｜ホーム', href: '/' },
            { label: 'GIFT｜ギフトについて', href: '/gift' },
            { label: 'LINEUP｜商品一覧', href: '/products' },
            { label: 'PHILOSOPHY｜ブランド哲学', href: '/philosophy' },
            { label: 'SHOPPING｜配送・返品', href: '/shipping-returns' },
            { label: 'CONTACT｜お問い合わせ', href: '/contact' },
        ],
        []
    );

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = openMenu ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [openMenu]);

    const linkStyle =
        "inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 " +
        "relative after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-full " +
        "after:bg-white/40 after:opacity-0 after:translate-y-1 after:transition-all after:duration-500 " +
        "hover:after:opacity-100 hover:after:translate-y-0";

    return (
        <>
            <div
                className={[
                    'fixed top-0 left-0 z-[90] w-full',
                    'bg-black/60 backdrop-blur-xl',
                    'border-b border-white/10',
                    scrolled ? 'py-2' : 'py-4',
                ].join(' ')}
            >
                <div className="mx-auto max-w-7xl px-6">
                    <header className="flex items-center justify-between">
                        <Link href="/" className="group">
                            <div className="flex flex-col leading-none">
                                <span className="text-[12px] font-light tracking-[0.45em] text-white/60 uppercase">
                                    ARIVA
                                </span>
                                <span className="mt-1 text-lg font-extralight tracking-wide text-white">
                                    Chocolate
                                </span>
                            </div>
                            <div className="mt-2 h-px w-14 bg-white/10 transition-all duration-500 group-hover:w-20 group-hover:bg-white/20" />
                        </Link>

                        <div className="flex items-center gap-2">
                            <Link href={session ? '/account' : '/user/login'}>
                                <button
                                    type="button"
                                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-3 text-white/80 hover:text-white hover:border-white/20 transition-all"
                                    aria-label="アカウント"
                                >
                                    <User size={18} />
                                </button>
                            </Link>

                            <Link href={'user/cart'}>
                                <button
                                    type="button"
                                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-3 text-white/80 hover:text-white hover:border-white/20 transition-all"
                                    aria-label="カート"
                                >
                                    <ShoppingCart size={18} />
                                </button>
                            </Link>

                            <button
                                onClick={() => setOpenMenu((prev) => !prev)}
                                type="button"
                                className="relative ml-1 h-11 w-11 rounded-full border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all"
                                aria-label={openMenu ? 'メニューを閉じる' : 'メニューを開く'}
                                aria-expanded={openMenu}
                            >
                                <span
                                    className={[
                                        'absolute left-1/2 top-1/2 h-[1px] w-6 -translate-x-1/2 transition-all duration-500',
                                        openMenu ? 'rotate-45 bg-white' : '-translate-y-2 bg-white/80',
                                    ].join(' ')}
                                />
                                <span
                                    className={[
                                        'absolute left-1/2 top-1/2 h-[1px] w-6 -translate-x-1/2 transition-all duration-500',
                                        openMenu ? 'opacity-0 bg-white' : 'opacity-100 bg-white/80',
                                    ].join(' ')}
                                />
                                <span
                                    className={[
                                        'absolute left-1/2 top-1/2 h-[1px] w-6 -translate-x-1/2 transition-all duration-500',
                                        openMenu ? '-rotate-45 bg-white' : 'translate-y-2 bg-white/80',
                                    ].join(' ')}
                                />
                            </button>
                        </div>
                    </header>
                </div>
            </div>

            <div
                className={[
                    'fixed inset-0 z-[80] transition-all duration-500',
                    openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                ].join(' ')}
            >
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
                    onClick={() => setOpenMenu(false)}
                />

                <div className="relative mx-auto max-w-7xl px-6 pt-28 pb-12">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

                        <div className="lg:col-span-5">
                            <p className="text-[11px] font-light tracking-[0.45em] text-white/55 uppercase">
                                MENU
                            </p>
                            <h2 className="mt-4 text-3xl font-extralight tracking-wide text-white">
                                静けさの中に、余韻だけ残す。
                            </h2>
                            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/55">
                                世界観を崩さず、必要な導線だけを置く。
                                それが、上質なサイトのメニュー。
                            </p>

                            <div className="mt-10 h-px w-16 bg-white/10" />

                            <button
                                type="button"
                                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[11px] font-light tracking-[0.35em] text-white/70 uppercase hover:text-white hover:border-white/20 transition-all"
                            >
                                <Share2 size={16} />
                                Share
                            </button>
                        </div>


                        <div className="lg:col-span-6 lg:col-start-7">
                            <ul className="space-y-6">
                                {menu.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpenMenu(false)}
                                            className={linkStyle}
                                        >
                                            <span className="text-2xl font-extralight tracking-wide">
                                                {item.label}
                                            </span>
                                            <span className="text-white/35 transition-transform duration-300 group-hover:translate-x-1">
                                                →
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-12 h-px w-full bg-white/10" />
                            <p className="mt-6 text-xs font-light text-white/35">
                                ※ ESC でも閉じられるようにしたいなら追加できる
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-20" />
        </>
    );
}
