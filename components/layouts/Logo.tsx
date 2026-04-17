import LogoImg from "@/public/logo.png"
import Image from "next/image"

export default function Logo() {
    return (

        <div className="flex flex-col leading-none">

            <div className="text-[9px] font-light tracking-[0.45em] text-white/60 uppercase h-[40%] flex flex-col  md:flex-row">
                <span className="flex justify-center">Premium</span>
                <span className="mt-1 md:mt-0 md:ml-1">Chocolate</span>
            </div>
            <div className="flex justify-center h-[60%]">
                <span className="text-lg font-extralight tracking-widest flex items-center">
                    残十字
                </span>
                <span className="flex items-center ml-1">
                    <Image src={LogoImg} alt="" width={18} height={18} className="" />
                </span>
            </div>
        </div>
    )

}