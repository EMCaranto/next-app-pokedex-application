/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';

interface PokemonProps {
  name: string;

  id: number;
  sprites: string;
  types: string[];

  innerRef?: (node?: Element | null | undefined) => void;
}

export const Pokemon = ({
  name,
  id,
  sprites,
  types,
  innerRef,
}: PokemonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className="w-[50px] rounded bg-white py-[8px] shadow-md"
        ref={innerRef}
        onClick={handleOpenModal}
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

      {isOpen && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-4">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm">ID: {id}</p>
            <p className="text-sm">Types: {types.join(', ')}</p>
            <button
              className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
