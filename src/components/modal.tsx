import { useRef, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEventListener } from '@/hooks/useEventListener';
import type { ImageProps } from '@/types';
import { Dialog } from '@headlessui/react';

type Props = {
  images: ImageProps[];
  onClose: () => void;
  photoId: number;
};

export default function Modal({ images, onClose, photoId }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  //   const router = useRouter();

  let index = Number(photoId);

  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(index);

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setCurIndex(newVal);
    // router.push(
    //   {
    //     query: { photoId: newVal },
    //   },
    //   `/p/${newVal}`,
    //   { shallow: true }
    // );
  }

  useEventListener('keydown', e => {
    if (e.key === 'ArrowRight' && index + 1 < images.length) {
      changePhotoId(index + 1);
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      changePhotoId(index - 1);
    }
  });

  return (
    <Dialog
      static
      open={true}
      onClose={onClose}
      initialFocus={overlayRef}
      className='fixed inset-0 z-10 flex items-center justify-center'
    >
      <Dialog.Overlay
        ref={overlayRef}
        as={motion.div}
        key='backdrop'
        className='fixed inset-0 z-30 bg-black/70 backdrop-blur-2xl'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      shared modal
      {/* <SharedModal
        index={curIndex}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={handleClose}
        navigation={true}
      /> */}
    </Dialog>
  );
}
