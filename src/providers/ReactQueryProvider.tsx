'use client';

import React, { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
