'use client';

import { RiasecType } from '@/lib/types';

type ImageAnswerProps = {
  imageUrl: string;
  text: string;
  riasecType: RiasecType;
  isSelected: boolean;
  onSelect: (type: RiasecType) => void;
  textColor?: string;
  variant?: 'icon' | 'full';
};

export default function ImageAnswer({
  imageUrl,
  text,
  riasecType,
  isSelected,
  onSelect,
  textColor = '#000000',
  variant = 'icon',
}: ImageAnswerProps) {
  return (
    <button
      onClick={() => onSelect(riasecType)}
      className={`
        relative
        ${variant === 'full' ? 'w-full h-[148px] sm:h-[172px] md:h-[182px]' : 'flex flex-col items-center justify-center gap-1 w-full min-h-[140px] sm:min-h-[160px] md:h-[182px] h-auto'}
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
      {variant === 'full' ? (
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt={text}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end">
            <p
              style={{ color: textColor }}
              className="w-full px-4 pb-2 text-left text-sm sm:text-base font-semibold leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              {text}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Image container */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-[104px] md:h-[104px] shrink-0">
            <img
              src={imageUrl}
              alt={text}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Text */}
          <div className="w-full shrink-0 px-4">
            <p 
              style={{ color: textColor }}
              className="text-center text-sm sm:text-base font-semibold leading-4"
            >
              {text}
            </p>
          </div>
        </>
      )}
    </button>
  );
}
