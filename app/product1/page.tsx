'use client';
    import Header from '../componets/Header';
    import Footer from '../componets/Footer';
    import SwiperSlider from '../componets/SwiperSlider';
    import Product from '../componets/Product';
    import ProductDetails from '../componets/ProductDetails';
    import OtherProduct from '../componets/OtherProduct';
    import { TitleInfo } from '../componets/Product';
    import type { StaticImageData } from 'next/image';

    //DBに置き換える予定
    import tyoko1 from './assets/production/tyoko1.png';
    import tyoko2 from './assets/production/tyoko2.png';
    import tyoko3 from './assets/production/tyoko3.png';
    import tyoko4 from './assets/production/tyoko4.png';
    import image1 from '../assets/line-up/image1.png';
    import image2 from '../assets/line-up/image2.png';
    import image3 from '../assets/line-up/image3.png';
    import image4 from '../assets/line-up/image4.png';


    type Image = {
        label: StaticImageData;
    };

    type ProductTitle = string;

    type ProductImage = {
        label: StaticImageData;
        alt: string;
    };
    type ProductExplain = string;
    type ProductPrice = string;

    type OtherProduct = {
        label: StaticImageData;
        alt: string;
    };
    type otherProductTitle = string;

    const slides: Image[] = [
        { label: tyoko1 },
        { label: tyoko2 },
        { label: tyoko3 },
        { label: tyoko4 },
    ];

    const otherProducts: OtherProduct[] = [
        { label: tyoko1, alt: '商品画像1' },
        { label: tyoko2, alt: '商品画像1' },
        { label: tyoko3, alt: '商品画像1' },
        { label: tyoko4, alt: '商品画像1' },
    ];

    const mainTitle: TitleInfo = {
        title: 'Classic Chocolate',
        subtitle: 'はじまりのレシピ、名前のない衝動',
        description: 'カカオと出会った最初の感情。まだ誰にも知られていないレシピが、湧き上がる衝動に導かれる。',
    };

    const productTitles: ProductTitle[] = ['ちょんまげチョコ', 'ちょんまげチョコ', 'ちょんまげチョコ'];

    const productImageGroups: ProductImage[][] = [
        [
            { label: image1, alt: '商品画像1' },
            { label: image2, alt: '商品画像2' },
            { label: image3, alt: '商品画像3' },
            { label: image4, alt: '商品画像4' },
        ],
        [
            { label: image1, alt: '商品画像1' },
            { label: image2, alt: '商品画像2' },
            { label: image3, alt: '商品画像3' },
            { label: image4, alt: '商品画像4' },
        ],
        [
            { label: image1, alt: '商品画像1' },
            { label: image2, alt: '商品画像2' },
            { label: image3, alt: '商品画像3' },
            { label: image4, alt: '商品画像4' },
        ],
    ];

    const productExplains: ProductExplain[] = [
        '和風テイストのチョコレートに、ちょんまげのユーモアを加えた逸品。',
        '京都の老舗が監修した、伝統と革新の融合。',
        '口どけと風味にこだわった、大人向けスイーツ。',
    ];
    const productPrices: ProductPrice[] = ['¥1,200（税込）', '¥1,500（税込）', '¥1,800（税込）'];

    const title_css = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'

    const otherProductTitles: otherProductTitle[] = [
        'はじまりのレシピ、名前のない衝動',
        '甘い反抗期、舌先のキスは唐辛子    ',
        '静けさの革命、和をほどいて編む',
        '期間限定',
    ];

    export default function Index() {
        return (
            <div className="max-w-[1600px] mx-auto px-4">
                <Header />
                <SwiperSlider slides={slides} interval={3000} duration={800} slidesPerView={3} loop={true} style={"w-[90%] mx-auto aspect-square object-cover rounded-[2%]"} />
                <Product main_title={mainTitle} />
                <ProductDetails productTitles={productTitles} productImageGroups={productImageGroups} productExplains={productExplains} productPrices={productPrices} />
                <p>実店舗はこちら</p>
                <OtherProduct otherProducts={otherProducts} otherProductTitles={otherProductTitles} />
                <Footer />
            </div >
        )
    }
