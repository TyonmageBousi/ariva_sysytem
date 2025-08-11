    import { NextResponse } from "next/server"
    import explain1 from '../../../assets/explain/explain1.png';
    import explain2 from '../../../assets/explain/explain2.png';
    import explain3 from '../../../assets/explain/explain3.png';
    import explain4 from '../../../assets/explain/explain4.png';
    import explain5 from '../../../assets/explain/explain5.png';
    import explain6 from '../../../assets/explain/explain6.png';
    import type { StaticImageData } from 'next/image';

    export type OurThought = {
        title: string,
        text: string,
        src1: string,
        src2: string,
    }


    const ourThoughts: OurThought[] = [
        {
            title: '日々のちょっとした贅沢に',
            text: '日々の喧騒の中で、お菓子を食べる安らぎの時間。その時間を至福のひと時にしたい思いでチョコレートを作ってます。',
            src1: explain1.src,
            src2: explain2.src
        },
        {
            title: 'パティシエ',
            text: `ベルギーで学んだ技術、知識をベースに日本にある美学という考え方の元、\nお客様にもう一つ食べたいと思って頂けるお菓子屋を目指しています。`,
            src1: explain3.src,
            src2: explain4.src
        },
        {
            title: '製造法',
            text: `手間を惜しまず、あたり前のことを大切に。\n一つひとつの手仕事と実直に向き合うお菓子作りをしています。`,
            src1: explain5.src,
            src2: explain6.src
        },
    ];

    export async function GET() {
        return NextResponse.json(ourThoughts)
    }