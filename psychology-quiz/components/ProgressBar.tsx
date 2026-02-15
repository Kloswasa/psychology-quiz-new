'use client';

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;
  const isComplete = current === total;
  
  return (
    <div className="w-full max-w-md">
      {/* Label */}
      <div className="mb-2 flex justify-between items-center text-sm font-medium">
        <span className="text-white/90 drop-shadow-lg">{current}</span>
        <span className="text-white/60 drop-shadow-lg text-xs">of {total}</span>
      </div>
      
      {/* MD3 Expressive Linear Progress */}
      <div className="relative w-full">
        {/* Track */}
        <div 
          className="relative w-full rounded-full overflow-hidden backdrop-blur-sm transition-all duration-300"
          style={{
            height: isComplete ? '6px' : '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Progress indicator with expressive animation */}
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-in-out"
            style={{
              width: `${progress}%`,
              background: isComplete 
                ? 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)' // Success gradient
                : 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)', // Primary expressive gradient
              boxShadow: isComplete 
                ? '0 0 12px rgba(16, 185, 129, 0.6)' // Success glow
                : '0 2px 8px rgba(139, 92, 246, 0.4)', // Primary elevation
              transform: 'translateZ(0)',
            }}
          >
            {/* Active indicator - moving shimmer */}
            {!isComplete && (
              <div 
                className="absolute inset-0 animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                  backgroundSize: '200% 100%',
                }}
              />
            )}
            
            {/* Leading edge highlight */}
            <div 
              className="absolute right-0 top-0 h-full w-8 opacity-60"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 100%)',
              }}
            />
          </div>
        </div>
        
        {/* Completion celebration effect */}
        {isComplete && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
        )}
      </div>
    </div>
  );
}