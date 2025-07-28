'use client';

import ItemList from '../components/ItemList';
import type { TitleStyle } from '../types/title'
import type { ImageItem } from '../types/title'
import type { TitleItem } from '../types/title'
import type { ItemStyle } from '../types/title'
import type { WrapperStyle } from '../types/title'

//DBに格納予定
import product1 from '../assets/limited-time/product1.png';
import product2 from '../assets/limited-time/product2.png';
import product3 from '../assets/limited-time/product3.png';

const imageStyle: string = "max-w-[350px] max-h-[350px]"
const titleStyle: string = "w-fit my-[1rem] pl-0"
const itemStyle: string = ''
const wrapperStyle: WrapperStyle = {
    className: "flex justify-around"
};
const imageItems: ImageItem[] = [
    {
        image: product1,
        alt: "クリスマスケーキ",
        className: imageStyle
    },
    {
        image: product2,
        alt: "クリスマス限定特別セット",
        className: imageStyle
    },
    {
        image: product3,
        alt: "サンタチョコ",
        className: imageStyle
    },
];
const titleItems: TitleItem[] = [
    {
        text: "クリスマスケーキ",
        className: titleStyle
    },
    {
        text: "クリスマス限定特別セット",
        className: titleStyle
    }, {
        text: "サンタチョコ",
        className: titleStyle
    }
];
const itemStyles: ItemStyle[] = [
    { className: itemStyle },
    { className: itemStyle },
    { className: itemStyle },
];

export default function Pickup({ titleStyle }: TitleStyle) {
    return (
        <div>
            <p className={titleStyle}>PickUp</p>
            <ItemList
                images={imageItems}
                titles={titleItems}
                itemStyles={itemStyles}
                wrapperStyle={wrapperStyle}
            />
        </div>
    )
}
