'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

type Props = {
    open: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
    controls: string;
    label: string;
    loginFlag?: boolean;
};

export default function ToggleButton({
    open,
    onClick,
    controls,
    label,
    loginFlag = false,
}: Props) {
    return (
        <li>
            {/* PCのみ表示 */}
            <Link
                href="/"
                className="
          hidden lg:flex items-center h-full px-2 transition duration-150 ease-in-out
          text-gray-800 hover:text-gray-400 focus:text-gray-400
        "
            >
                {/* next/image を使う例（/public 配下想定） */}
                <Image src="/img/header/icon.jpg" width={40} height={40} alt="ロゴマーク" className="h-10 w-10 object-contain" />
            </Link>

            {/* タブレット・スマホのみ表示 */}
            <div className="lg:hidden flex items-center h-14 w-full justify-between">
                {/* ハンバーガーボタン */}
                <div className="flex px-3">
                    <button
                        type="button"
                        onClick={onClick}
                        aria-controls={controls}
                        aria-expanded={open}
                        aria-label={label}
                        className="w-8 h-8 grid place-items-center"
                    >
                        {!open ? (
                            // メニュー（≡）
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 0 448 512">
                                <path
                                    fill="currentColor"
                                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                                />
                            </svg>
                        ) : (
                            // クローズ（×）
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* ロゴ */}
                <div className="flex px-3 py-2">
                    <Link href="/">
                        <Image src="/img/header/icon.jpg" width={40} height={40} alt="ロゴマーク" className="h-10 w-10 object-contain" />
                    </Link>
                </div>

                {/* ログアウトボタン（/logout へ POST する Route Handler を用意している想定） */}
                <div className="flex mr-2 w-12">
                    {loginFlag && (
                        <form method="post" action="/logout">
                            <button
                                type="submit"
                                className="inline-block px-0 py-1 text-center bg-white text-gray-500 font-medium text-xs leading-tight uppercase focus:outline-none focus:ring-0 transition ease-in-out"
                            >
                                <Image src="/img/header/icon_logout.png" width={40} height={40} alt="ログアウトの画像" className="inline-block h-10 w-10 object-contain" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </li>
    );
}
