import { NextResponse } from "next/server"


export type SlideImage = {
    src: string;
    alt: string;
};

const slideImages: SlideImage[] = [
    { src: "/assets/main-slide/slide1.png", alt: "" },
    { src: "/assets/main-slide/slide2.png", alt: "" },
    { src: "/assets/main-slide/slide3.png", alt: "" },
    { src: "/assets/main-slide/slide4.png", alt: "" },
    { src: "/assets/main-slide/slide5.png", alt: "" },
];
export async function GET() {
    return NextResponse.json(slideImages)
}
