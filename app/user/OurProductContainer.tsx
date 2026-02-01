import OurProductThoughts from '@/app/user/OurProductThoughts'
import { getPublicImages } from '@/lib/getPublicFiles';

export type OurThought = {
  title: string;
  text: string;
  src: string;
  alt: string;
};

export default async function OurProductContainer({ titleCss }: { titleCss: string }) {

  const images = getPublicImages("top");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/productDetails`);
  const result = await res.json();
  if (!res.ok) throw new Error(result);
  if (!result.success) throw new Error(result)

  return <OurProductThoughts data={images[0]} productList={result.data} />
}