'use client';

import image1 from '../assets/line-up/image1.png';
import image2 from '../assets/line-up/image2.png';
import image3 from '../assets/line-up/image3.png';
import image4 from '../assets/line-up/image4.png';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';
;

type Props = {
    title: string;
}


type Line_up = {
    image: StaticImageData;
    name: string;
};

const line_up: Line_up[][] = [
    [
        {
            image: image1,
            name: "はじまりのレシピ、名前のない衝動",
        },
        {
            image: image2,
            name: "甘い反抗期、舌先のキスは唐辛子",
        },
    ],
    [
        {
            image: image3,
            name: "余韻に溶ける、ふたりの物語",
        },
        {
            image: image4,
            name: "静けさの革命、和をほどいて編む",
        },
    ],
];

export default function Lineup({ title }: Props) {
    return (
        <div>
            <p className={title}>Line Up</p>
            {line_up.map((item, rowIndex) => (
                <div
                    key={rowIndex}
                    className="grid grid-cols-2 grid-rows-1 gap-4 w-[65%] mx-auto"
                >
                    {item.map((list, index) => (
                        <div key={index} className="w-full relative mt-4">
                            <Image
                                src={list.image}
                                alt={`product ${index + 1}`}
                                className="w-full h-auto aspect-[3/4] object-cover rounded-lg z-10"
                            />
                            <div className="w-full h-[5vh] bg-black absolute left-0 bottom-0 z-20 opacity-60"></div>
                            <p className="absolute left-0 bottom-0 w-full h-[5vh] flex items-center justify-center text-white text-[1.3em] z-20 m-0">
                                {list.name}</p>
                        </div>
                    ))}
                </div>
            ))}

        </div>
    )
}
