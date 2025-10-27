import { NextResponse } from "next/server"


type OurThought = {
  title: string
  text: string
  src1: string
  src2: string
}

const ourThoughts: OurThought[] = [
  {
    title: "日々のちょっとした贅沢に",
    text: "日々の喧騒の中で、お菓子を食べる安らぎの時間。その時間を至福のひと時にしたい思いでチョコレートを作ってます。",
    src1: "/assets/explain/explain1.png",
    src2: "/assets/explain/explain2.png",
  },
  {
    title: "パティシエ",
    text: "ベルギーで学んだ技術、知識をベースに日本にある美学という考え方の元、\nお客様にもう一つ食べたいと思って頂けるお菓子屋を目指しています。",
    src1: "/assets/explain/explain3.png",
    src2: "/assets/explain/explain4.png",
  },
  {
    title: "製造法",
    text: "手間を惜しまず、あたり前のことを大切に。\n一つひとつの手仕事と実直に向き合うお菓子作りをしています。",
    src1: "/assets/explain/explain5.png",
    src2: "/assets/explain/explain6.png",
  },
]

export async function GET() {
  return NextResponse.json(ourThoughts)
}
