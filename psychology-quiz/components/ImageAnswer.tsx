'use client';

import { RiasecType } from '@/lib/types';

type ImageAnswerProps = {
  imageUrl: string;
  text: string;
  riasecType: RiasecType;
  isSelected: boolean;
  onSelect: (type: RiasecType) => void;
};

export default function ImageAnswer({
  imageUrl,
  text,
  riasecType,
  isSelected,
  onSelect,
}: ImageAnswerProps) {
  return (
    <button
      onClick={() => onSelect(riasecType)}
      className={`
        relative flex flex-col items-center justify-center
        gap-1
        w-full h-[182px]
        rounded-2xl
        bg-white
        shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]
        transition-all duration-300
        active:scale-95
        touch-manipulation
        ${isSelected 
          ? 'ring-2 ring-blue-500 shadow-2xl' 
          : 'hover:shadow-xl'}
      `}
    >
      {/* Image container */}
      <div className="relative w-[104px] h-[104px] shrink-0">
        <img
          src={imageUrl}
          alt={text}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Text */}
      <div className="w-full  shrink-0 px-4">
        <p className="text-center text-black text-base font-semibold leading-4">
          {text}
        </p>
      </div>
    </button>
  );
}
