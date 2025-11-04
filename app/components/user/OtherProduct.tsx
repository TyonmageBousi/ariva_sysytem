
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

type OtherProduct = {
    label: StaticImageData;
    alt: string;
};

type OtherProductsTitle = string;

type Props = {
    otherProducts: OtherProduct[];
    otherProductTitles: OtherProductsTitle[];
};

export default function OtherProduct({ otherProducts, otherProductTitles }: Props) {
    return (
        <div className='flex gap-4 justify-between'>
            {otherProducts.map((image, index) => (
                <div key={index} className='relative w-[20%] aspect-square'>
                    <Image
                        src={image.label}
                        alt={image.alt}
                        fill
                        className='object-cover rounded-[2%]'
                    />
                    <div className='w-full h-[5vh] bg-black absolute left-0 bottom-0 z-20 opacity-60'></div>
                    <p className='absolute left-0 bottom-0 w-full h-[5vh] flex items-center justify-center text-white text-[1.3em] z-20 m-0'>{otherProductTitles[index]}</p>
                </div>

            ))}
        </div>
    );
}
