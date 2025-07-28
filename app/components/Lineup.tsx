'use client';

import ItemList from '../components/ItemList';
import type { TitleStyle } from '../types/title'
import type { ImageItem } from '../types/title'
import type { TitleItem } from '../types/title'
import type { ItemStyle } from '../types/title'
import type { WrapperStyle } from '../types/title'

import image1 from '../assets/line-up/image1.png';
import image2 from '../assets/line-up/image2.png';
import image3 from '../assets/line-up/image3.png';
import image4 from '../assets/line-up/image4.png';

const imageStyle: string = "w-full h-auto aspect-[3/4] object-cover rounded-lg z-10"
const titleStyle: string = "absolute left-0 bottom-0 w-full h-[5vh] flex items-center justify-center text-white text-[1.3em] z-20 bg-[rgba(0,0,0,0.4)] rounded-lg"
const itemStyle: string = 'relative aspect-[3/4] rounded-lg w-full mt-4'

const imageItems1: ImageItem[] = [
    {
        image: image1,
        alt: "レシピの始まり",
        className: imageStyle
    },
    {
        image: image2,
        alt: "唐辛子のキス",
        className: imageStyle
    },
];

const imageItems2: ImageItem[] = [
    {
        image: image3,
        alt: "余韻に溶ける",
        className: imageStyle
    },
    {
        image: image4,
        alt: "和をほどく",
        className: imageStyle
    },
];

const titleItems1: TitleItem[] = [
    {
        text: "はじまりのレシピ、名前のない衝動",
        className: titleStyle
    },
    {
        text: "甘い反抗期、舌先のキスは唐辛子",
        className: titleStyle
    }
];

const titleItems2: TitleItem[] = [
    {
        text: "余韻に溶ける、ふたりの物語",
        className: titleStyle
    },
    {
        text: "静けさの革命、和をほどいて編む",
        className: titleStyle
    }
];

const itemStyles: ItemStyle[] = [
    { className: itemStyle },
    { className: itemStyle }
];

const wrapperStyle: WrapperStyle = {
    className: "grid grid-cols-2 grid-rows-1 gap-4 w-[65%] mx-auto"
};


export default function Lineup({ titleStyle }: TitleStyle) {
    return (
        <div>
            <p className={titleStyle}>Line Up</p>
            <div>
                <ItemList
                    images={imageItems1}
                    titles={titleItems1}
                    itemStyles={itemStyles}
                    wrapperStyle={wrapperStyle}
                />
                <ItemList
                    images={imageItems2}
                    titles={titleItems2}
                    itemStyles={itemStyles}
                    wrapperStyle={wrapperStyle}
                />
            </div>
        </div>
    );
}
