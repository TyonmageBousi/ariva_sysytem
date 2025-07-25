'use client';

type Menu = {
    label: string
};
const menu: Menu[] = [
    { label: "ホーム" },
    { label: "Access" },
    { label: "Shop" },
    { label: "お問い合わせ" },
];

export default function Footer() {
    return (
        <footer>
            <ul className="flex justify-center gap-20 ">
                {menu.map((item, index) => (<li key={index}>{item.label}</li>))}
            </ul>
        </footer>
    )
}
