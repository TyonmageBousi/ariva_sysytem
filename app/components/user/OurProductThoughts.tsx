'use client';

import { useEffect, useMemo } from 'react';

// 型定義
type Images = {
  src: string;
  alt: string;
};

type ProductDetailsData = any; // 実際の型に応じて調整

type Props = {
  data: Images;
  productList: ProductDetailsData[];
};

export default function OurProductThoughts({ data }: Props) {
  // テキスト内容
  const texts = [
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
  ];

  // セクションの最小高さを計算
  const minHeight = useMemo(() => {
    const heightPerText = 20; // 各テキストあたりの高さ
    const baseHeight = 180; //テキストがない最小限の高さ
    const calculated = texts.length * heightPerText + baseHeight; //最終的な要素の高さ

    return Math.min(Math.max(calculated, 360), 900); //最低と最高を決める

  }, [texts.length]);

  // スクロールで表示されるアニメーション
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-on-scroll');

    const fadeInObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 要素が画面に入ったらアニメーション開始
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            fadeInObserver.unobserve(entry.target); // 一度だけ実行
          }
        });
      },
      { threshold: 0.2 } // 要素の20%が見えたら発火
    );

    elements.forEach((el) => fadeInObserver.observe(el));

    return () => fadeInObserver.disconnect();
  }, []);

  return (
    <section className="relative" style={{ minHeight: `${minHeight}vh` }}>
      {/* 背景：暗いグラデーション */}
      <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-[#1a1d22] via-[#0f1116] to-[#05070c] z-30" />

      {/* 背景画像 */}
      <div className="fixed top-0 left-0 w-full h-screen z-30">
        <img
          className="h-full w-full object-cover"
          src={data.src}
          alt={data.alt}
        />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_30%,rgba(255,255,255,0.06),rgba(0,0,0,0.80)_60%,rgba(0,0,0,0.92)_100%)]" />
      </div>

      {/* テキストコンテンツ */}
      <div className="relative z-50 pt-[52vh] pb-[30vh]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mx-auto max-w-[760px]">


            {/* メインテキスト */}
            <div className="space-y-20">
              {texts.map((text, index) => {
                const lines = text.split('\n');
                const isMainTitle = index === 1;

                return (
                  <p
                    key={index}
                    className={`
                      fade-in-on-scroll 
                      opacity-0 
                      translate-y-10 
                      transition-all 
                      duration-1000 
                      ease-out
                      ${isMainTitle
                        ? 'text-[clamp(28px,3.2vw,44px)] font-extralight tracking-wide text-white'
                        : 'text-[clamp(16px,1.35vw,20px)] font-light leading-[2.15] tracking-[0.02em] text-white/72'
                      }
                    `}
                  >
                    {lines.map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                );
              })}
            </div>

            <div className="mt-24">
              <div className="h-px w-full bg-white/10" />
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[35vh] z-50 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
}