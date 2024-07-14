import { Pokemon } from '@/types/pokemon';

interface getPokemonProps {
  pageParams: number;
  pageSize: number;
}

export const getPokemon = async ({
  pageParams,
  pageSize,
}: getPokemonProps): Promise<Pokemon[]> => {
  const limit = pageSize;

  const offset = pageParams * limit;
  const maxOffset = 1025;

  let pokemonDetail: Pokemon[] = [];

  if (offset >= maxOffset) {
    return pokemonDetail;
  }

  const adjustLimit = Math.min(limit, maxOffset - offset);

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${adjustLimit}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  const promises = data.results.map(
    async (pokemon: { name: string; url: string }) => {
      const detailRes = await fetch(pokemon.url);
      const detailData = await detailRes.json();

      return {
        name: pokemon.name,
        url: pokemon.url,
        imageUrl: detailData.sprites.front_default,
      };
    }
  );

  const batchPokemonDetail = await Promise.all(promises);

  pokemonDetail = pokemonDetail.concat(batchPokemonDetail);

  return pokemonDetail;
};
