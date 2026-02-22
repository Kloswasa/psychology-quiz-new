'use client';

import { RiasecHexagon } from './RiasecHexagon';

export function IntroPage1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-8 overflow-y-auto">
      {/* Upper card */}
      <div
        className="w-full max-w-[320px] rounded-2xl bg-[#faf8f5] p-5 shadow-lg z-10"
        style={{ transform: 'rotate(2deg)' }}
      >
        <h2
          className="text-2xl font-bold text-[#0088ff] mb-3"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          HI, HOW ARE YOU!
        </h2>
        <p className="text-sm text-black leading-relaxed">
          This quiz is made by{' '}
          <span className="font-bold text-[#0088ff]">Visionverse team</span>, as an
          onboarding preparation, to make your travel to Australia easier than ever!
        </p>
      </div>

      {/* Lower card */}
      <div
        className="w-full max-w-[320px] rounded-2xl bg-[#faf8f5] p-5 shadow-lg -mt-2"
        style={{ transform: 'rotate(-1.5deg)' }}
      >
        <p className="text-sm text-black mb-3">
          This quiz is based on the{' '}
          <span className="font-bold text-[#0088ff]">Holland model (RIASEC)</span>
        </p>
        <div className="my-4 flex justify-center">
          <RiasecHexagon size={120} />
        </div>
        <p className="text-sm text-black leading-relaxed">
          People will be grouped into{' '}
          <span className="font-bold">Six personality types</span> based on what they
          enjoy and how they like to explore the world.
        </p>
        <p className="text-sm text-[#0088ff] font-medium mt-2">
          Your result helps match you with travel experiences that fit you best.
        </p>
      </div>
    </div>
  );
}
