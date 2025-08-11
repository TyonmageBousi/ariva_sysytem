import React from "react"
import OurProductThoughts from ".././user/OurProductThoughts"

export type OurThought = {
  title: string;
  text: string;
  src1: string;
  src2: string;
};
export default async function OurProductContainer({ titleCss }: { titleCss: string }) {
  // モックからデータフェッチ
  const res = await fetch("http://localhost:3000/api/mock/our_thoughts")
  //ここ直す
  const data: OurThought[] = await res.json()

  return <OurProductThoughts titleCss={titleCss} data={data} />
}