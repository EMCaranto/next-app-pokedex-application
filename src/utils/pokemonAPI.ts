import { Pokemon } from '@/types/pokemon';

interface PokemonProps {
  pageParams: number;
  pageSize: number;
}

interface PokemonResponse {
  pokemon: Pokemon[];
  totalCount: number;
}

export const getPokemon = async ({
  pageParams,
  pageSize,
}: PokemonProps): Promise<PokemonResponse> => {
  const limit = pageSize;

  const offset = limit * pageParams;
  const maxOffset = 1025;

  let pokemon: Pokemon[] = [];

  if (offset >= maxOffset) {
    return { pokemon, totalCount: maxOffset };
  }

  const dynamicLimit = Math.min(limit, maxOffset - offset);

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${dynamicLimit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error('An error occured on getPokemon');
  }

  const data = await response.json();
  const totalCount = data.count;

  const promises = data.results.map(
    async (pokemon: { name: string; url: string }) => {
      // this will fetch the pokemon url
      const pokemonUrl = await fetch(pokemon.url);

      // this will fetch the pokemon details
      const pokemonData = await pokemonUrl.json();

      return {
        name: pokemon.name,
        url: pokemon.url,

        // pokemon url data
        id: pokemonData.id,
        sprites: pokemonData.sprites.front_default,
        types: pokemonData.types.map(
          (type: { type: { name: string } }) => type.type.name
        ),
      };
    }
  );

  const batchPokemon = await Promise.all(promises);

  pokemon = pokemon.concat(batchPokemon);

  return { pokemon, totalCount };
};
