'use client';

import { RiasecType } from '@/lib/types';
import ImageAnswer from './ImageAnswer';

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
  // Get text color based on question index
  const getTextColor = (questionIndex: number) => {
    const colors = [
      '#212a37', // Q1: White
      '#ffffff', // Q2: Amber
      '#212a37', // Q3: Red
      '#212a37', // Q4: Green
      '#ffffff', // Q5: Blue
      '#212a37', // Q6: Purple
      '#ffffff', // Q7: Orange
      '#ffffff ', // Q8: Cyan
      '#ffffff', // Q9: Violet
      '#212a37', // Q10: Pink
    ];
    return colors[questionIndex] || '#ffffff';
  };

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
        <h2 
          style={{ color: getTextColor(questionIndex) }}
          className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-lg"
        >
          {questionText}
        </h2>
        
        {/* Answers - dynamic layout based on count */}
        {hasImages ? (
          // Image-based answers (2x2 grid layout)
          <div className="grid grid-cols-2 gap-3 sm:gap-4 justify-items-center">
            {answers.map((a) => (
              <ImageAnswer
                key={a.id}
                imageUrl={a.imageUrl!}
                text={a.text}
                riasecType={a.riasecType}
                isSelected={selected === a.riasecType}
                onSelect={onSelect}
                textColor={getTextColor(questionIndex)}
              />
            ))}
          </div>
        ) : (
          // Text-only answers (original layout)
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
                    ${isGrid ? 'min-h-[140px] sm:min-h-[156px]' : 'min-h-[64x] sm:min-h-[64px]'}
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
                  {/* Glassmorphic overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                  
                  {/* Answer text */}
                  <span 
                    style={{ color: getTextColor(questionIndex) }}
                    className={`
                      relative z-10
                      drop-shadow-lg
                      ${isGrid ? 'text-center block' : 'text-left'}
                      font-semibold
                    `}>
                    {a.text}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

