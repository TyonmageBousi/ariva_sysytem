import React from "react"
import TopMainSlide from "../user/TopMainSlide"
import { SlideImage } from "@/app/api/mock/top_main_slide/route"
import { notFound } from "next/navigation";

export default async function TopMainContainer() {

  const res = await fetch("http://localhost:3000/api/mock/top_main_slide")

  if (res.status === 404) notFound();

  if (!res.ok) throw new Error(`/api/mock/our_thoughts fetch failed: ${res.status} ${res.statusText}`);

  const data: SlideImage[] = await res.json()

  return <TopMainSlide data={data} />
}