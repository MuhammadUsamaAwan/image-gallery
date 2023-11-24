import type { Metadata } from 'next';
import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Image Gallery',
    template: `%s - Image Gallery`,
  },
  description: 'Image Gallery',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-black font-sans text-white antialiased', fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}
