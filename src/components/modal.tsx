import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ModalContent } from '@/components/modal-content';
import { useEventListener } from '@/hooks/useEventListener';
import type { ImageProps } from '@/types';
import { Dialog } from '@headlessui/react';

type Props = {
  images: ImageProps[];
  onClose: () => void;
  photoId: number;
};

export function Modal({ images, onClose, photoId }: Props) {
  const [direction, setDirection] = useState(0);
  const [curIndex, setCurIndex] = useState(photoId);

  const overlayRef = useRef<HTMLDivElement>(null);

  function changePhotoId(newVal: number) {
    newVal > photoId ? setDirection(1) : setDirection(-1);
    setCurIndex(newVal);
  }

  useEventListener('keydown', e => {
    if (e.key === 'ArrowRight' && curIndex + 1 < images.length) {
      changePhotoId(curIndex + 1);
    }
    if (e.key === 'ArrowLeft' && curIndex > 0) {
      changePhotoId(curIndex - 1);
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
      <ModalContent
        index={curIndex}
        currentPhoto={images[curIndex] as ImageProps}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        closeModal={onClose}
      />
    </Dialog>
  );
}
