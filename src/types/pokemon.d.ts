// pokemon.data
export interface PokeAPIResponseProps {
  pokemon: (PokeAPIProps & PokemonProps)[];
  totalCount: number;
}

// pokemon.data.results
export interface PokeAPIProps {
  url: string;
}

// pokemon.data.results.url
export interface PokemonProps {
  id: number;
  name: string;
  sprites: string;
  types: string[];
}

export interface PokemonListProps {
  pageParams: number;
  pageSize: number;
}
