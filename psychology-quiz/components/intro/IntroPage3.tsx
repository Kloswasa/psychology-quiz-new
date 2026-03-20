'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SoundToggleButton } from '@/components/SoundToggleButton';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const, delay: i * 0.12 },
  }),
};

type IntroPage3Props = { isActive?: boolean };

export function IntroPage3({ isActive = false }: IntroPage3Props) {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen">
    <SoundToggleButton className="absolute right-3 top-3 z-30" />
    <div className="flex flex-col items-center justify-center py-6  bg-white mx-8 my-6">
      {/* Header */}
      <motion.div
        className="text-center mb-4"
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        variants={fadeInUp}
        custom={0}
      >
        <h2
          className="text-2xl font-bold text-[#0088ff]"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}
        >
          WHAT YOU WILL GET?
        </h2>
        
      </motion.div>

      {/* Hype panel + sample animal image */}
      <motion.div
        className="  bg-[#FFF5E5] p-2 pb-6 mx-[-1rem] shadow-md"
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        variants={fadeInUp}
        custom={1}
      >
        <div className=" rounded-xl  shadow-md overflow-hidden">
          <img
            src="/intro/band.webp"
            alt="Sample experience"
            className="w-full h-auto rounded-lg object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <p className="text-center font-bold text-black px-4 mt-3">Matching Australia animal in you  and more travel tips!</p>
        
      </motion.div>

      {/* CTA */}
      {/* Full-width dashed divider */}
      <motion.div
        className="mt-1 -mx-4 border-t-2 border-dashed border-[#0088ff]/50"
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        variants={fadeInUp}
        custom={2}
      />
      <motion.div
        className="text-center pt-4"
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        variants={fadeInUp}
        custom={3}
      >
        <p className="text-sm text-[#0088ff] ">If you ready, then shall we</p>
        <motion.button
          type="button"
          onClick={() => router.push('/quiz')}
          className="my-2 w-full max-w-[200px] rounded-xl bg-[#0088ff] text-white font-semibold py-3 px-6 shadow-md transition-transform"
          animate={
            isActive
              ? { scale: [1, 0.95, 0.7] }
              : { scale: 1 }
          }
          transition={
            isActive
              ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          whileTap={{ scale: 0.6 }}
        >
          Start
        </motion.button>
        <p
          className="text-[#FFB200] font-bold text-4xl my-4 opacity-60 overflow-hidden"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive', rotate: '-8deg' }}
        >
          &quot;LET&apos;S WANDER IN DOWN UNDER&quot;
        </p>
      </motion.div>
    </div>
    </div>
  );
}
