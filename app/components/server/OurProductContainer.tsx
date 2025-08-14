import React from "react"
import OurProductThoughts from ".././user/OurProductThoughts"
import { notFound } from "next/navigation";


export type OurThought = {
  title: string;
  text: string;
  src1: string;
  src2: string;
};
export default async function OurProductContainer({ titleCss }: { titleCss: string }) {

  const res = await fetch("http://localhost:3000/api/mock/our_thoughts")

  if (res.status === 404) notFound();

  if (!res.ok) throw new Error(`/api/mock/our_thoughts fetch failed: ${res.status} ${res.statusText}`);


  const data: OurThought[] = await res.json()

  return <OurProductThoughts titleCss={titleCss} data={data} />
}