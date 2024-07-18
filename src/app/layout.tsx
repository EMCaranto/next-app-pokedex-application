import type { Metadata } from 'next';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

import '@/stylesheets/globals.css';

import '@fontsource/poppins';

export const metadata: Metadata = {
  title: 'Pokedex App',
  description: 'Pokedex application',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
