import { getImages } from '@/lib/getImages';

export default async function Home() {
  const images = await getImages('test');
  console.log(images);

  return <div>Home</div>;
}
