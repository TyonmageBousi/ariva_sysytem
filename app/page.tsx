'use client';

import Header from './Component/Header';
import Slide from './Component/Main';
import Footer from './Component/Footer';
import PickUp from './Component/Pickup';
import Explain from './Component/Explain';
import Lineup from './Component/Lineup';
import Enjoy_guide from './Component/Enjoy_guide';

const title_css = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'

export default function Index() {
  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <Header />
      <Slide />
      <PickUp title={title_css} />
      <Explain title={title_css} />
      <Lineup title={title_css} />
      <Enjoy_guide title={title_css} />
      <Footer />
    </div >
  )
}
