'use client';

import { useEffect, useState, useRef } from 'react';
import { Images } from '@/lib/getPublicFiles';
type props = {
  data: Images
}

export default function OurProductThoughts({ data }: props) {
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
      textRefs.current.forEach((textRef) => {
        if (textRef) {
          const rect = textRef.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.6) {
            textRef.classList.add('opacity-100', 'translate-y-0');
            textRef.classList.remove('opacity-0', 'translate-y-12');
          }
        }
      });

    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    <div className='relative'>

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

      <div
        className="fixed top-0 left-0 w-full h-screen bg-white z-40"
        style={{ opacity: bgOpacity }}
      />

      <div className="relative min-h-[1000vh] pt-[60vh] z-30">
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
    </div>
  );
}