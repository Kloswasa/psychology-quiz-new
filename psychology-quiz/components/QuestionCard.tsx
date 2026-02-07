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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent sm:from-black/60 sm:via-black/30" />
      
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
                  ${isGrid ? 'min-h-[120px] sm:min-h-[140px]' : 'min-h-[56px] sm:min-h-[64px]'}
                  rounded-xl sm:rounded-2xl
                  p-4 sm:p-5
                  transition-all duration-200
                  active:scale-95
                  touch-manipulation
                  text-base sm:text-lg font-medium
                  ${isActive 
                    ? 'bg-blue-500 text-white shadow-lg ring-4 ring-blue-300' 
                    : 'bg-white/90 text-gray-800 hover:bg-white active:bg-blue-50'}
                `}
              >
                {/* Answer image (if present) */}
                {a.imageUrl && (
                  <img 
                    src={a.imageUrl} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                  />
                )}
                
                {/* Answer text */}
                <span className={`
                  relative z-10
                  ${a.imageUrl ? 'text-white drop-shadow-lg' : ''}
                  ${isGrid ? 'text-center block' : 'text-left'}
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

