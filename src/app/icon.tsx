import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div tw='flex h-full w-full items-center justify-center bg-black text-[15px] text-white'>IG</div>,
    {
      width: 32,
      height: 32,
    }
  );
}
