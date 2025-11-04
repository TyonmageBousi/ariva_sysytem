import React, { MouseEventHandler } from 'react'

type Props = {
    open: boolean;
    onClick: MouseEventHandler;
    controls: string;
    label: string
}

export default function ToggleButton({ open, controls, label, onClick }: Props) {
    return (
        <li>
            { /* PCの場合のみ表示する要素 */}
            <NavLink
                to='/'
                className='
                hidden lg:flex items-center h-full px-2 transition duration-150 ease-in-out
                text-gray-800
                hover:text-gray-400
                focus:text-gray-400
              '
            >
                <img src='/img/header/icon.jpg' className='h-10' alt='ロゴマーク' />
            </NavLink>

            { /* タブレット・スマホの場合のみ表示する要素（1リスト目にヘッダ情報を並べる） */}
            <div className='lg:hidden flex items-center h-14 w-full justify-between'>
                { /* ハンバーガーボタン */}
                <div className='flex px-3'>
                    {!open &&
                        <svg onClick={onClickOpen} xmlns='http://www.w3.org/2000/svg' className='w-5' aria-hidden='true' focusable='false' data-prefix='fas' role='img' viewBox='0 0 448 512'>
                            <path fill='currentColor' d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'
                            ></path>
                        </svg>
                    }
                    {open &&
                        <svg onClick={onClickClose} xmlns='http://www.w3.org/2000/svg' className='w-5' viewBox='0 0 20 20' fill='currentColor'>
                            <path fillRule='evenodd' d='M10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414L10 8.586z' clipRule='evenodd' />
                        </svg>
                    }
                </div>

                { /* ロゴ */}
                <div className='flex px-3 py-2'>
                    <NavLink to='/'><img src='/img/header/icon.jpg' className='h-10' alt='ロゴマーク' /></NavLink>
                </div>

                { /* ログアウトボタン */}
                <div className='flex mr-2 w-12'>
                    {props.loginFlag &&
                        <Form method='post' action='/logout'>
                            <button
                                type='submit'
                                data-mdb-ripple='true'
                                data-mdb-ripple-color='light'
                                className='inline-block px-0 py-1 text-center bg-white text-gray-500 font-medium text-xs leading-tight uppercase focus:outline-one focus:ring-0 transition ease-in-out'
                            >
                                <img src='/img/header/icon_logout.png' className='h-10 inline-block' alt='ログアウトの画像' /><br />
                            </button>
                        </Form>
                    }
                </div>
            </div>
        </li>
    )
}
