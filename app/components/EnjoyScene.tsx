'use client';


import ItemList from '../components/ItemList';
import type { TitleStyle } from '../types/title'
import type { ImageItem } from '../types/title'
import type { TitleItem } from '../types/title'
import type { ItemStyle } from '../types/title'
import type { WrapperStyle } from '../types/title'
import type { TextItem } from '../types/title'

//DBに格納予定
import enjoy1 from '../assets/enjoy/enjoy1.png';
import enjoy2 from '../assets/enjoy/enjoy2.png';
import enjoy3 from '../assets/enjoy/enjoy3.png';

const imageStyle: string = "w-[90%] h-auto aspect-[4/5] object-cover mx-auto pt-3"
const titleStyle: string = "text-[clamp(1rem,2vw,2rem)] mt-3 mb-5 w-[95%] mx-auto"
const itemStyle: string = "w-[90%] rounded-lg border-2 border-gray-300 shadow-md p-5'"

const imageItem: ImageItem[] = [
    {
        image: enjoy1,
        alt: "",
        className: imageStyle
    }, {
        image: enjoy2,
        alt: "",
        className: imageStyle
    }, {
        image: enjoy3,
        alt: "",
        className: imageStyle
    }
];
const titleItem: TitleItem[] = [{
    text: "自分へのご褒美に",
    className: titleStyle
}, {
    text: "お酒と一緒に",
    className: titleStyle
}, {
    text: "プレゼント",
    className: titleStyle
}
];
const textItem: TextItem[] = [{
    text: "忙しない日々のなかで、ふと立ち止まりたくなる瞬間があります。  そんなとき、頑張っている自分をそっと肯定してくれる甘さを。 自分をいたわる時間を、少しだけ特別に演出してみませんか。",
    className: "w-[95%] mx-auto"
}, {
    text: "一日の終わりにグラスを傾ける、そのひととき。  芳醇な香りとともに、心までほどけていくような甘さを添えて。  大人だけが知っている、静かな贅沢がここにあります。",
    className: "w-[95%] mx-auto"
}, {
    text: "贈り物は、想いをかたちにする魔法。  そのひと口が語るのは、あなたのやさしさと美意識。味はもちろん、見た目の一つひとつにも心を込めてお届けします。",
    className: "w-[95%] mx-auto"
}
];
const itemStyles: ItemStyle[] = [
    { className: itemStyle },
    { className: itemStyle },
    { className: itemStyle }
];
const wrapperStyle: WrapperStyle = {
    className: "flex grid-cols-3 grid-rows-1 gap-4 w-[80%] mx-auto"
};
export default function EnjoyScene({ titleStyle }: TitleStyle) {
    return (
        <div>
            <p className={titleStyle}>楽しみ方</p>
            <ItemList
                images={imageItem}
                titles={titleItem}
                texts={textItem}
                itemStyles={itemStyles}
                wrapperStyle={wrapperStyle}
            />
        </div>
    )
}
