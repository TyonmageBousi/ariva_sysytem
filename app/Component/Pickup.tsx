'use client';
import product1 from '../assets/limited-time/product1.png';
import product2 from '../assets/limited-time/product2.png';
import product3 from '../assets/limited-time/product3.png';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

export default function PickUp() {
    type Product = {
        image: StaticImageData,
        name: string
    }
    const products: Product[] = [
        { image: product1, name: 'クリスマスケーキ' },
        { image: product2, name: 'クリスマス限定特別セット' },
        { image: product3, name: 'サンタチョコ' },
    ]
    return (
        <div>
            <p className="mx-auto w-fit text-[3.0rem] font-bold mt-[10rem] mb-[1rem]">PickUp</p>
            <ul className="flex justify-around">
                {products.map((item, index) => (
                    <li key={index}>
                        <Image className='max-w-[350px] max-h-[350px]' src={item.image} alt={`product ${index + 1}`} />
                        <p className=' w-fit my-[1rem] pl-0'>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
