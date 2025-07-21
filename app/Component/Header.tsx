'use client';

 type Menu = {
        label: string
    };
    const menu: Menu[] = [
        { label: "ホーム" },
        { label: "PickUp" },
        { label: "こだわり" },
        { label: "LineUp" },
        { label: "楽しみ方" },
        { label: "News" },
        { label: "Shop" },
        { label: "お問い合わせ" },
    ];

export default function Header() {
    return (
        <header className="flex justify-between	 px-10 py-8">
            <p>ロゴ</p>
            <ul className="flex gap-10">
                {menu.map((item, index) => (<li key={index}>{item.label}</li>))}
            </ul>
        </header>
    )
}
