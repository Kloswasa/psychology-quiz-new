'use client';
import { RiasecType } from '@/lib/types';
import ImageAnswer from './ImageAnswer';
import { motion } from 'framer-motion';

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
  // Image layouts
  const isImageGrid = hasImages && answerCount === 4;
  const isImageListFive = hasImages && answerCount === 5;

  // Auto-determine layout for text-only answers:
  // 2x2 grid for 4 answers, list for 5 answers
  const isGrid = !hasImages && answerCount === 4;
  
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      };

  return (
    <div className="relative h-full min-h-0 w-full">
      {/* Background fills the card container */}
      <motion.div
        className="absolute inset-0 z-0 w-full bg-no-repeat bg-cover bg-center"
        style={bgStyle}
        aria-hidden
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      {/* Content pinned to bottom – flex column so answers fill remaining space */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col gap-3 w-full max-h-[85vh] overflow-hidden p-4 pb-safe">
        {/* Question text */}
        <motion.h2
          style={{ 
            color: getTextColor(questionIndex),
            fontFamily: 'var(--font-bitter), sans-serif',
            fontWeight: '800',
          }}
          className="shrink-0 text-lg font-bold leading-tight drop-shadow-lg text-center w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.35 }}
        >
          {questionText}
        </motion.h2>
        
        {/* Answers – flex-1 so it fills the remaining vertical space */}
        <motion.div
          className="flex-1 min-h-0 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.7 }}
        >
        {isImageGrid ? (
          // Image-based answers (2x2 grid layout – used for 4 image answers)
          <div className="grid grid-cols-2 gap-2 sm:gap-3 justify-items-center h-full">
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
        ) : isImageListFive ? (
          // Full-image answers in a 5-answer vertical list – each button stretches equally
          <div className="flex flex-col gap-2 h-full">
            {answers.map((a) => {
              const isActive = selected === a.riasecType;
              const isGif = a.imageUrl?.toLowerCase().endsWith('.gif') ?? false;
              const staticUrl = isGif ? a.imageUrl!.replace(/\.gif$/i, '.webp') : a.imageUrl!;
              const displaySrc = isActive && isGif ? a.imageUrl! : staticUrl;
              return (
                <button
                  key={a.id}
                  onClick={() => onSelect(a.riasecType)}
                  className={`
                    flex-1 min-h-0
                    relative overflow-hidden
                    rounded-2xl
                    transition-all duration-300
                    active:scale-95
                    touch-manipulation
                    group
                    ${isActive 
                      ? 'ring-2 ring-white/70 shadow-2xl' 
                      : 'shadow-lg'}
                  `}
                  aria-label={a.text}
                >
                  {/* Full-bleed image fills the answer card */}
                  <img
                    src={displaySrc}
                    alt={a.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      if (!isActive && isGif && staticUrl !== a.imageUrl) {
                        (e.currentTarget as HTMLImageElement).src = a.imageUrl!;
                      }
                    }}
                  />

                  {/* Overlay to keep consistency with other answers */}
                  <div
                    className={`
                      absolute inset-0
                      ${isActive ? 'bg-black/10' : 'bg-black/0 group-hover:bg-black/10'}
                    `}
                  />
                </button>
              );
            })}
          </div>
        ) : (
          // Text-only answers (original layout)
          <div className={`
            ${isGrid
              ? 'grid grid-cols-2 gap-2 sm:gap-3 h-full'
              : 'flex flex-col gap-2 h-full'}
          `}>
            {answers.map((a) => {
              const isActive = selected === a.riasecType;
              return (
                <button
                  key={a.id}
                  onClick={() => onSelect(a.riasecType)}
                  className={`
                    relative overflow-hidden
                    ${isGrid ? 'min-h-[80px]' : 'flex-1 min-h-0'}
                    rounded-2xl
                    p-3
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
                      text-base font-medium
                      font-semibold
                    `}>
                    {a.text}
                  </span>
                </button>
              );
            })}
          </div>
        )}
        </motion.div>
      </div>
    </div>
  );
}
