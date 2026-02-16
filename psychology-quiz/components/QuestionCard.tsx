'use client';

import { RiasecType } from '@/lib/types';

type AnswerOption = {
  id: string;
  text: string;
  riasecType: RiasecType;
  imageUrl?: string;
};

type Props = {
  questionIndex: number;
  questionText: string;
  backgroundImage?: string;
  answers: AnswerOption[];
  selected: RiasecType | null;
  onSelect: (type: RiasecType) => void;
};

export default function QuestionCard({
  questionIndex,
  questionText,
  backgroundImage,
  answers,
  selected,
  onSelect,
}: Props) {
  // Determine if any answers have images
  const hasImages = answers.some(a => a.imageUrl);
  const answerCount = answers.length;
  
  // Auto-determine layout: 2x2 grid for 4 answers, list for 5 answers
  const isGrid = answerCount === 4;
  
  return (
    <div 
      className="relative min-h-screen w-full flex flex-col justify-end p-4 pb-safe sm:min-h-[600px] sm:rounded-2xl sm:overflow-hidden"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient overlay for text readability */}
      {/*<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent sm:from-black/60 sm:via-black/30" />
      
      {/* Content */}
      <div className="relative z-10 space-y-4 sm:space-y-6 max-w-2xl mx-auto w-full">
        {/* Question text */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-lg">
          {questionText}
        </h2>
        
        {/* Answers - dynamic layout based on count */}
        <div className={`
          ${isGrid ? 'grid grid-cols-2 gap-3 sm:gap-4' : 'flex flex-col gap-3'}
        `}>
          {answers.map((a) => {
            const isActive = selected === a.riasecType;
            return (
              <button
                key={a.id}
                onClick={() => onSelect(a.riasecType)}
                className={`
                  relative overflow-hidden
                  ${isGrid ? 'min-h-[140px] sm:min-h-[156px]' : 'min-h-[76px] sm:min-h-[84px]'}
                  rounded-2xl sm:rounded-3xl
                  p-4 sm:p-5
                  transition-all duration-300
                  active:scale-95
                  touch-manipulation
                  text-base sm:text-lg font-medium
                  group
                  ${isActive 
                    ? 'backdrop-blur-md bg-white/30 border-2 border-white/60 shadow-2xl ring-2 ring-white/50' 
                    : 'backdrop-blur-sm bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 shadow-lg'}
                `}
                style={{
                  backdropFilter: isActive ? 'blur(12px) saturate(180%)' : 'blur(8px) saturate(150%)',
                  WebkitBackdropFilter: isActive ? 'blur(12px) saturate(180%)' : 'blur(8px) saturate(150%)',
                }}
              >
                {/* Answer image (if present) */}
                {a.imageUrl && (
                  <img 
                    src={a.imageUrl} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                  />
                )}
                
                {/* Glassmorphic overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                
                {/* Answer text */}
                <span className={`
                  relative z-10
                  text-white drop-shadow-lg
                  ${isGrid ? 'text-center block' : 'text-left'}
                  font-semibold
                `}>
                  {a.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

