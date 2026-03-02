'use client';

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;
  const isComplete = current === total;
  
  return (
    <div className="flex-1 max-w-xs sm:max-w-sm">
      {/* Label */}
      <div className="mb-2 flex justify-between items-center text-sm font-medium">
        <span className="text-white/90 drop-shadow-lg">{current}</span>
        <span className="text-white/60 drop-shadow-lg text-xs">of {total}</span>
      </div>
      
      {/* MD3 Expressive Wavy Linear Progress */}
      <div className="relative w-full">
        {/* Track */}
        <div 
          className="relative w-full rounded-full overflow-visible backdrop-blur-sm transition-all duration-300"
          style={{
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Progress indicator with wavy animation */}
          <div 
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{
              width: `${progress}%`,
              borderRadius: '9999px',
            }}
          >
            {/* Wavy gradient fill - use longhand to avoid conflict with backgroundSize */}
            <div
              className="absolute inset-0 animate-wave"
              style={{
                backgroundImage: isComplete
                  ? 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)' // Success gradient
                  : 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 25%, #d946ef 50%, #8b5cf6 75%, #6366f1 100%)', // Expressive wave gradient
                backgroundSize: '200% 100%',
                boxShadow: isComplete
                  ? '0 0 16px rgba(16, 185, 129, 0.6), 0 0 8px rgba(6, 182, 212, 0.4)' // Success glow
                  : '0 0 12px rgba(139, 92, 246, 0.5), 0 2px 8px rgba(139, 92, 246, 0.3)', // Primary glow
                animation: isComplete ? 'none' : 'wave 3s ease-in-out infinite',
              }}
            />
            
            {/* Top wave highlight */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 50%)',
                animation: isComplete ? 'none' : 'wave-flow 2s ease-in-out infinite',
              }}
            />
            
            {/* Leading edge with wave peak */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-80 animate-pulse-wave"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)',
                filter: 'blur(2px)',
              }}
            />
          </div>
          
          {/* Overflow glow effect */}
          <div 
            className="absolute top-0 left-0 h-full pointer-events-none"
            style={{
              width: `${Math.min(progress + 5, 100)}%`,
              background: 'linear-gradient(90deg, transparent 80%, rgba(139, 92, 246, 0.3) 100%)',
              filter: 'blur(8px)',
            }}
          />
        </div>
        
        {/* Completion celebration effect */}
        {isComplete && (
          <>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full" />
          </>
        )}
      </div>
    </div>
  );
}