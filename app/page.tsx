import Header from './components/user/Header';
import OurProductContainer from '@/app/components/user/main/OurProductContainer';
import TopMainContainer from '@/app/components/user/main/TopSection/TopMainContainer';
import ProductDetails, { ProductDetailsData } from '@/app/components/user/product/ProductDetails'
import OtherProduct from '@/app/components/user/OtherProduct';
import Footer from '@/app/components/user/Footer';
import { log } from 'console';

export default async function Index() {
  const titleCss = 'text-center text-[2.5rem] mx-auto w-fit mb-8 mt-48'

  const data = [
    {
      id: 1,
      name: "ちょんまげ",
      price: "3000",
      discountPrice: "2000",
      description: "",
      productCategories: ["", ""],
      productColors: ["", ""],
      productImages: ["", ""]
    },
    {
      id: 2,
      name: "ちょんまげ",
      price: "4000",
      discountPrice: "",
      description: "",
      productCategories: ["", ""],
      productColors: ["", ""],
      productImages: ["", ""]
    }
  ]

  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/api/user/productDetails`);
    // const result = await res.json();

    // console.log(result.data)
    // if (!res.ok) throw new Error(result.error || `HTTP error! status: ${res.status}`);
    // if (!result.success) throw new Error(result.error || 'Failed to fetch data');

    return (
      <div className='w-full'>
        {/* <p className='text-black'>こんにちは</p> */}
        <Header />
        <TopMainContainer />
        <ProductDetails productDetailsData={data} />
        {/* <OurProductContainer titleCss={titleCss} />
        <OtherProduct />
        <Footer />  */}
      </div>
    )
  } catch (error) {
    console.error("ページ読み込みエラー:", error);
  }
}