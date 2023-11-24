import { Gallery } from '@/components/gallery';
import { getImages } from '@/lib/getImages';

export default async function Home() {
  const images = await getImages('test');

  return <Gallery images={images} />;
}
