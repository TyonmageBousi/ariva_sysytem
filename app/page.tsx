'use client';
import Header from './component/Header';
import Slide from './component/Slide';
import Footer from './component/Footer';

export default function Index() {
  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <Header />
      <Slide />
      <Footer />
    </div >
  )
}
