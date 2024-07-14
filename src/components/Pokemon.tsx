/* eslint-disable @next/next/no-img-element */

import React from 'react';

interface PokemonProps {
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
}

export const Pokemon = ({ name, image, innerRef }: PokemonProps) => {
  return (
    <div ref={innerRef}>
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
};
