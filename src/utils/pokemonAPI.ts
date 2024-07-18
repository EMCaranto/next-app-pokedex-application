interface PokeAPIProps {
  // This are inside the "pokemon.data.results"

  url: string;
}

interface PokemonProps {
  // This are inside the "pokemon.data.results.url"

  id: number;
  name: string;
  sprites: string;
  types: string[];
}

interface PokeAPIResponseProps {
  // This are inside the "pokemon.data"

  pokemon: (PokeAPIProps & PokemonProps)[];
  totalCount: number;
}

interface PokemonListProps {
  pageParams: number;
  pageSize: number;
}

// Fetch Pokémon list from the API
const fetchPokemonList = async (
  limit: number,
  offset: number
): Promise<{ results: PokeAPIProps[]; count: number }> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    console.log('An error occured in the fetchPokemonList');
  }

  return response.json();
};

const fetchPokemonData = async (pokemonUrl: string): Promise<PokemonProps> => {
  const response = await fetch(pokemonUrl);

  if (!response.ok) {
    console.log('An error occured in the fetchPokemonData');
  }

  const pokemonData = await response.json();

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    sprites: pokemonData.sprites.front_default,
    types: pokemonData.types.map(
      (poke_types: { type: { name: string } }) => poke_types.type.name
    ),
  };
};

export const getPokemon = async ({
  pageParams,
  pageSize,
}: PokemonListProps): Promise<PokeAPIResponseProps> => {
  const limit = pageSize;

  const offset = Math.floor(pageParams) * limit;
  const maxOffset = 151; // 1025 up to gen 9 Pokemon

  if (offset >= maxOffset) {
    return { pokemon: [], totalCount: maxOffset };
  }

  const dynamicLimit = Math.min(limit, maxOffset - offset);

  const pokemonListData = await fetchPokemonList(dynamicLimit, offset);
  const totalCount = pokemonListData.count;

  const promises = pokemonListData.results.map(
    async (pokemon: PokeAPIProps) => {
      const pokemonData = await fetchPokemonData(pokemon.url);

      return {
        // Pokémon List data
        url: pokemon.url,

        // Pokémon Url data
        ...pokemonData,
      };
    }
  );

  const pokemon = await Promise.all(promises);

  return { pokemon, totalCount };
};
