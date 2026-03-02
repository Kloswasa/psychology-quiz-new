'use client';

import { RiasecType } from '@/lib/types';

type ImageAnswerProps = {
  imageUrl: string;
  text: string;
  riasecType: RiasecType;
  isSelected: boolean;
  onSelect: (type: RiasecType) => void;
  textColor?: string;
  /**
   * default: icon + label layout (used by other questions)
   * full: image fills the whole card with no text (used by Q9)
   */
  variant?: 'default' | 'full';
};

export default function ImageAnswer({
  imageUrl,
  text,
  riasecType,
  isSelected,
  onSelect,
  textColor = '#000000',
  variant = 'default',
}: ImageAnswerProps) {
  const isFullImage = variant === 'full';

  return (
    <button
      onClick={() => onSelect(riasecType)}
      className={`
        relative flex items-center justify-center
        ${isFullImage ? '' : 'flex-col gap-1'}
        w-full min-h-[140px] sm:min-h-[160px] md:h-[182px] h-auto
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
      {isFullImage ? (
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt={text}
            className="w-full h-full object-cover"
          />
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
