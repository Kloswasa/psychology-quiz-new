'use client';

export function IntroPage1() {
  return (
    <div className="relative h-full w-full px-6 py-8">
      {/* Upper card – full height of slide (fills to bottom of page) */}
      <div
        className="absolute top-12 left-12 right-12 bottom-8 bg-[#faf8f5] shadow-lg flex flex-col p-8"
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

      {/* Lower card – sits on top of upper card at the bottom (Figma style) */}
      <div
        className="absolute bottom-12 left-6 right-6 z-10 max-w-[360px] mx-auto rounded-2xl bg-[#FFF9D9] p-10 shadow-lg shrink-0"
        style={{ transform: 'rotate(6deg)' }}
      >
        <p className="text-sm text-black mb-3">
          This quiz is based on the{' '}
          <br /><span className="font-bold text-[#0088ff]">Holland model (RIASEC)</span><br />
        </p>
        <div className="my-4 flex justify-center">
          <img src="/intro/Hex.png" alt="RIASEC" style={{ width: '120px', height: '120px' }} className="w-full h-full object-contain" />
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
