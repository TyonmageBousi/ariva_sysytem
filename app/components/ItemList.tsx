'use client';

import Image from 'next/image';
import type { ImageItem } from '../types/title'
import type { TitleItem } from '../types/title'
import type { ItemStyle } from '../types/title'
import type { WrapperStyle } from '../types/title'
import type { TextItem } from '../types/title'

type ItemListProps = {
    images: ImageItem[];
    titles: TitleItem[];
    texts?: TextItem[];
    itemStyles: ItemStyle[];
    wrapperStyle: WrapperStyle;
};

export default function ItemList({ images, titles, texts, itemStyles, wrapperStyle }: ItemListProps) {
    return (
        <div className={wrapperStyle.className}>
            {images.map((image, index) => {
                const title = titles[index];
                const text = texts?.[index];
                const itemStyle = itemStyles[index].className;
                return (
                    <div key={index} className={itemStyle}>
                        <Image src={image.image} alt={image.alt} className={image.className} />
                        <p className={title.className}>{title.text}</p>
                        {text && <p className={text.className}>{text.text}</p>}
                    </div>
                );
            })}
        </div>
    );
}
