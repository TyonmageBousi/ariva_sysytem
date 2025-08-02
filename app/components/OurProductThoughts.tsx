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
    titleCss: string;
}

type OurThought = {
    title: string,
    text: string,
    src1: StaticImageData,
    src2: StaticImageData,
}
const ourThoughts: OurThought[] = [
    {
        title: '日々のちょっとした贅沢に',
        text: '日々の喧騒の中で、お菓子を食べる安らぎの時間。その時間を至福のひと時にしたい思いでチョコレートを作ってます。',
        src1: explain1,
        src2: explain2
    },
    {
        title: 'パティシエ',
        text: `ベルギーで学んだ技術、知識をベースに日本にある美学という考え方の元、\nお客様にもう一つ食べたいと思って頂けるお菓子屋を目指しています。`,
        src1: explain3,
        src2: explain4
    },
    {
        title: '製造法',
        text: `手間を惜しまず、あたり前のことを大切に。\n一つひとつの手仕事と実直に向き合うお菓子作りをしています。`,
        src1: explain5,
        src2: explain6
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

export default function OurProductThoughts({ titleCss }: Props) {
    return (
        <div>
            <p className={titleCss}>作り手の想い</p>

            {ourThoughts.map((ourThought, index) => (
                <div key={index} className='relative w-[80%] h-[60vh] mx-auto'>
                    <p className='relative z-20 text-[1.5rem] text-center mx-auto w-fit mb-20 '>{ourThought.title}</p>
                    <p className='relative z-20 text-[1rem] text-center mx-auto w-[50%]  '>
                        {ourThought.text.split('\n').map((ourThought, i) => (
                            <span key={i}>
                                {ourThought}
                                <br />
                            </span>
                        ))}
                    </p>
                    <Image
                        className={layout[index][0]}
                        src={ourThought.src1}
                        alt={`Slide ${index}`}
                    />
                    <Image
                        className={layout[index][1]}
                        src={ourThought.src2}
                        alt={`Slide ${index + 1}`}
                    />
                </div>
            ))}
        </div >
    )
}