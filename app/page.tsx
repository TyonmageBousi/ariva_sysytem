'use client';
import Header from './Component/Header';
import Slide from './Component/Slide';
import Footer from './Component/Footer';
import PickUp from './Component/Pickup';
import Explain from './Component/Explain';


export default function Index() {
  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <Header />
      <Slide />
      <PickUp />
      <Explain />
      <Footer />
    </div >
  )
}
