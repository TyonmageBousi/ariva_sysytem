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
    if (!res.ok) throw new Error(result);
    if (!result.success) throw new Error(result)

    return (
      <div className='w-full'>
        <Header />
        <TopMainContainer />
        <ProductDetails productDetailsData={result.data} />

        <OurProductContainer titleCss={titleCss} />

      </div>
    )
  }
  catch (error) {
    if (error instanceof Error)
      return <HandleFrontError {...error} />
  }
}
