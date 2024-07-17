'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

import { useInfiniteQuery } from '@tanstack/react-query';
import { ArrowUpAZIcon, CircleMinusIcon } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { getPokemon } from '@/utils/pokemonAPI';
import { Pokemon } from '@/components/Pokemon';

import PokeballLogo from '@/icons/png/pokeball.png';
import PokedexLogo from '@/icons/svg/pokedex.svg';

export default function RootPage() {
  const { ref, inView } = useInView();

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  const totalPokemon = data?.pages?.[0]?.totalCount || 0;

  // Custom Scrollbar
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current;
    const child = childRef.current;
    const thumb = thumbRef.current;

    if (!parent || !child || !thumb) return;

    const syncScroll = () => {
      const trackWidth = parent.clientWidth * 0.75; // 75% of the parent width
      const thumbWidth = thumb.clientWidth;
      const scrollPercentage =
        child.scrollLeft / (child.scrollWidth - child.clientWidth);
      const maxThumbLeft = trackWidth - thumbWidth;
      thumb.style.left = scrollPercentage * maxThumbLeft + 'px';
    };

    const syncScrollbar = (event: MouseEvent) => {
      const trackWidth = parent.clientWidth * 0.75; // 75% of the parent width
      const thumbWidth = thumb.clientWidth;
      const maxThumbLeft = trackWidth - thumbWidth;

      const mouseX =
        event.clientX -
        parent.getBoundingClientRect().left -
        parent.clientWidth * 0.125; // 12.5% padding on each side
      const scrollPercentage = mouseX / trackWidth;
      child.scrollLeft =
        scrollPercentage * (child.scrollWidth - child.clientWidth);

      thumb.style.left = Math.min(Math.max(0, mouseX), maxThumbLeft) + 'px';
    };

    const onMouseMove = (moveEvent: MouseEvent) => syncScrollbar(moveEvent);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    thumb.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    child.addEventListener('scroll', syncScroll);
    syncScroll();
  }, []);

  return (
    <main className="h-full w-full">
      <div className="flex h-full w-full items-center justify-center bg-slate-900 px-4">
        <div className="flex h-full max-h-[512px] w-full max-w-[1280px] flex-col overflow-hidden rounded-[16px] bg-slate-100">
          {/** Upper Navbar */}
          <div className="flex h-[64px] w-full items-center justify-between border-b-[2px] border-yellow-300 bg-gradient-to-b from-slate-100 to-slate-200 px-[24px]">
            <div className="flex items-center justify-start gap-x-[8px]">
              <Image
                src={PokedexLogo}
                alt="pokedex-logo"
                height={40}
                width={40}
                priority
              />
              <span className="text-lg font-semibold text-slate-900">
                Pokédex
              </span>
            </div>
            <div>
              {/** Theme Toggler */}
              <div className="h-[24px] w-[48px] rounded-[12px] bg-slate-500"></div>
            </div>
          </div>
          {/** Lower Navbar */}
          <div className="flex h-[48px] w-full items-center justify-between bg-slate-700 px-[16px]">
            <div className="flex items-center justify-start gap-x-[8px]">
              <Image
                src={PokeballLogo}
                alt="pokeball-logo"
                height={24}
                width={24}
                priority
              />
              <span className="text-sm font-semibold tracking-tight text-slate-50">
                {totalPokemon}
              </span>
              <div className="ml-[16px] h-[20px] w-[2px] rounded-full bg-slate-500"></div>
            </div>
            <div className="flex items-center">
              <div className="ml-[16px] h-[20px] w-[2px] rounded-full bg-slate-500"></div>
              <div className="flex items-center">
                <div className="flex h-[16px] w-[300px] items-center gap-x-[8px] px-[16px]">
                  <ArrowUpAZIcon className="text-slate-50" size={20} />
                  <span className="text-sm font-semibold tracking-tight text-slate-50">
                    Numerical Order
                  </span>
                </div>
                <CircleMinusIcon className="text-slate-50" size={20} />
              </div>
            </div>
          </div>
          {/** Body */}
          <div className="flex grow pb-[16px] pl-[16px] pt-[48px]">
            {/** Scrollbar Section */}
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
                      <Pokemon
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
          {/** Footer */}
          <div className="flex h-[48px] w-full border-t-[2px] border-yellow-300 bg-gradient-to-t from-slate-100 to-slate-200"></div>
        </div>
      </div>
    </main>
  );
}
