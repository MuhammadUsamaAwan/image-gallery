import Link from 'next/link';

export default function Home() {
  return (
    <div className='mx-auto max-w-xl py-10'>
      <h1 className='mb-8 text-center text-3xl font-bold'>Image Gallery</h1>
      <ul className='list-disc space-y-3 text-xl'>
        <li>
          <Link href='/test' className='underline-offset-4 hover:underline'>
            Test
          </Link>
        </li>
      </ul>
    </div>
  );
}
