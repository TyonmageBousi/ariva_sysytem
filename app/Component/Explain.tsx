'use client';
import explain1 from '../assets/explain/explain1.png';
import explain2 from '../assets/explain/explain2.png';
import explain3 from '../assets/explain/explain3.png';
import explain4 from '../assets/explain/explain4.png';
import explain5 from '../assets/explain/explain5.png';
import explain6 from '../assets/explain/explain6.png';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';


type Props = {
    title: string;
}

type Concepts = {
    title: string,
    text: string,
    image1: StaticImageData,
    image2: StaticImageData,
}
const concepts: Concepts[] = [
    {
        title: '日々のちょっとした贅沢に',
        text: '日々の喧騒の中で、お菓子を食べる安らぎの時間。その時間を至福のひと時にしたい思いでチョコレートを作ってます。',
        image1: explain1,
        image2: explain2
    },
    {
        title: 'パティシエ',
        text: `ベルギーで学んだ技術、知識をベースに日本にある美学という考え方の元、\nお客様にもう一つ食べたいと思って頂けるお菓子屋を目指しています。`,
        image1: explain3,
        image2: explain4
    },
    {
        title: '製造法',
        text: `手間を惜しまず、あたり前のことを大切に。\n一つひとつの手仕事と実直に向き合うお菓子作りをしています。`,
        image1: explain5,
        image2: explain6
    },
];
const layout: string[][] = [[
    'absolute top-0 left-0 z-10 w-[20%] h-[90%] object-cover ',
    'absolute top-[25%] bottom-0 right-0 z-10 w-[35%] h-[45%] object-cover'
],
[
    'absolute top-0 left-0 z-10 w-[20%] h-[40%] object-cover',
    'absolute top-0 bottom-0 right-0 z-10 w-[20%] h-[80%] object-cover'
],
[
    'absolute top-0 left-0 z-10 w-[20%] h-[30%] object-cover',
    'absolute top-0 bottom-0 right-0 z-10 w-[30%] h-[55%] object-cover'
]
];

export default function Explain({ title }: Props) {

    return (
        <div>
            <p className='text-[2.5rem] mx-auto w-fit mb-8 mt-48'>作り手の想い</p>

            {concepts.map((item, index) => (
                <div key={index} className='relative w-[80%] h-[60vh] mx-auto'>
                    <p className='relative z-20 text-[1.5rem] text-center mx-auto w-fit mb-20 '>{item.title}</p>
                    <p className='relative z-20 text-[1rem] text-center mx-auto w-[50%]  '>
                        {item.text.split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>
                    <Image
                        className={layout[index][0]}
                        src={item.image1}
                        alt={`Slide ${index}`}
                    />
                    <Image
                        className={layout[index][1]}
                        src={item.image2}
                        alt={`Slide ${index + 1}`}
                    />
                </div>
            ))}
        </div >
    )
}