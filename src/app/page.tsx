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
    queryFn: ({ pageParam = 0 }) => getPokemon({ pageParams: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      const nextPage = lastPage.length === 20 ? allPage.length * 20 : undefined;

      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="md:grid-row-1 m-auto mb-5 mt-5 flex w-full flex-col gap-4 md:grid md:w-10/12 md:grid-cols-3 md:items-center">
        {pokemons?.pages?.map((page, pageIndex) =>
          page.map(
            (
              pokemon: { imageUrl: string; name: string },
              pokemonIndex: number
            ) => {
              const key = pageIndex * 20 + pokemonIndex; // Generate a unique key for each Pokemon

              if (pokemonIndex === page.length - 1) {
                return (
                  <Pokemon
                    image={pokemon.imageUrl}
                    name={pokemon.name}
                    key={key}
                    innerRef={ref}
                  />
                );
              } else {
                return (
                  <Pokemon
                    image={pokemon.imageUrl}
                    name={pokemon.name}
                    key={key}
                  />
                );
              }
            }
          )
        )}
      </div>
    </main>
  );
}
