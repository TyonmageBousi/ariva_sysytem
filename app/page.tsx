'use client';

import Header from './components/Header';
import Slide from './components/MainSlide';
import Footer from './components/Footer';
import PickUp from './components/Pickup';
import Explain from './components/Explain';
import Lineup from './components/Lineup';
import EnjoyScene from './components/EnjoyScene';

const title_css = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'

export default function Index() {
  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <Header />
      <Slide />
      <PickUp titleStyle={title_css} />
      <Explain titleStyle={title_css} />
      <Lineup titleStyle={title_css} />
      <EnjoyScene titleStyle={title_css} />
      <Footer />
    </div >
  )
}
