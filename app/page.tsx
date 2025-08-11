import Header from './components/user/Header';
import OurProductContainer from './components/server/OurProductContainer';
import { Suspense } from 'react'
import TopMainContainer from './components/server/TopMainContainer';
import LineUpContainer from './components/server/LineUpContainer';

const titleCss = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'
export default function Index() {
  return (
    <div className='w-full'>
      <Header />
      <TopMainContainer />
      <LineUpContainer titleCss={titleCss} />
      <Suspense fallback={<div>読み込み中...</div>}>
        <OurProductContainer titleCss={titleCss} />
      </Suspense>
    </div>
  )
}
