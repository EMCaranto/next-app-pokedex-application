import React from 'react';
import Image from 'next/image';

import PokedexLogo from '@/icons/svg/pokedex.svg';

export const UpperNavbar = () => {
  return (
    <div className="flex h-[64px] w-full items-center justify-between border-b-[2px] border-yellow-300 bg-gradient-to-b from-slate-100 to-slate-200 px-[24px]">
      <div className="flex items-center justify-start gap-x-[8px]">
        <Image
          src={PokedexLogo}
          alt="pokedex-logo"
          height={40}
          width={40}
          priority
        />
        <span className="text-lg font-semibold text-slate-900">Pokédex</span>
      </div>
      <div>
        <div className="h-[24px] w-[48px] rounded-[12px] bg-slate-500"></div>
      </div>
    </div>
  );
};
