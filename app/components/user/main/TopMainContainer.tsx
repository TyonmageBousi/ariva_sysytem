import TopMainSlide from '@/app/components/user/TopMainSlide'
import { getPublicImages } from '@/lib/getPublicFiles';

export default function TopMainContainer() {
  const images = getPublicImages("main-slide");
  if (images.length !== 0) {
    return <TopMainSlide data={images} />
  } else {
    console.log(images)
  }
}