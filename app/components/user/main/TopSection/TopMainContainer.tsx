import TopMainSlide from '@/app/components/user/main/TopSection/TopMainSlide'
import { getPublicImages, Images } from '@/lib/getPublicFiles';

export type Data = Images & {
  imgExplain: string;
  style: string;
};


export default function TopMainContainer() {

  //画像取得関数
  const mainImgs = getPublicImages("main-slide");

  const mainImgsAlt: string[] = ['赫チョコ', '蒼チョコ', '翠チョコ', '皚チョコ', '褐チョコ', '黯チョコ'];

  const orderImages = [...mainImgs].sort((a, b) => {
    return mainImgsAlt.indexOf(a.alt) - mainImgsAlt.indexOf(b.alt);
  })

  //メイン画像説明
  const mainImgExplain = [
    "一口遅れて、情熱が舌を刺す。静かだったはずの甘さが、急に叫ぶ。",
    "夜の静けさを閉じ込めた余韻の一口。淡い酔い。",
    "甘さに包まれた、凛とした苦味。深く沈む。",
    "静かに溶ける、無垢な甘さ。抵抗する前に、全部溶かされた。",
    "噛む音と一緒に、香ばしさが漏れる。何かが終わって、まだ離れない",
    "逃げ場を用意しない、濃い黒の余韻。苦みが、名前を持たない。"
  ] as const

  //メイン画像スタイル
  const styles = [
    "bg-gradient-to-br from-[#5E0B16] to-[#0D1320]",
    "bg-gradient-to-br from-[#0B1E30] to-[#0D1320]",
    "bg-gradient-to-br from-[#0B1E30] to-[#0D1320]",
    "bg-gradient-to-br from-[#D6D0C6] to-[#0D1320]",
    "bg-gradient-to-br from-[#3A2418] to-[#0D1320]",
    "bg-gradient-to-br from-[#05080D] to-[#0D1320]",
  ] as const;

  const data: Data[] = orderImages.map((image, index) => (
    {
      ...image,
      imgExplain: mainImgExplain[index],
      style: styles[index]
    }
  ))

  if (mainImgs.length !== 0) {
    return <TopMainSlide data={data} />
  }
}