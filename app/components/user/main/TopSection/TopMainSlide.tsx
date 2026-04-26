'use client';
import { Data } from '@/app/components/user/main/TopSection/TopMainContainer'

type props = {
    data: Data[]
}

export default function TopMainSlide({ data }: props) {

    return (
        <section>
            <div className='grid grid-cols-3 grid-rows-2 gap-4 p-4  h-[90vh]  relative z-100'>
                {data.map((slide, index) => {
                    return (
                        <div key={index} className={`relative ${slide.style}`}>
                            <img className='relative w-full h-full object-cover z-60 hover:translate-y-10 transform duration-300' src={slide.src} alt={slide.alt} />
                            <div className='absolute top-0 left-0 z-10'>
                                <p className='z-50 p-3'>{slide.imgExplain}</p>
                            </div>
                        </div>
                    )
                })}
            </div >
        </section>
    );
}
