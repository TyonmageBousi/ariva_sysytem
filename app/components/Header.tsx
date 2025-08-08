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
    const [openMenu, setIsOpenMenu] = useState<boolean>(false);
    return (
        <div className="App">
            <div className="container mx-auto px-3">
                <header className="flex justify-between items-center py-4 relative">
                    <h1 className="text-2xl font-bold text-white">ロゴ</h1>
                    <div className='flex items-center'>
                        <User size={24} className="text-white mx-3 hover:text-gray-300 cursor-pointer transition-colors" />
                        <ShoppingCart size={32} className="text-white mx-3 hover:text-gray-300 cursor-pointer transition-colors" />
                        <button
                            onClick={() => setIsOpenMenu((prev: boolean) => !prev)}
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
                                            <a href={item.label}
                                                className="inline-block text-custom-blue cursor-pointer relative
                                                after:absolute  
                                                after:left-0
                                                after:bottom-[1px]
                                                after:content-[''] 
                                                after:w-full
                                                after:h-[2px]
                                                after:bg-custom-blue 
                                                after:transition-all
                                                after:duration-500 
                                                after:ease-out
                                                after:opacity-0
                                                after:transform
                                                after:origin-bottom
                                                after:scale-y-0
                                                after:translate-y-1
                                                hover:after:opacity-100
                                                hover:after:scale-y-100
                                                hover:after:translate-y-0
                                                ">
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
            </div >
        </div >
    );
}
