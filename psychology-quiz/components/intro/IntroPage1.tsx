'use client';

export function IntroPage1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-6 py-8 overflow-y-auto">
      {/* Upper card – stacked, centered */}
      <div
        className="w-full max-w-[300px] rounded-2xl bg-[#faf8f5] shadow-lg p-6 py-10 sm:p-10 mb-6"
        style={{ transform: 'rotate(-3deg)' }}
      >
        <h2
          className="text-2xl font-bold text-[#0088ff] mb-3"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}
        >
          HI, HOW ARE YOU!
        </h2>
        <p className="text-sm text-black leading-relaxed">
          This quiz is made by{' '}
          <span className="font-bold text-[#0088ff]">Visionverse team</span>, as an
          onboarding preparation, to make your travel to Australia easier than ever!
        </p>
      </div>

      {/* Lower card – continues below upper, centered */}
      <div
        className="w-full max-w-[320px] -mt-2 rounded-2xl bg-[#FFF9D9] p-6 sm:p-7 md:p-10 shadow-lg max-h-[55vh] overflow-y-auto"
        style={{ transform: 'rotate(8deg)' }}
      >
        <p className="text-sm text-black mb-3">
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
