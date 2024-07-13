import React from 'react';
import Image from 'next/image';

interface PokemonProps {
  name: string;
  image: string;
  innerRef?: (node?: Element | null | undefined) => void;
}

export const Pokemon = ({ name, image, innerRef }: PokemonProps) => {
  return (
    <div ref={innerRef}>
      <Image src={image} height={100} width={100} alt={name} priority />
      <p>{name}</p>
    </div>
  );
};
