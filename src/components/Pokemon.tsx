/* eslint-disable @next/next/no-img-element */

import React from 'react';

interface PokemonProps {
  name: string;

  id: number;
  sprites: string;

  innerRef?: (node?: Element | null | undefined) => void;
}

export const Pokemon = ({ name, id, sprites, innerRef }: PokemonProps) => {
  return (
    <div
      className="w-[50px] rounded bg-white py-[8px] shadow-md"
      ref={innerRef}
    >
      <div className="flex h-full w-full flex-col gap-[16px]">
        <div className="h-[50px] max-h-[50px] w-[50px] max-w-[50px]">
          <img src={sprites} alt={name} />
        </div>
        <div className="h-full w-full">
          <div className="rotate-90 pl-[24px]">
            <p className="text-sm font-semibold capitalize tracking-wide text-slate-900">
              {name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-sm font-semibold tracking-tight text-slate-900">
            {id}
          </span>
        </div>
      </div>
    </div>
  );
};
