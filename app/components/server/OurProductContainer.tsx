import React from 'react'
import OurProductThoughts from '../OurProductThoughts'
import { StaticImageData } from 'next/image';



export type OurThought = {
    title: string,
    text: string,
    src1: StaticImageData,
    src2: StaticImageData,
}

export default async function OurProductContainer({ titleCss }:{titleCss: string}) {

  const res = await fetch("api/mock/our_thoughts")
  const data:OurThought[] = res.json()

  const filterdData = data.filter((x) => x.title !== "tomic")

  return (
    <OurProductThoughts titleCss={titleCss} data={filterdData}/>
  )
}
