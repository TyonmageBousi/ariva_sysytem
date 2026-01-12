import OurProductThoughts from '@/app/components/user/OurProductThoughts'
import { getPublicImages } from '@/lib/getPublicFiles';

export type OurThought = {
  title: string;
  text: string;
  src: string;
  alt: string;
};

export default async function OurProductContainer({ titleCss }: { titleCss: string }) {

  const images = getPublicImages("top");

  return <OurProductThoughts data={images[0]} />
}