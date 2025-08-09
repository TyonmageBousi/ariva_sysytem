import React from "react"
import OurProductThoughts from "../OurProductThoughts"
import { StaticImageData } from "next/image"

export type OurThought = {
  title: string
  text: string
  src1: StaticImageData
  src2: StaticImageData
}

// サーバーコンポーネント：データフェッチに専念
// サーバーコンポーネントなので非同期関数コンポーネントが使える
export default async function OurProductContainer({ titleCss }: { titleCss: string }) {
  // モックからデータフェッチ
  const res = await fetch("http://localhost:3000/api/mock/our_thoughts")
  //ここ直す
  const data: OurThought[] = res.json()

  // const filterdData = data.filter((x) => x.title !== "tomic")

  return <OurProductThoughts titleCss={titleCss} data={data} />
}
