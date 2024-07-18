import axios from 'axios';

import {
  PokeAPIProps,
  PokeAPIResponseProps,
  PokemonProps,
} from '@/types/pokemon';

const fetchPokemonList = async (
  limit: number,
  offset: number
): Promise<{ results: PokeAPIProps[]; count: number }> => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: limit,
        offset: offset,
      },
    });

    return {
      results: response.data.results,
      count: response.data.count,
    };
  } catch (error) {
    console.error('An error occured on fetchPokemonList', error);
    throw error;
  }
};

const fetchPokemonData = async (pokemonUrl: string): Promise<PokemonProps> => {
  try {
    const response = await axios.get(pokemonUrl);

    const pokemonData: PokemonProps = {
      id: response.data.id,
      name: response.data.name,
      sprites: response.data.sprites.front_default,
      types: response.data.types.map(
        (poke_types: { type: { name: string } }) => poke_types.type.name
      ),
    };

    return pokemonData;
  } catch (error) {
    console.error('An error occured on fetchPokemonData', error);
    throw error;
  }
};

export const getPokemon = async (): Promise<PokeAPIResponseProps> => {
  const maxOffset = 1025;

  const pokemonListData = await fetchPokemonList(maxOffset, 0);
  const totalCount = pokemonListData.count;

  const promises = pokemonListData.results.map(
    async (pokemon: PokeAPIProps) => {
      const pokemonData = await fetchPokemonData(pokemon.url);

      return {
        url: pokemon.url,
        ...pokemonData,
      };
    }
  );

  const pokemon = await Promise.all(promises);

  return { pokemon, totalCount };
};
