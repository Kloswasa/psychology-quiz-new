'use client';

import { RiasecType } from '@/lib/types';
import { useEffect, useState } from 'react';

type ImageAnswerProps = {
  imageUrl: string;
  text: string;
  riasecType: RiasecType;
  isSelected: boolean;
  onSelect: (type: RiasecType) => void;
  textColor?: string;
};

export default function ImageAnswer({
  imageUrl,
  text,
  riasecType,
  isSelected,
  onSelect,
  textColor = '#000000',
}: ImageAnswerProps) {
  const isGif = imageUrl.toLowerCase().endsWith('.gif');
  const staticUrl = isGif ? imageUrl.replace(/\.gif$/i, '.png') : imageUrl;

  const [useGif, setUseGif] = useState(isSelected && isGif);

  useEffect(() => {
    setUseGif(isSelected && isGif);
  }, [isSelected, isGif]);

  const displaySrc = useGif ? imageUrl : staticUrl;

  return (
    <button
      onClick={() => onSelect(riasecType)}
      className={`
        relative flex flex-col items-center justify-center
        gap-1
w-full min-h-[140px] sm:min-h-[160px] md:h-[182px] h-auto        rounded-2xl
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
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-[104px] md:h-[104px] shrink-0">
        <img
          src={displaySrc}
          alt={text}
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            // If static placeholder is missing, fall back to GIF
            if (!useGif && staticUrl !== imageUrl) {
              (e.currentTarget as HTMLImageElement).src = imageUrl;
            }
          }}
        />
      </div>

      {/* Text */}
      <div className="w-full  shrink-0 px-4">
        <p 
          style={{ color: textColor }}
          className="text-center text-sm sm:text-base font-semibold leading-4"
        >
          {text}
        </p>
      </div>
    </button>
  );
}
