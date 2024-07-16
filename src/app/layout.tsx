import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

import '@/stylesheets/globals.css';

import '@fontsource/poppins';

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
      <body>
        <ReactQueryProvider>
          {children}
          <ReactQueryDevtools />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
