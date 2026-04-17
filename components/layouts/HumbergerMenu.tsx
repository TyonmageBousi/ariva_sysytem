import { useState } from "react"

export type Menu = {
    label: string;
    href: string;
};

export type Props = {
    menu: Menu[]
    css: string
}

export default function HumbergerMenu({ menu, css }: Props) {

    const [isOpen, setIsOpen] = useState(false)
    const layout = "block w-full h-[2px] bg-white transition-all duration-all duration-300 z-[20]"

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex flex-col gap-[6px] w-[44px] ${css}`}
            >
                <span className=
                    {`${layout}
                ${isOpen ? "-rotate-45 translate-y-[8px] bg-white" : ""}
                `}
                />
                <span className=
                    {`${layout}
                ${isOpen ? "opacity-0" : "opacity-100"}
                `}
                />
                <span className=
                    {`${layout}
                ${isOpen ? "rotate-45 -translate-y-[8px] bg-white" : ""}
                `}
                />
            </button >
            <nav className={`transition-all duration-300 ease-in-out inset-0 fixed bg-black z-[10]
            ${isOpen ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}>
                <ul className="transition-all duration-500 text-white">
                    {menu.map((content) => (
                        <li>{content.label}<a href={content.href}></a></li>
                    ))}
                </ul>
            </nav>
        </>
    )
}