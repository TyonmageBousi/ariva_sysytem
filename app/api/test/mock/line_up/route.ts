import { NextResponse } from "next/server"

export type ProductsInfo = {
    src: string;
    tagLabel: boolean;
    name: string;
    price: number;
    description: string;
};

const productsInfo: ProductsInfo[] = [{
    src: "/assets/line-up/image1.png",
    tagLabel: true,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
}, {
    src: "/assets/line-up/image1.png",
    tagLabel: true,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
},
{
    src: "/assets/line-up/image1.png",
    tagLabel: false,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
}, {
    src: "/assets/line-up/image1.png",
    tagLabel: false,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
},
{
    src: "/assets/line-up/image1.png",
    tagLabel: true,
    name: "はじまりのレシピ",
    price: 2000,
    description: "理由もなく、ただ、つくりたかった。まだ白紙のレシピに熱だけが確かにあった。"
}]


export async function GET() {
    return NextResponse.json(productsInfo)
}
