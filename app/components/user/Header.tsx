'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { User, ShoppingCart } from 'lucide-react';
import Logo from '@/components/layouts/Logo'
import HumbergerMenu, { Menu } from '@/components/layouts/HumbergerMenu'
import { useState, useEffect } from "react"


export default function Header() {
    const { data: session } = useSession();
    const [winWindth, setWinWidth] = useState(0);

    useEffect(() => {
        const getWinWidth = () => {
            setWinWidth(window.innerWidth)
        };

        window.addEventListener("resize", getWinWidth);

        getWinWidth();

        return () => window.removeEventListener("resize", getWinWidth);
    }, []);

    const menu: Menu[] = [
        { label: 'HOME/ホーム', href: '/' },
        { label: 'GIFT/プレゼント', href: '/gift' },
        { label: 'LINEUP/商品情報', href: '/products' },
        { label: 'PHILOSOPHY/商品ブランド', href: '/philosophy' },
        { label: 'SHOPPING/買い物', href: '/shipping-returns' },
        { label: 'CONTACT/お問い合わせ', href: '/contact' },
    ]


    const buttonLayout = "rounded-full border border-white/10 bg-white/[0.03] px-3 py-3 text-white/80 hover:text-white hover:border-white/20 transition-all"

    return (
        <>
            <div className="mx-auto max-w-8xl px-3">
                <header className="h-[70px] md:h-[100px] flex items-center justify-between">
                    {/* タイトル */}
                    <Link href="/" className="group">
                        <div className='lg:w-[15vw] flex justify-end'>
                            <Logo />
                        </div>
                    </Link>

                    {winWindth > 1024 &&
                        <ul className='flex lg:w-[70vw] justify-center '>
                            {menu.map((content) => (
                                <li className='not-first:pl-5 text-sm'>{content.label}<a href={content.href}></a></li>
                            ))}
                        </ul>
                    }

                    {/* ログインボタン */}
                    <div className="flex items-center gap-2 lg:w-[15vw]">
                        <Link href={session ? '/account' : '/user/login'}>
                            <button
                                type="button"
                                className={buttonLayout}
                                aria-label="アカウント"
                            >
                                <User size={18} />
                            </button>
                        </Link>

                        {/* カートボタン */}
                        <Link href={'user/cart'}>
                            <button
                                type="button"
                                className={buttonLayout}
                                aria-label="カート"
                            >
                                <ShoppingCart size={18} />
                            </button>
                        </Link>
                        {/* ハンバーガーメニュー */}
                        {winWindth <= 1024 &&
                            <HumbergerMenu menu={menu} css={buttonLayout}
                            />
                        }
                    </div>
                </header>
            </div>
        </>
    );
}
