import React from "react"
import TopMainSlide from "../user/TopMainSlide"
import { SlideImage } from "@/app/api/mock/top_main_slide/route"

export default async function TopMainContainer() {
  // モックからデータフェッチ
  const res = await fetch("http://localhost:3000/api/mock/top_main_slide")
  //ここ直す
  const data: SlideImage[] = await res.json()

  return <TopMainSlide  data={data} />
}