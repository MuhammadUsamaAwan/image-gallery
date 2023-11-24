import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { env } from '@/env.mjs';
import { variants } from '@/lib/animationVariants';
import downloadPhoto from '@/lib/downloadPhoto';
import { range } from '@/lib/range';
import type { ImageProps } from '@/types';
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

type Props = {
  index: number;
  images: ImageProps[];
  currentPhoto: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  direction: number;
};

export function ModalContent({ index, images, changePhotoId, closeModal, currentPhoto, direction }: Props) {
  const [loaded, setLoaded] = useState(false);

  const filteredImages = useMemo(() => {
    return images.filter((image: ImageProps) => range(index - 15, index + 15).includes(image.id));
  }, [images, index]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className='wide:h-full xl:taller-than-854:h-auto relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center'
        {...handlers}
      >
        {/* Main image */}
        <div className='w-full overflow-hidden'>
          <div className='relative flex aspect-[3/2] items-center justify-center'>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial='enter'
                animate='center'
                exit='exit'
                className='absolute'
              >
                <Image
                  src={`https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1280/${currentPhoto.public_id}.${currentPhoto.format}`}
                  width={1280}
                  height={853}
                  priority
                  alt='Next.js Conf image'
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons + bottom nav bar */}
        <div className='absolute inset-0 mx-auto flex max-w-7xl items-center justify-center'>
          {/* Buttons */}
          {loaded && (
            <div className='relative aspect-[3/2] max-h-full w-full'>
              {index > 0 && (
                <button
                  className='absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none'
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                  onClick={() => changePhotoId(index - 1)}
                >
                  <ChevronLeftIcon className='h-6 w-6' />
                </button>
              )}
              {index + 1 < images.length && (
                <button
                  className='absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none'
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                  onClick={() => changePhotoId(index + 1)}
                >
                  <ChevronRightIcon className='h-6 w-6' />
                </button>
              )}
              <div className='absolute right-0 top-0 flex items-center gap-2 p-3 text-white'>
                <a
                  href={`https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentPhoto.public_id}.${currentPhoto.format}`}
                  className='rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white'
                  target='_blank'
                  title='Open fullsize version'
                  rel='noreferrer'
                >
                  <ArrowTopRightOnSquareIcon className='h-5 w-5' />
                </a>

                <button
                  onClick={() =>
                    downloadPhoto(
                      `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${currentPhoto.public_id}.${currentPhoto.format}`,
                      `${index}.jpg`
                    )
                  }
                  className='rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white'
                  title='Download fullsize version'
                >
                  <ArrowDownTrayIcon className='h-5 w-5' />
                </button>
              </div>
              <div className='absolute left-0 top-0 flex items-center gap-2 p-3 text-white'>
                <button
                  onClick={() => closeModal()}
                  className='rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white'
                >
                  <XMarkIcon className='h-5 w-5' />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Nav bar */}
          <div className='fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60'>
            <motion.div initial={false} className='mx-auto mb-6 mt-6 flex aspect-[3/2] h-14'>
              <AnimatePresence initial={false}>
                {filteredImages.map(({ public_id, format, id }) => (
                  <motion.button
                    initial={{
                      width: '0%',
                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    }}
                    animate={{
                      scale: id === index ? 1.25 : 1,
                      width: '100%',
                      x: `${Math.max(index * -100, 15 * -100)}%`,
                    }}
                    exit={{ width: '0%' }}
                    onClick={() => changePhotoId(id)}
                    key={id}
                    className={`${id === index ? 'z-20 rounded-md shadow shadow-black/50' : 'z-10'} ${
                      id === 0 ? 'rounded-l-md' : ''
                    } ${
                      id === images.length - 1 ? 'rounded-r-md' : ''
                    } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                  >
                    <Image
                      alt='small photos on the bottom'
                      width={180}
                      height={120}
                      className={`${
                        id === index
                          ? 'brightness-110 hover:brightness-110'
                          : 'brightness-50 contrast-125 hover:brightness-75'
                      } h-full transform object-cover transition`}
                      src={`https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_180/${public_id}.${format}`}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
