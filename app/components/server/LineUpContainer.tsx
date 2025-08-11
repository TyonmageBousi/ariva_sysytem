import { ProductsInfo } from "@/app/api/mock/line_up/route"
import React from "react"
import ProductLineUp from "../user/ProductLineUp"



export default async function TopMainContainer({ titleCss }: { titleCss: string }) {
    // モックからデータフェッチ
    const res = await fetch("http://localhost:3000/api/mock/line_up")
    //ここ直す
    const data: ProductsInfo[] = await res.json()

    return <ProductLineUp titleCss={titleCss} data={data} />
}