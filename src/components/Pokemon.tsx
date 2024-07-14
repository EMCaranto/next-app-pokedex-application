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
      <Image
        className="h-auto w-auto"
        src={image}
        height={64}
        width={64}
        alt={name}
        priority
      />
      <p>{name}</p>
    </div>
  );
};
