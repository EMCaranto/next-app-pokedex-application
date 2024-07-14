'use client';

import React, { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getPokemon } from '@/utils/getPokemon';
import { Pokemon } from '@/components/Pokemon';

export default function RootPage() {
  const { ref, inView } = useInView();

  const {
    data: pokemons,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam = 0 }) =>
      getPokemon({ pageParams: pageParam, pageSize: 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const currentCount = allPages ? allPages.flat().length : 0;
      return currentCount / 20;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="md:grid-row-1 m-auto mb-5 mt-5 flex w-full flex-col gap-4 md:grid md:w-10/12 md:grid-cols-3 md:items-center">
        {pokemons?.pages?.map((page, pageIndex) =>
          page.map((pokemon, pokemonIndex) => (
            <Pokemon
              key={pokemon.name}
              image={pokemon.imageUrl}
              name={pokemon.name}
              innerRef={
                pageIndex === pokemons.pages.length - 1 &&
                pokemonIndex === page.length - 1
                  ? ref
                  : undefined
              }
            />
          ))
        )}
      </div>
      {isFetchingNextPage && <p>Loading more...</p>}
      {error && <p>Error: {error.message}</p>}
    </main>
  );
}
