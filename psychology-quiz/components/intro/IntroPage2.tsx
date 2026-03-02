'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  visible: (rotate: number) => ({
    opacity: 1,
    x: 0,
    rotate,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  }),
};


type IntroPage2Props = { isActive?: boolean };

export function IntroPage2({ isActive = false }: IntroPage2Props) {
  const [hasImageShown, setHasImageShown] = useState(false);

  useEffect(() => {
    if (isActive && !hasImageShown) {
      const t = setTimeout(() => setHasImageShown(true), 900);
      return () => clearTimeout(t);
    }
  }, [isActive, hasImageShown]);

  return (
    <div className="flex flex-col min-h-full px-10 py-6 overflow-y-auto items-center justify-center">
      {/* Blue block – How to play */}
      <motion.div
        className="w-full  bg-[#0088ff] p-6 pb-8 text-white"
        initial="hiddenLeft"
        animate={isActive ? 'visible' : 'hiddenLeft'}
        variants={cardVariants}
        custom={-3}
      >
        <h2
          className="text-2xl font-bold mb-3 text-center"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}
        >
          HOW TO PLAY?
        </h2>
        <p className="text-center text-sm mb-6">
          &ldquo;Simply through <br/> multiple choices quiz&rdquo;
        </p>
        <div className="flex justify-center gap-8">
          {/* Left: vertical options + one selected (orange) */}
          <div className="flex items-center gap-2">
            <img src="/intro/instruct1.png" alt="Arrow up" className="w-25 h-27" />
            <img src="/intro/instruct2.png" alt="Arrow up" className="w-24 h-28" />
          </div>
          
        </div>
      </motion.div>

      {/* Orange block – be yourself */}
      <motion.div
        className="w-full  bg-[#FFB200] mt-12 pt-6 px-6 pb-8 relative"
        initial="hiddenRight"
        animate={isActive ? 'visible' : 'hiddenRight'}
        variants={cardVariants}
        custom={8}
        transition={{ duration: 0.5, ease: 'easeOut' as const, delay: isActive ? 0.2 : 0 }}
      >
        <p className="text-white text-center text-sm mt-6 " >
          It is the golden rule to play this quiz, more intuition you use, the best
          result it be.
        </p>
        <motion.img
          src="/intro/buself.png"
          alt="Be yourself"
          className="absolute -top-8 left-1/2"
          style={{ transform: 'translateX(-50%) rotate(-6deg)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{
            duration: hasImageShown ? 0 : 0.4,
            ease: 'easeOut' as const,
            delay: hasImageShown ? 0 : 0.6,
          }}
        />
      </motion.div>
    </div>
  );
}
