'use client';

export default function Footer() {
    type Menu = {
        label: string
    };
    const menu: Menu[] = [
        { label: "ホーム" },
        { label: "Access" },
        { label: "Shop" },
        { label: "お問い合わせ" },
    ];
    return (
        <footer>
            <ul className="flex justify-center gap-20 ">
                {menu.map((item, index) => (<li key={index}>{item.label}</li>))}
            </ul>
        </footer>
    )
}
