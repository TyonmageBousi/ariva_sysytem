import { ProductsInfo } from "@/app/api/mock/line_up/route"
import React from "react"
import ProductLineUp from "../user/ProductLineUp"
import { notFound } from "next/navigation";

export default async function TopMainContainer({ titleCss }: { titleCss: string }) {

    const res = await fetch("http://localhost:3000/api/mock/line_up")

    if (res.status === 404) notFound();

    if (!res.ok) throw new Error(`/api/mock/line_up fetch failed: ${res.status} ${res.statusText}`);

    const data: ProductsInfo[] = await res.json()

    return <ProductLineUp titleCss={titleCss} data={data} />
}