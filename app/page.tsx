import Header from './components/user/Header';
import OurProductContainer from '@/app/components/user/main/OurProductContainer';
import TopMainContainer from '@/app/components/user/main/TopMainContainer';
import HandleFrontError from '@/app/components/error/error';
import ProductDetails, { ProductDetailsData } from '@/app/components/user/product/ProductDetails'

export default async function Index() {
  const titleCss = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/productDetails`);
    const result = await res.json();
    
    if (!res.ok) throw new Error(result.error || `HTTP error! status: ${res.status}`);
    if (!result.success) throw new Error(result.error || 'Failed to fetch data');

    return (
      <div className='w-full'>
        <Header />
        <TopMainContainer />
        <ProductDetails productDetailsData={result.data} />
        <OurProductContainer titleCss={titleCss} />
      </div>
    )
  } catch (error) {
    console.error("ページ読み込みエラー:", error);
    
    // ここが重要！エラー時に必ず何かを返す
    if (error instanceof Error) {
      return <HandleFrontError message={error.message} />
    }
    
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='text-center p-8'>
          <h1 className='text-2xl font-bold text-red-600 mb-4'>エラーが発生しました</h1>
          <p className='text-gray-600 mb-6'>ページの読み込みに失敗しました</p>
          <a 
            href="/"
            className='px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600'
          >
            トップページに戻る
          </a>
        </div>
      </div>
    )
  }
}