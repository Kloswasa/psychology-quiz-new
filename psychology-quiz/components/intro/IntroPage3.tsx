'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

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
    <div className="flex flex-col items-center justify-center min-h-screen">
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
        <p className="text-sm text-black mt-1">
          Your personal travel style <br/> with a handy information!
        </p>
      </motion.div>

      {/* Orange panel + sample card */}
      <motion.div
        className="  bg-[#FFB200] p-4 pb-6 mx-[-1rem]"
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
        variants={fadeInUp}
        custom={1}
      >
        <div className="bg-white rounded-xl p-3 shadow-md flex gap-3">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-blue-400 to-blue-600">
            <img
              src="/intro/sample-surf.jpg"
              alt="Surf lesson"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-black text-sm">Bondi Beach Surf Lesson</h3>
            <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
              Catch the wicked waves of Bondi Beach with this fun surfing lesson!
            </p>
            <button
              type="button"
              className="mt-2 text-xs border border-gray-300 rounded-lg px-2 py-1 text-black bg-white"
            >
              Detail
            </button>
          </div>
        </div>
        <p className="text-center font-bold text-black mt-3">Recommended locations or trips!</p>
        <div className="flex justify-center gap-1.5 mt-2">
          <div className="w-2 h-2 rounded-full bg-gray-700" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
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
        <p className="text-sm text-[#0088ff] mb-3">If you ready, then shall we</p>
        <button
          type="button"
          onClick={() => router.push('/quiz')}
          className="my-2 w-full max-w-[200px] rounded-xl bg-[#0088ff] text-white font-semibold py-3 px-6 shadow-md active:scale-[0.98] transition-transform"
        >
          Start
        </button>
        <p
          className="text-[#FFB200] font-bold text-3xl my-4 opacity-90 overflow-hidden"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive', rotate: '-8deg' }}
        >
          &quot;LET&apos;S WANDER IN DOWN UNDER&quot;
        </p>
      </motion.div>
    </div>
    </div>
  );
}
