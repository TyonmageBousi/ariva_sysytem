import Header from './components/user/Header';
import OurProductContainer from '@/app/components/user/main/OurProductContainer';
import { Suspense } from 'react'
import TopMainContainer from '@/app/components/user/main/TopMainContainer';
import LineUpContainer from '@/app/components/user/main/LineUpContainer';

export default function Index() {
  const titleCss = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'

  return (
    <div className='w-full'>
      <p>仮作成中</p>
      <Header />
      <TopMainContainer />
      <OurProductContainer titleCss={titleCss} />
      {/* <LineUpContainer titleCss={titleCss} />
      <Suspense fallback={<div>読み込み中...</div>}>
        <OurProductContainer titleCss={titleCss} />
      </Suspense> */}
    </div>
  )
}
