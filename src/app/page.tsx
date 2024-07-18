'use client';

import React, { useEffect, useState } from 'react';

import { Footer } from '@/components/Footer';
import { LowerNavbar } from '@/components/LowerNavbar';
import { PokemonCard } from '@/components/PokemonCard';
import { SortOption } from '@/components/SortOption';
import { UpperNavbar } from '@/components/UpperNavbar';

import { useCustomScrollbar } from '@/hooks/useCustomScrollbar';

import { PokemonProps } from '@/types/pokemon';

import { getPokemon } from '@/utils/pokemonAPI';

export default function HomePage() {
  const { childRef, parentRef, thumbRef } = useCustomScrollbar();

  const [sortCriteria, setSortCriteria] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<string>('asc');

  const [pokemonData, setPokemonData] = useState<PokemonProps[]>([]);
  const [totalPokemon, setTotalPokemon] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const { pokemon, totalCount } = await getPokemon();

      setPokemonData(pokemon);
      setTotalPokemon(totalCount);
    }

    fetchData();
  }, []);

  const handleSortChange = (criteria: string, order: string) => {
    setSortCriteria(criteria);
    setSortOrder(order);
  };

  const sortedPokemon = pokemonData.sort((a, b) => {
    if (sortCriteria === 'id') {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    } else {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  return (
    <main className="h-full w-full">
      <div className="flex h-full w-full items-center justify-center bg-slate-900 px-4">
        <div className="flex h-full max-h-[512px] w-full max-w-[1280px] flex-col overflow-hidden rounded-[16px] bg-slate-100">
          <UpperNavbar />
          <LowerNavbar totalPokemon={totalPokemon} />
          <SortOption onSortChange={handleSortChange} />
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
                  {sortedPokemon.map((pokemon, pokemonIndex) => (
                    <PokemonCard
                      key={pokemon.name}
                      id={pokemon.id}
                      sprites={pokemon.sprites}
                      types={pokemon.types}
                      name={pokemon.name}
                    />
                  ))}
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
