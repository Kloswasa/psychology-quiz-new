'use client';

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const clampedCurrent = Math.min(Math.max(current, 1), total);
  const dots = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-none">
      {/* Dot progress – 1 dot per question, with current number following active dot */}
      <div className="flex items-end gap-2">
        <div className="flex flex-1 justify-between">
          {dots.map((index) => {
            const isActive = index === clampedCurrent;
            const isCompleted = index < clampedCurrent;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-1"
              >
                 <span
                  className={`
                    text-[12px] leading-none text-white/90 drop-shadow-lg transition-opacity duration-200
                    ${isActive ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                  {index}
                </span>
                <div
                  className={`
                    h-2.5 w-2.5 rounded-full transition-all duration-300
                    ${isActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] scale-110' : ''}
                    ${isCompleted && !isActive ? 'bg-white/80' : ''}
                    ${!isCompleted && !isActive ? 'bg-white/30' : ''}
                  `}
                />
               
              </div>
            );
          })}
          <span className="text-xs text-white/70 drop-shadow-lg whitespace-nowrap">
          of {total}
        </span>
        </div>
        
      </div>
    </div>
  );
}