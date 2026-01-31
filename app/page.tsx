import Header from './components/user/Header';
import OurProductContainer from '@/app/components/user/main/OurProductContainer';
import TopMainContainer from '@/app/components/user/main/TopMainContainer';
import ProductDetails, { ProductDetailsData } from '@/app/components/user/product/ProductDetails'
import OtherProduct from '@/app/components/user/OtherProduct';
import Footer from '@/app/components/user/Footer';

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
        <OtherProduct />
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("ページ読み込みエラー:", error);
  }
}