'use client';
import Header from './Component/Header';
import Slide from './Component/Slide';
import Footer from './Component/Footer';
import PickUp from './Component/Pickup';

export default function Index() {
  return (
    <div className="max-w-[1600px] mx-auto px-4">
      <Header />
      <Slide />
      <PickUp />
      <Footer />
    </div >
  )
}
