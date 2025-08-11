'use client';
import enjoy1 from '../../assets/enjoy/enjoy1.png';
import enjoy2 from '../../assets/enjoy/enjoy2.png';
import enjoy3 from '../../assets/enjoy/enjoy3.png';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';


type Props = {
    titleCss: string;
}

type EnjoyIdea = {
    src: StaticImageData,
    title: string,
    text: string,
}

const enjoyIdeas: EnjoyIdea[] = [
    {
        src: enjoy1,
        title: '自分へのご褒美に',
        text: '忙しない日々のなかで、ふと立ち止まりたくなる瞬間があります。  そんなとき、頑張っている自分をそっと肯定してくれる甘さを。 自分をいたわる時間を、少しだけ特別に演出してみませんか。'
    },
    {
        src: enjoy2,
        title: 'お酒と一緒に',
        text: '一日の終わりにグラスを傾ける、そのひととき。  芳醇な香りとともに、心までほどけていくような甘さを添えて。  大人だけが知っている、静かな贅沢がここにあります。',
    },
    {
        src: enjoy3,
        title: 'プレゼント',
        text: '贈り物は、想いをかたちにする魔法。  そのひと口が語るのは、あなたのやさしさと美意識。味はもちろん、見た目の一つひとつにも心を込めてお届けします。'
    },
]


export default function EnjoyScenes({ titleCss }: Props) {
    return (
        <div>
            <p className={titleCss}>楽しみ方</p>
            <div className='flex grid grid-cols-3 grid-rows-1 gap-4 w-[80%] mx-auto'>
                {enjoyIdeas.map((enjoyIdea, index) => (
                    <div className='w-[90%] rounded-lg border-2 border-gray-300 shadow-md p-5'>
                        <Image
                            src={enjoyIdea.src}
                            alt={`image ${index + 1}`}
                            className="w-full h-auto aspect-[4/5] object-cover"
                        />
                        <p className='text-[clamp(1rem,2vw,2rem)] mt-3 mb-5'>{enjoyIdea.title}</p>
                        <p>{enjoyIdea.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
