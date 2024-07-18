'use client';

import React, { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { Footer } from '@/components/Footer';
import { LowerNavbar } from '@/components/LowerNavbar';
import { PokemonCard } from '@/components/PokemonCard';
import { UpperNavbar } from '@/components/UpperNavbar';

import { useCustomScrollbar } from '@/hooks/useCustomScrollbar';

import { getPokemon } from '@/utils/pokemonAPI';

export default function HomePage() {
  const { ref, inView } = useInView();
  const { childRef, parentRef, thumbRef } = useCustomScrollbar();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['pokemons'],
      queryFn: ({ pageParam = 0 }) =>
        getPokemon({ pageParams: pageParam, pageSize: 25 }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const currentCount = allPages ? allPages.flat().length : 0;
        return currentCount / 25;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const totalPokemon = data?.pages?.[0]?.totalCount || 0;

  return (
    <main className="h-full w-full">
      <div className="flex h-full w-full items-center justify-center bg-slate-900 px-4">
        <div className="flex h-full max-h-[512px] w-full max-w-[1280px] flex-col overflow-hidden rounded-[16px] bg-slate-100">
          <UpperNavbar />
          <LowerNavbar totalPokemon={totalPokemon} />
          <div className="flex grow pb-[16px] pl-[16px] pt-[48px]">
            <div
              className="parent relative flex h-full w-full gap-x-[4px] overflow-hidden pb-[20px]"
              ref={parentRef}
            >
              <div
                className="child overflow-y-hidden overflow-x-scroll"
                ref={childRef}
              >
                <div className="flex h-full gap-x-[4px]">
                  {data?.pages?.map((page, pageIndex) =>
                    page.pokemon.map((pokemon, pokemonIndex) => (
                      <PokemonCard
                        key={pokemon.name}
                        id={pokemon.id}
                        sprites={pokemon.sprites}
                        types={pokemon.types}
                        name={pokemon.name}
                        innerRef={
                          pageIndex === data.pages.length - 1 &&
                          pokemonIndex === page.pokemon.length - 1
                            ? ref
                            : undefined
                        }
                      />
                    ))
                  )}
                </div>
              </div>
              <div className="scroll-container absolute bottom-0 left-0 flex h-[4px] w-full justify-center">
                <div className="scroll-trackbar relative h-[4px] w-[75%] rounded-full bg-slate-300">
                  <div
                    className="scroll-thumb absolute bottom-0 left-0 h-full w-[25%] cursor-pointer rounded-full bg-slate-500/50"
                    ref={thumbRef}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}
