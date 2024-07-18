import React from 'react';
import Image from 'next/image';

import { ArrowUpAZIcon, CircleMinusIcon } from 'lucide-react';

import PokeballLogo from '@/icons/png/pokeball.png';

interface LowerNavbarProps {
  totalPokemon: number;
}

export const LowerNavbar = ({ totalPokemon }: LowerNavbarProps) => {
  return (
    <div className="flex h-[48px] w-full items-center justify-between bg-slate-700 px-[16px]">
      <div className="flex items-center justify-start gap-x-[8px]">
        <Image
          src={PokeballLogo}
          alt="pokeball-logo"
          height={24}
          width={24}
          priority
        />
        <span className="text-sm font-semibold tracking-tight text-slate-50">
          {totalPokemon}
        </span>
        <div className="ml-[16px] h-[20px] w-[2px] rounded-full bg-slate-500"></div>
      </div>
      <div className="flex items-center">
        <div className="ml-[16px] h-[20px] w-[2px] rounded-full bg-slate-500"></div>
        <div className="flex items-center">
          <div className="flex h-[16px] w-[300px] items-center gap-x-[8px] px-[16px]">
            <ArrowUpAZIcon className="text-slate-50" size={20} />
            <span className="text-sm font-semibold tracking-tight text-slate-50">
              Numerical Order
            </span>
          </div>
          <CircleMinusIcon className="text-slate-50" size={20} />
        </div>
      </div>
    </div>
  );
};
