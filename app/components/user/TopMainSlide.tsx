'use client';
import { Data } from '@/app/components/user/main/TopMainContainer'

type props = {
    data: Data[]
}

export default function TopMainSlide({ data }: props) {

    return (
        <div className='grid grid-cols-3 grid-rows-2 gap-4 p-4  h-[90vh] mt-[10vh]'>
            {data.map((slide, index) => {
                return (
                    <div key={index} className={`relative ${slide.style} z-40` }>
                        <img className='relative w-full h-full object-cover z-60 hover:translate-y-10 transform duration-300' src={slide.src} alt={slide.alt} />
                        <div className='absolute top-0 left-0 z-50 '>
                            <p className='z-50 p-3'>{slide.imgExplain}</p>
                        </div>
                    </div>
                )
            })}
        </div >
    );
}
