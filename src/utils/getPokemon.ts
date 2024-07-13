import { Pokemon } from '@/types/pokemon';

interface getPokemonProps {
  pageParams: number;
}

export const getPokemon = async ({
  pageParams,
}: getPokemonProps): Promise<Pokemon[]> => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageParams}`
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
        imageUrl: detailData.sprites.other['official-artwork'].front_default,
      };
    }
  );

  const pokemonDetail = await Promise.all(promises);

  return pokemonDetail;
};
