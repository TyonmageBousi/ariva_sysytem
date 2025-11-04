'use client';

import { useState } from 'react';
import { User, ShoppingCart, Share2 } from 'lucide-react';

type Menu = {
    label: string
};
const menu: Menu[] = [
    { label: 'HOME  ホーム' },
    { label: 'Craftsmanship 制作秘話' },
    { label: 'LineUp  チョコレートサイトの種類' },
    { label: 'EnjoyScene  楽しみ方' },
    { label: 'Information  お知らせ' },
    { label: 'Shop  お店' },
];

const introductionCss: string = `
  inline-block               // インライン要素として表示
  text-custom-blue           // 文字色指定
  cursor-pointer             // ポインター
  relative                   // 疑似要素の位置基準
  after:absolute             // 疑似要素を絶対配置
  after:left-0               // 位置:左0
  after:bottom-[1px]         // 位置:下に1px
  after:content-['']         // 疑似要素作成
  after:w-full               // 親要素一杯
  after:h-[2px]              // 要素の高さは、2px
  after:bg-custom-blue       // 背景は、カスタム青
  after:transition-all       // 変更アニメーションを適用
  after:duration-500         // 変更時間を500ミリ秒
  after:ease-out             // 挙動は、終わりをゆっくり、始まり早く
  after:opacity-0            // 要素の透明度をマックス
  after:transform            // 変形を有効
  after:origin-bottom        // 変形（transform）の起点を下端に設定
  after:scale-y-0            // 疑似要素の高さを0にする
  after:translate-y-1        // Y方向に1(0.25rem)下にずらす
  hover:after:opacity-100    // ホバー時:要素の透明度をなくす
  hover:after:scale-y-[1]    // ホバー時:疑似要素の高さを元に戻す
  hover:after:translate-y-0  // ホバー時:要素高さを元に戻す
`;


export default function Header() {
    const [openMenu, setIsOpenMenu] = useState<boolean>(false);
    return (
        <div className='App'>
            <div className='container mx-auto px-3'>
                <header className='flex justify-between items-center py-4 relative'>
                    <h1 className='text-2xl font-bold text-white'>ロゴ</h1>
                    <div className='flex items-center'>
                        <User size={24} className='text-white mx-3 hover:text-gray-300 cursor-pointer transition-colors' />
                        <ShoppingCart size={32} className='text-white mx-3 hover:text-gray-300 cursor-pointer transition-colors' />
                        <button
                            onClick={() => setIsOpenMenu((prev: boolean) => !prev)}
                            type='button'
                            className='z-50 relative w-8 h-8 mx-3'
                            aria-label={openMenu ? 'メニューを閉じる' : 'メニューを開く'}
                            aria-expanded={openMenu}
                        >
                            <span
                                className={`absolute left-0 top-1/2 w-8 h-0.5  transform transition duration-500 ease-in-out ${openMenu ? 'rotate-45 bg-custom-blue' : '-translate-y-2 bg-white'}`}
                            />
                            <span
                                className={`absolute left-0 top-1/2 w-8 h-0.5  transition-opacity duration-500 ease-in-out ${openMenu ? 'opacity-0' : 'opacity-100 bg-white'}`}
                            />
                            <span
                                className={`absolute left-0 top-1/2 w-8 h-0.5  transform transition duration-500 ease-in-out ${openMenu ? '-rotate-45 bg-custom-blue' : 'translate-y-2 bg-white'}`}
                            />
                        </button>
                        <nav
                            className={
                                openMenu
                                    ? 'text-left fixed bg-slate-50 right-0 top-0 w-full h-screen flex  justify-start pt-8 px-3 ease-linear duration-300 z-30'
                                    : 'fixed right-[-100%] ease-linear duration-300 z-30'
                            }
                        >
                            <div className='flex w-[90%] justify-around'>
                                <p>ロゴ</p>
                                <ul className='mt-6'>
                                    {menu.map((item, index) => (
                                        <li key={index} className='text-3xl py-3'>
                                            <a href={item.label}
                                                className={ introductionCss}>
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
