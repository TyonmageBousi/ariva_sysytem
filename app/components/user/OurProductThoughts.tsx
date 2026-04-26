'use client';

import { useEffect, useMemo } from 'react';

// 型定義
type Images = {
  src: string;
  alt: string;
};


type Props = {
  data: Images;
};

export default function OurProductThoughts({ data }: Props) {

  // スクロールで表示されるアニメーション
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.background-img');

      if (window.scrollY > window.innerHeight * 1.2) {
        elements.forEach((el) => {
          el.classList.add('opacity-100', 'translate-y-0');
          el.classList.remove('opacity-0', 'translate-y-10');
        });
      } else {
        elements.forEach((el) => {
          el.classList.add('opacity-0', 'translate-y-0');
          el.classList.remove('opacity-100', 'translate-y-10');
        })
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // テキスト表示アニメーション

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-20')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.8 })

    document.querySelectorAll('.anim-target').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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



  return (
    <section className="relative md:h-[300vh]">

      {/* 背景画像 */}
      <div className="background-img fixed top-0 left-0 w-full h-screen z-40 opacity-0 transition-all duration-1000 ease-out">
        <img
          className="h-full w-full object-cover"
          src={data.src}
          alt={data.alt}
        />
        <div className="absolute inset-0 transition-all duration-1000 ease-out bg-[radial-gradient(1200px_circle_at_50%_30%,rgba(255,255,255,0.06),rgba(0,0,0,0.80)_60%,rgba(0,0,0,0.92)_100%)]" />
      </div>

      <div className="relative z-60 pt-[30px] flex flex-col items-center w-[70%] mx-auto">
        {texts.map((text) => {
          return (<p className='anim-target opacity-0 translate-y-20 transition-all duration-1000 ease-out pb-10 md:pb-50 md:text-xl flex jusitfy-center'>{text}</p>)
        })}
      </div>

    </section>
  );
}