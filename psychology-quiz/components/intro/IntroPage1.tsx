'use client';

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

type IntroPage1Props = { isActive?: boolean };

export function IntroPage1({ isActive = false }: IntroPage1Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-8 overflow-y-auto">
      {/* Upper card – stacked, centered */}
      <motion.div
        className="w-full max-w-[300px] rounded-2xl bg-[#faf8f5] shadow-lg p-6 py-10 sm:p-10 mb-6"
        initial="hiddenLeft"
        animate={isActive ? 'visible' : 'hiddenLeft'}
        variants={cardVariants}
        custom={-3}
      >
        <h2
          className="text-2xl font-bold text-[#0088ff] mb-3 text-center"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}
        >
          HI, HOW ARE YOU!
        </h2>
        <p className="text-sm text-black leading-relaxed text-center">
          This quiz is made by{' '}
          <img src="intro/visionverse-logo.png" alt="Visionverse team" className="w-30 h-18 mx-auto my-2 rounded-xl" />as an
          onboarding preparation, to make your travel to Australia easier than ever!
        </p>
      </motion.div>

      {/* Lower card – continues below upper, centered */}
      <motion.div
        className="w-full max-w-[320px] -mt-2 rounded-2xl bg-[#FFF9D9] p-6 sm:p-7 md:p-10 shadow-lg max-h-[55vh] overflow-y-auto"
        initial="hiddenRight"
        animate={isActive ? 'visible' : 'hiddenRight'}
        variants={cardVariants}
        custom={8}
        transition={{ duration: 0.5, ease: 'easeOut' as const, delay: isActive ? 0.2 : 0 }}
      >
        <p className="text-sm text-black mb-3 text-center">
          This quiz is based on the{' '}
          <br /><span className="font-bold text-[#0088ff]">Holland model (RIASEC)</span><br />
        </p>
        <div className="my-3 sm:my-4 flex justify-center">
          <img
            src="/intro/Hex.png"
            alt="RIASEC"
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-[120px] md:h-[120px] object-contain"
          />
        </div>
        <p className="text-sm text-black leading-relaxed text-center">
          People will be grouped into{' '}
          <span className="font-bold">Six personality types</span> based on what they
          enjoy and how they like to explore the world.
        </p>
        <p className="text-sm text-[#0088ff] font-medium mt-2 text-center">
          Your result helps match you with travel experiences that fit you best.
        </p>
      </motion.div>
    </div>
  );
}
