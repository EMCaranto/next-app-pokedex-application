import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import '@/stylesheets/globals.css';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokedex App',
  description: 'Pokedex application created with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
