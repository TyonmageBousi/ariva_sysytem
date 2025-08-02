'use client';

import Header from './components/Header';
import MainSlide from './components/TopMainSlide';
import EnjoyScenes from './components/EnjoyScenes';
import Footer from './components/Footer';
import ProductLineUp from './components/ProductLineUp';
import OurProductThoughts from './components/OurProductThoughts'
import NewsPage from './components/NewsPage'


const titleCss = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'

export default function Index() {
  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <Header />
      <MainSlide />
      <NewsPage  titleCss={titleCss}/>
      <OurProductThoughts titleCss={titleCss} />
      <ProductLineUp titleCss={titleCss} />
      <EnjoyScenes titleCss={titleCss} />
      <Footer />
    </div >
  )
}
