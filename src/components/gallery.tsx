'use client';

import { useState } from 'react';
import Image from 'next/image';
import { env } from '@/env.mjs';
import { ImageProps } from '@/types';

import Modal from './modal';

type Props = {
  images: ImageProps[];
};

export function Gallery({ images }: Props) {
  const [photoId, setPhotoId] = useState<number | null>(null);

  return (
    <div className='mx-auto max-w-[1960px] p-4'>
      <div className='columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4'>
        {images.map(({ id, public_id, format, blurDataUrl }) => (
          <button
            key={id}
            onClick={() => setPhotoId(id)}
            className='after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg'
          >
            <Image
              alt='Image gallery photo'
              className='transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110'
              style={{ transform: 'translate3d(0, 0, 0)' }}
              placeholder='blur'
              blurDataURL={blurDataUrl}
              src={`https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
              width={720}
              height={480}
              sizes='(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw'
            />
          </button>
        ))}
        {photoId && <Modal images={images} onClose={() => setPhotoId(null)} photoId={photoId} />}
      </div>
    </div>
  );
}
