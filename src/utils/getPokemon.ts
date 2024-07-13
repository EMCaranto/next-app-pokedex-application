interface getPokemonProps {
  pageParams: number;
}

export const getPokemon = async ({ pageParams }: getPokemonProps) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pageParams}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  let filtered = await data.results.map((pokemon: {}, index: number) => {
    let paddedIndex =
      pageParams === 0
        ? ('' + (index + 1)).slice(-3)
        : '' + (index + 1 + pageParams);

    console.log('Padded Index: ' + paddedIndex);
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${paddedIndex}.png`;

    return {
      ...pokemon,
      imageUrl: image,
    };
  });

  return filtered;
};
