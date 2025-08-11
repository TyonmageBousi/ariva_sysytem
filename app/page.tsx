'use client';

import Header from './components/user/Header';
import MainSlide from './components/user/TopMainSlide';
import EnjoyScenes from './components/user/EnjoyScenes';
import Footer from './components/user/Footer';
import ProductLineUp from './components/user/ProductLineUp';
import OurProductThoughts from './components/user/OurProductThoughts'
import NewsPage from './components/user/NewsPage'
import OurProductContain from './components/server/OurProductContain';


const titleCss = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'

export default function Index() {
  return (
    <div className='w-full'>

      <MainSlide />
      <ProductLineUp titleCss={titleCss} />

      <EnjoyScenes titleCss={titleCss} />
      <NewsPage titleCss={titleCss} />
    </div >
  )
}
