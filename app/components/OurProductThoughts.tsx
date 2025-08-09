"use client"

import type { StaticImageData } from "next/image"
import Image from "next/image"
import { OurThought } from "./server/OurProductContainer"

type Props = {
  titleCss: string
  data: OurThought[]
}
const layout: string[][] = [
  [
    "absolute top-0 left-0 z-10 w-[20%] h-[90%] object-cover ",
    "absolute top-[25%] bottom-0 right-0 z-10 w-[35%] h-[45%] object-cover",
  ],
  [
    "absolute top-0 left-0 z-10 w-[20%] h-[40%] object-cover",
    "absolute top-0 bottom-0 right-0 z-10 w-[20%] h-[80%] object-cover",
  ],
  [
    "absolute top-0 left-0 z-10 w-[20%] h-[30%] object-cover",
    "absolute top-0 bottom-0 right-0 z-10 w-[30%] h-[55%] object-cover",
  ],
]

// クライアントコンポーネント：UIの処理に専念
// propsでサーバーコンポーネントからフェッチしたデータを貰う
export default function OurProductThoughts({ titleCss, data: ourThoughts }: Props) {
  return (
    <div>
      <p className={titleCss}>作り手の想い</p>

      {ourThoughts.map((ourThought, index) => (
        <div key={index} className="relative w-[80%] h-[60vh] mx-auto">
          <p className="relative z-20 text-[1.5rem] text-center mx-auto w-fit mb-20 ">{ourThought.title}</p>
          <p className="relative z-20 text-[1rem] text-center mx-auto w-[50%]  ">
            {ourThought.text.split("\n").map((ourThought, i) => (
              <span key={i}>
                {ourThought}
                <br />
              </span>
            ))}
          </p>
          <Image className={layout[index][0]} src={ourThought.src1} alt={`Slide ${index}`} />
          <Image className={layout[index][1]} src={ourThought.src2} alt={`Slide ${index + 1}`} />
        </div>
      ))}
    </div>
  )
}
