'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SoundToggleButton } from '@/components/SoundToggleButton';

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  visible: (rotate: number) => ({
    opacity: 1,
    x: 0,
    rotate,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  }),
};

type IntroPage1Props = { isActive?: boolean };

export function IntroPage1({ isActive = false }: IntroPage1Props) {
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;

    const handleScroll = () => {
      setShowSwipeHint(false);
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    timeoutId = window.setTimeout(() => {
      setShowSwipeHint(true);
    }, 3000);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSwipeHintClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    setShowSwipeHint(false);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] px-6 py-8 overflow-y-auto">
      {/* Sound toggle – glassmorphic, top right */}
      <SoundToggleButton className="absolute right-3 top-3 z-30" />
      {/* Upper card – stacked, centered */}
      <motion.div
        className="w-full max-w-[280px] rounded-2xl bg-[#faf8f5] shadow-lg p-6 py-6 sm:p-10 mb-6"
        initial="hiddenLeft"
        animate={isActive ? 'visible' : 'hiddenLeft'}
        variants={cardVariants}
        custom={2}
      >
        <h2
          className="text-2xl font-bold text-[#0088ff] text-center pb-1"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}
        >
          HI, HOW ARE YOU!
        </h2>
        <p className="text-sm text-black  text-center">
          Welcome to the travel personality quiz, designed by our team{' '}
          <img src="intro/visionverse-logo.png" alt="Visionverse team" className="w-24 h-14 mx-auto my-2 rounded-xl" />
         to make your next travel to Australia become easier than ever!
        </p>
      </motion.div>

      {/* Lower card – continues below upper, centered */}
      <motion.div
        className="w-full max-w-[260px] -mt6 rounded-2xl bg-[#FFF9D9] p-4 sm:p-7 md:p-10 shadow-lg max-h-[55vh] overflow-y-auto"
        initial="hiddenRight"
        animate={isActive ? 'visible' : 'hiddenRight'}
        variants={cardVariants}
        custom={-2}
        transition={{ duration: 0.5, ease: 'easeOut' as const, delay: isActive ? 0.2 : 0 }}
      >
       <p className="font-bold text-[#0088ff] text-2xl text-center mb-2"
       style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}> 
       Holland model (RIASEC) </p>

       <p className="text-sm text-black text-center">
       is used in this quiz, showing how people explore the world in six personalities.   
        </p>
          <div className="mt-2  flex justify-center">
          <motion.div
            animate={
              isActive
                ? {
                    rotate: [0, 60, 60, 120, 120, 180, 180, 240, 240, 300, 300, 360],
                  }
                : { rotate: 0 }
            }
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 12,
                times: [0, 0.02, 0.186, 0.206, 0.372, 0.392, 0.558, 0.578, 0.744, 0.764, 0.93, 0.95, 1],
                ease: 'linear',
              },
            }}
            className="inline-block"
          >
            <img
              src="/intro/Hex.png"
              alt="RIASEC"
              className="w-16 h-16   object-contain"
            />
          </motion.div>
        </div>
        
       
        {/* <p className="text-sm text-[#0088ff] font-medium mt-2 text-center"
        style={{ fontFamily: 'var(--font-bitter), sans-serif', fontWeight: '800' }}>
          Your result will help you find the best travel experiences!
        </p> */}
      </motion.div>

      {showSwipeHint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-[430px]">
            <button
              type="button"
              onClick={handleSwipeHintClick}
              className="w-full rounded-2xl bg-gradient-to-t from-transparent via-black/50 to-transparent py-6 text-center text-sm font-semibold tracking-wide text-white animate-bounce"
            >
              Swipe left for more introduction
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
