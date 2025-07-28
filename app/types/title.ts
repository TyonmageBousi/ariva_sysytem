import type { StaticImageData } from 'next/image';

export type TitleStyle = {
    titleStyle: string;
}


export type ImageItem = {
    image: StaticImageData;
    alt: string;
    className: string;
};

export type TitleItem = {
    text: string;
    className: string;
};

export type ItemStyle = {
    className: string;
};

export type WrapperStyle = {
    className: string;
};
export type TextItem = {
    text: string;
    className: string;
};