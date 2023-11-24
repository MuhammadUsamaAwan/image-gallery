import sharp from 'sharp';
import { env } from '@/env.mjs';
import type { ImageProps } from '@/types';

const cache = new Map<ImageProps, string>();

export default async function getBase64ImageUrl(image: ImageProps) {
  const cachedUrl = cache.get(image);
  if (cachedUrl) return cachedUrl;

  const response = await fetch(
    `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_jpg,w_8,q_70/${image.public_id}.${image.format}`
  );

  const buffer = await response.arrayBuffer();
  const minifiedBuffer = await sharp(Buffer.from(buffer)).jpeg({ quality: 70 }).toBuffer();
  const url = `data:image/jpeg;base64,${minifiedBuffer.toString('base64')}`;

  cache.set(image, url);

  return url;
}
