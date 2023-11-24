import Link from 'next/link';

export default function Home() {
  return (
    <Link href='/test' className='text-white underline underline-offset-4'>
      Test
    </Link>
  );
}
