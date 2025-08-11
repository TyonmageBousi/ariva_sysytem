'use client';

import Header from './components/user/Header';
import MainSlide from './components/user/TopMainSlide';
import EnjoyScenes from './components/user/EnjoyScenes';
import Footer from './components/user/Footer';
import ProductLineUp from './components/user/ProductLineUp';
import OurProductThoughts from './components/user/OurProductThoughts'
import NewsPage from './components/user/NewsPage'
import OurProductContainer from './components/server/OurProductContainer';
import { Suspense } from 'react'

const titleCss = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'
export default function Index() {
  return (
    <div className='w-full'>
      <Header />
      <MainSlide />
      <Suspense fallback={<div>読み込み中...</div>}>
        <OurProductContainer titleCss={titleCss} />
      </Suspense>
    </div>
  )
}
