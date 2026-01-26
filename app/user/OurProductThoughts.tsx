'use client';

import { useEffect, useState, useRef } from 'react';
import { Images } from '@/lib/getPublicFiles';
import { Truck, Sparkles, Gift } from "lucide-react";
import ProductDetails, { ProductDetailsData } from '@/app/components/user/product/ProductDetails'

type props = {
  data: Images,
  productList: ProductDetailsData[]
}

export default function OurProductThoughts({ data, productList }: props) {
  const [bgOpacity, setBgOpacity] = useState(0);
  const [blur, setBlur] = useState(0);
  const [start, setStart] = useState(1);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);


  const texts: string[] = [
    "Concept\n コンセプト",
    "舌で触れる、という贅沢。",
    "チョコレートは、噛まなくてもいい。\nそう思えるようになったのは、\nこの味に出会ってからだった。",
    "割れる音を待ち、\n香りが立ち上がるまで一拍置く。\n舌に乗せると、\n体温に負けるように、ゆっくり形を失っていく。",
    "そのあいだ、感じているのは\n甘さよりも、質感。\n 味よりも、温度。",
    "カカオの輪郭の中に、\n季節の素材が静かに溶け込み、\n主張しないまま、確かな存在感だけを残す。",
    "派手な幸福はない。\nけれど、なぜか忘れない。",
    "食べ終えたあと、\n「美味しかった」と言う前に、\n もう一度思い出している自分に気づく。",
    "それは、\n 舌で味わったというより、\n 舌で触れてしまった記憶。",
    "このチョコレートは、\nそんな私的な体験のためにある。"
  ]

  const FEATURES = [
    {
      label: "SERVICE",
      title: "送料無料",
      desc: "5,000円以上のご注文で",
      Icon: Truck,
    },
    {
      label: "QUALITY",
      title: "高品質",
      desc: "厳選された素材のみ使用",
      Icon: Sparkles,
    },
    {
      label: "GIFT",
      title: "ギフト対応",
      desc: "無料ラッピングサービス",
      Icon: Gift,
    },
  ] as const;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const twoScrolls = windowHeight * 5;
      const oneAndHalfScreens = windowHeight * 2;

      const blurAmount = Math.max(0, Math.min((scrollTop - oneAndHalfScreens) / 50, 15));
      setBlur(blurAmount);

      if (scrollTop > windowHeight) {
        const fadeProgress = Math.max(
          1 - (scrollTop - windowHeight) / windowHeight,
          0
        );
        setStart(fadeProgress);
      } else {
        setStart(1);
      }

      if (scrollTop > twoScrolls) {
        const fadeProgress = Math.min(
          (scrollTop - twoScrolls) / windowHeight,
          1
        );
        setBgOpacity(fadeProgress);
      } else {
        setBgOpacity(0);
      }

      // テキストの表示タイミングを自然に
      textRefs.current.forEach((textRef) => {
        if (textRef) {
          const rect = textRef.getBoundingClientRect();
          // 画面の中央やや下に来たら表示（より自然なタイミング）
          if (rect.top < window.innerHeight * 0.75) {
            textRef.classList.add('opacity-100', 'translate-y-0');
            textRef.classList.remove('opacity-0', 'translate-y-12');
          }
        }
      });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    <div className='relative  min-h-[600vh]'>

      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-[#1a1d22] via-[#0f1116] to-[#05070c] z-30"
        style={{ opacity: start }}
      />
      <div className="fixed top-30 left-0 w-full h-screen z-20"
        style={{
          filter: `blur(${blur}px)`,
          opacity: 1
        }}
      >
        <img className='relative w-full h-full object-cover z-20 hover:translate-y-10 transform duration-300' src={data.src} alt={data.alt} />
      </div>

      <div className="relative pt-[60vh] z-30">
        <div className="text-white text-2xl text-center my-[100vh] space-y-20 leading-loose">
          {texts.map((text, textIndex) => (
            <p key={textIndex} ref={(el) => { textRefs.current[textIndex] = el }} className='opacity-0 translate-y-12 transition-all duration-1000 ease-out'>
              {text.split('\n').map((line, lineIndex) => (
                <span key={lineIndex} className={`${textIndex === 0 && lineIndex === 0 ? 'text-5xl font-bold' : ''}`}>
                  {line}
                  {lineIndex < text.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div
        className="sticky top-0 left-0 w-full h-[100vh] bg-stone-100 z-40"
        style={{ opacity: bgOpacity }}>
        <div className="min-h-screen flex justify-center items-center p-8">
          <div className="flex gap-12 max-w-7xl">
            {[
              {
                label: "PHILOSOPHY",
                title: "プレミアムチョコレート",
                description: "ゴディバが「プレミアムチョコレート」と呼ばれる理由"
              },
              {
                label: "INGREDIENTS",
                title: "こだわりの素材",
                description: "世界中から厳選された最高級のカカオ豆"
              },
              {
                label: "CRAFTSMANSHIP",
                title: "職人の技術",
                description: "ベルギーの伝統を受け継ぐショコラティエたち"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="w-80 h-96 bg-white border border-stone-200 p-8 flex flex-col justify-between hover:border-amber-800/30 transition-all duration-500 hover:shadow-xl hover:shadow-stone-300/50"
              >
                <div>
                  <h3 className="text-xs font-light tracking-widest text-amber-800 mb-6 uppercase">{item.label}</h3>
                  <h2 className="text-2xl font-light text-stone-800 mb-8 tracking-wide">{item.title}</h2>
                  <p className="text-stone-600 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
                <button className="mt-6 text-amber-800 font-light text-xs tracking-wider hover:text-amber-900 transition-colors duration-300 text-left uppercase flex items-center gap-2 group">
                  <span>詳しく見る</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ GIFT EXPERIENCE / 開封の儀 */}
<section className="relative w-full bg-stone-100 py-28 z-50">
  <div className="mx-auto max-w-7xl px-8">
    {/* Header */}
    <div className="mb-14">
      <p className="text-xs font-light tracking-[0.35em] text-stone-500 uppercase">
        GIFT EXPERIENCE
      </p>

      <h2 className="mt-4 text-4xl font-extralight tracking-wide text-stone-900">
        開けた瞬間、静かに息をのむ。
      </h2>

      <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-stone-600">
        贈り物は、味より先に“体験”が届く。
        箱の重み、紙の手触り、ふたが浮くわずかな音。
        そして整列した一粒の美しさが、言葉の代わりになる。
      </p>
    </div>

    {/* Main Layout */}
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      {/* Image area */}
      <div className="relative overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-sm">
        {/* faux photo space (replace later) */}
        <div className="relative h-[420px] w-full">
          {/* soft vignette / premium glow */}
          <div className="absolute inset-0 bg-[radial-gradient(1000px_circle_at_35%_25%,rgba(255,220,170,0.18),rgba(255,255,255,0.0)_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_55%_60%,rgba(0,0,0,0.10),rgba(0,0,0,0.00)_60%)] opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.00),rgba(0,0,0,0.06))]" />

          {/* placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs font-light tracking-[0.35em] text-stone-500 uppercase">
                IMAGE PLACEHOLDER
              </p>
              <p className="mt-3 text-sm font-light text-stone-600">
                開封シーンの写真（箱が半開き＋整列）
              </p>
              <div className="mx-auto mt-6 h-[1px] w-40 bg-stone-200" />
              <p className="mt-4 text-xs font-light text-stone-500">
                ※後で画像差し替えOK
              </p>
            </div>
          </div>

          {/* caption chip */}
          <div className="absolute bottom-6 left-6 rounded-full border border-white/60 bg-white/70 px-4 py-2 backdrop-blur-md">
            <p className="text-[11px] font-light tracking-widest text-stone-700 uppercase">
              UNBOXING MOMENT
            </p>
          </div>
        </div>
      </div>

      {/* Text / steps */}
      <div className="flex flex-col justify-between">
        <div className="rounded-[32px] border border-stone-200 bg-white p-10 shadow-sm">
          <p className="text-xs font-light tracking-[0.35em] text-amber-800 uppercase">
            THE RITUAL
          </p>

          <h3 className="mt-4 text-2xl font-extralight tracking-wide text-stone-900">
            “贈る”を、美しく設計する。
          </h3>

          <p className="mt-6 text-sm font-light leading-relaxed text-stone-600">
            見せるための箱ではなく、
            <span className="text-stone-800"> “記憶に残すための箱” </span>
            として構成しました。
            余計な装飾は削ぎ、質感と間（ま）だけを残す。
            そこに生まれる沈黙が、上質さになる。
          </p>

          {/* Mini steps */}
          <div className="mt-10 space-y-6">
            {[
              {
                no: "01",
                title: "ふたが浮く、0.5秒",
                desc: "わずかな抵抗と音。高揚が立ち上がる瞬間。"
              },
              {
                no: "02",
                title: "整列が、美しさになる",
                desc: "形の統一と余白が、視覚の“格”を決める。"
              },
              {
                no: "03",
                title: "香りが、先に届く",
                desc: "口に運ぶ前から、体験は始まっている。"
              }
            ].map((s, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-stone-50">
                  <span className="text-[11px] font-light tracking-widest text-stone-700">
                    {s.no}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-light tracking-wide text-stone-900">
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm font-light leading-relaxed text-stone-600">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <button className="group inline-flex items-center gap-2 rounded-full border border-amber-800/30 bg-white px-6 py-3 text-xs font-light tracking-widest text-amber-800 uppercase transition-all duration-300 hover:border-amber-800/50 hover:shadow-lg hover:shadow-stone-200/60">
              <span>ギフトボックスを見る</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button className="group inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-6 py-3 text-xs font-light tracking-widest text-stone-700 uppercase transition-all duration-300 hover:bg-stone-100">
              <span>包材のこだわり</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>

        {/* bottom subtle note */}
        <p className="mt-6 text-xs font-light leading-relaxed text-stone-500">
          ※ このセクションは「工程（PROCESS）」より先に置くことで、
          “欲しくなる理由”を感情で作り、その後に信頼で固める導線になります。
        </p>
      </div>
    </div>
  </div>
</section>

      
      
    </div>
  );
}

