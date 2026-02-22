'use client';

import Image from 'next/image';
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
      '#212a37', // Q1: Oxford Blue
      '#ffffff', // Q2: White
      '#212a37', // Q3: Oxford Blue
      '#212a37', // Q4: Oxford Blue
      '#ffffff', // Q5: White
      '#212a37', // Q6: Oxford Blue
      '#ffffff', // Q7: White
      '#ffffff ', // Q8: White
      '#ffffff', // Q9: White
      '#212a37', // Q10: Oxford Blue
    ];
    return colors[questionIndex] || '#ffffff';
  };

  // Determine if any answers have images
  const hasImages = answers.some(a => a.imageUrl);
  const answerCount = answers.length;
  
  // Auto-determine layout: 2x2 grid for 4 answers, list for 5 answers
  const isGrid = answerCount === 4;
  
  const bgStyle = !backgroundImage
    ? { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
    : undefined;

  return (
    <div className="relative h-full min-h-0 w-full rounded-2xl">
      {/* Full-viewport background – fixed so image always shows full height */}
      <div
        className="fixed inset-0 z-0 w-full"
        style={bgStyle}
        aria-hidden
      >
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        )}
      </div>
      {/* Content pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 space-y-4 w-full max-h-[85vh] overflow-y-auto p-4 pb-safe">
        {/* Question text */}
        <h2 
          style={{ color: getTextColor(questionIndex) }}
          className="text-xl font-bold leading-tight drop-shadow-lg"
        >
          {questionText}
        </h2>
        
        {/* Answers - dynamic layout based on count */}
        {hasImages ? (
          // Image-based answers (2x2 grid layout)
          <div className="grid grid-cols-2 gap-3 justify-items-center">
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
            ${isGrid ? 'grid grid-cols-2 gap-3' : 'flex flex-col gap-3'}
          `}>
            {answers.map((a) => {
              const isActive = selected === a.riasecType;
              return (
                <button
                  key={a.id}
                  onClick={() => onSelect(a.riasecType)}
                  className={`
                    relative overflow-hidden
                    ${isGrid ? 'min-h-[120px]' : 'min-h-[48px]'}
                    rounded-2xl
                    p-4
                    transition-all duration-300
                    active:scale-95
                    touch-manipulation
                    text-base font-medium
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

