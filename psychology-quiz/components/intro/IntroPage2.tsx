'use client';

export function IntroPage2() {
  return (
    <div className="flex flex-col min-h-full px-10 py-6 overflow-y-auto items-center justify-center">
      {/* Blue block – How to play */}
      <div className="w-full  bg-[#0088ff] p-6 pb-8 text-white">
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
      </div>

      {/* Orange block – be yourself */}
      <div className="w-full  bg-[#FFB200] mt-12 pt-6 px-6 pb-8 relative">
        <img src="/intro/buself.png"
        alt="Arrow up" className="absolute -top-6 left-1/2 -translate-x-1/2" style={{ transform: 'rotate(-8deg)' }} />
        <p className="text-white text-center text-sm mt-6 " >
          It is the golden rule to play this quiz, more intuition you use, the best
          result it be.
        </p>
      </div>
    </div>
  );
}
