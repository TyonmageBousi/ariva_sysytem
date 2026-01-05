import OurProductThoughts from '@/app/components/user/OurProductThoughts'
import { getPublicImages } from '@/lib/getPublicFiles';

export type OurThought = {
  title: string;
  text: string;
  src: string;
  alt: string;
};

export default async function OurProductContainer({ titleCss }: { titleCss: string }) {

  const images = getPublicImages("explain");

  const ourThoughts = [
    {
      title: "日々のちょっとした贅沢に",
      text: "日々の喧騒の中で、お菓子を食べる安らぎの時間。\nその時間を至福のひと時にしたい思いでチョコレートを作ってます。",
    },
    {
      title: "パティシエ",
      text: "ベルギーで学んだ技術、知識をベースに日本にある美学という考え方の元、\nお客様にもう一つ食べたいと思って頂けるお菓子屋を目指しています。",
    },
    {
      title: "製造法",
      text: "手間を惜しまず、あたり前のことを大切に。\n一つひとつの手仕事と実直に向き合うお菓子作りをしています。",
    },
  ];

  const isImages: OurThought[] = images.map((image, index) => (
    {
      ...image,
      title: ourThoughts[index].title,
      text: ourThoughts[index].text,
    }
  ))
  return <OurProductThoughts titleCss={titleCss} data={isImages} />
}