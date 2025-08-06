'use client';

import { useState } from 'react';
import { User, ShoppingCart, Share2 } from "lucide-react";

type Menu = {
    label: string
};
const menu: Menu[] = [
    { label: "HOME  ホーム" },
    { label: "Craftsmanship 制作秘話" },
    { label: "LineUp  チョコレートサイトの種類" },
    { label: "EnjoyScene  楽しみ方" },
    { label: "Information  お知らせ" },
    { label: "Shop  お店" },
];



export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const handleMenuOpen = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <div className="App">
            <div className="container mx-auto px-3">
                <header className="flex justify-between items-center py-4 relative">
                    <h1 className="text-2xl font-bold text-white">ロゴ</h1>
                    <div className='flex items-center'>
                        <User size={24} className="text-white mx-3 hover:text-gray-300 cursor-pointer transition-colors" />
                        <ShoppingCart size={32} className="text-white mx-3 hover:text-gray-300 cursor-pointer transition-colors" />
                        <button
                            onClick={handleMenuOpen}
                            type="button"
                            className="z-50 relative w-8 h-8 mx-3"
                            aria-label={openMenu ? "メニューを閉じる" : "メニューを開く"}
                            aria-expanded={openMenu}
                        >
                            <span
                                className={`absolute left-0 top-1/2 w-8 h-0.5  transform transition duration-500 ease-in-out ${openMenu ? "rotate-45 bg-custom-blue" : "-translate-y-2 bg-white"}`}
                            />
                            <span
                                className={`absolute left-0 top-1/2 w-8 h-0.5  transition-opacity duration-500 ease-in-out ${openMenu ? "opacity-0" : "opacity-100 bg-white"}`}
                            />
                            <span
                                className={`absolute left-0 top-1/2 w-8 h-0.5  transform transition duration-500 ease-in-out ${openMenu ? "-rotate-45 bg-custom-blue" : "translate-y-2 bg-white"}`}
                            />
                        </button>
                        <style>{`
                .hover-underline {
                    position: relative;
                    display: inline-block;
                }
                
                .hover-underline::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: currentColor;
                    transition: width 0.3s ease-in-out;
                }
                
                .hover-underline:hover::after {
                    width: 100%;
                }
            `}</style>
                        <nav
                            className={
                                openMenu
                                    ? "text-left fixed bg-slate-50 right-0 top-0 w-full h-screen flex  justify-start pt-8 px-3 ease-linear duration-300 z-30"
                                    : "fixed right-[-100%] ease-linear duration-300 z-30"
                            }
                        >
                            <div className='flex w-[90%] justify-around'>
                                <p>ロゴ</p>
                                <ul className="mt-6">
                                    {menu.map((item, index) => (
                                        <li key={index} className='text-3xl py-3'>
                                            <a href={item.label} className="block text-bg-custom-blue hover-underline text-gray-800 cursor-pointer">
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <Share2 size={24} />
                            </div>
                        </nav>
                    </div>
                </header>

            </div>
        </div>
    );
}
