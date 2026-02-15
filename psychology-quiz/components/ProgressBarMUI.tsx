'use client';

import { LinearProgress, styled } from '@mui/material';
import { keyframes } from '@emotion/react';

// Wavy gradient animation
const waveAnimation = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

// Pulsing glow animation
const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 12px rgba(139, 92, 246, 0.5), 0 2px 8px rgba(139, 92, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.7), 0 2px 12px rgba(139, 92, 246, 0.5);
  }
`;

// Custom styled MUI Linear Progress with MD3 Expressive design
const StyledLinearProgress = styled(LinearProgress)<{ isComplete?: boolean }>(({ isComplete }) => ({
  height: 8,
  borderRadius: '9999px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  
  '& .MuiLinearProgress-bar': {
    borderRadius: '9999px',
    background: isComplete
      ? 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)'
      : 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 25%, #d946ef 50%, #8b5cf6 75%, #6366f1 100%)',
    backgroundSize: '200% 100%',
    animation: isComplete ? 'none' : `${waveAnimation} 3s ease-in-out infinite, ${glowPulse} 2s ease-in-out infinite`,
    boxShadow: isComplete
      ? '0 0 16px rgba(16, 185, 129, 0.6), 0 0 8px rgba(6, 182, 212, 0.4)'
      : '0 0 12px rgba(139, 92, 246, 0.5), 0 2px 8px rgba(139, 92, 246, 0.3)',
    transition: 'width 700ms ease-in-out',
    
    // Leading edge highlight
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)',
      filter: 'blur(2px)',
      opacity: 0.8,
    },
  },
}));

export default function ProgressBarMUI({ current, total }: { current: number; total: number }) {
  const progress = (current / total) * 100;
  const isComplete = current === total;
  
  // Debug logging
  console.log('ProgressBarMUI:', { current, total, progress, isComplete });
  
  return (
    <div className="flex-1 max-w-xs sm:max-w-sm">
      {/* Label */}
      <div className="mb-2 flex justify-between items-center text-sm font-medium">
        <span className="text-white/90 drop-shadow-lg">{current}</span>
        <span className="text-white/60 drop-shadow-lg text-xs">of {total}</span>
      </div>
      
      {/* MUI MD3 Expressive Linear Progress */}
      <div className="relative">
        <StyledLinearProgress 
          variant="determinate" 
          value={progress}
          isComplete={isComplete}
        />
        
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
