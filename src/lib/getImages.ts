import { cloudinary } from '@/lib/cloudinary';
import getBase64ImageUrl from '@/lib/generateBlurPlaceholder';
import { ImageProps } from '@/types';

export async function getImages(folder: string) {
  const results = await cloudinary.v2.search.expression(`folder:${folder}/*`).sort_by('public_id', 'desc').execute();
  let images: ImageProps[] = results.resources.map((image: ImageProps) => ({
    id: image.public_id,
    height: image.height,
    width: image.width,
    public_id: image.public_id,
    format: image.format,
  }));

  const blurImagePromises = results.resources.map((image: ImageProps) => getBase64ImageUrl(image));
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  images = images.map((image, i) => ({
    ...image,
    blurDataUrl: imagesWithBlurDataUrls[i],
  }));

  return images;
}
