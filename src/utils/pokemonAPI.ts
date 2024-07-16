import { Pokemon } from '@/types/pokemon';

interface PokemonProps {
  pageParams: number;
  pageSize: number;
}

export const getPokemon = async ({
  pageParams,
  pageSize,
}: PokemonProps): Promise<Pokemon[]> => {
  const limit = pageSize;

  const offset = limit * pageParams;
  const maxOffset = 1025;

  let pokemon: Pokemon[] = [];

  if (offset >= maxOffset) {
    return pokemon;
  }

  const dynamicLimit = Math.min(limit, maxOffset - offset);

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${dynamicLimit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('An error occured on getPokemon');
  }

  const data = await response.json();

  const promises = data.results.map(
    async (pokemon: { name: string; url: string }) => {
      const responseDetail = await fetch(pokemon.url);
      const pokemonData = await responseDetail.json();

      return {
        name: pokemon.name,
        url: pokemon.url,
        imageUrl: pokemonData.sprites.front_default,
      };
    }
  );

  const batchPokemon = await Promise.all(promises);

  pokemon = pokemon.concat(batchPokemon);

  return pokemon;
};
