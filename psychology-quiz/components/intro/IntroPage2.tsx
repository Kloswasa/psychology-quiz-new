'use client';

export function IntroPage2() {
  return (
    <div className="flex flex-col min-h-full px-4 py-6 overflow-y-auto">
      {/* Blue block – How to play */}
      <div className="w-full rounded-t-3xl rounded-b-2xl bg-[#0088ff] p-6 pb-8 text-white">
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}
        >
          HOW TO PLAY?
        </h2>
        <p className="text-center text-sm mb-6">
          &ldquo;Simply through multiple choices quiz&rdquo;
        </p>
        <div className="flex justify-center gap-8">
          {/* Left: vertical options + one selected (orange) */}
          <div className="flex items-center gap-2">
            <img src="/intro/instruct1.png" alt="Arrow up" className="w-20 h-22" />
            <img src="/intro/instruct2.png" alt="Arrow up" className="w-20 h-24" />
          </div>
          
        </div>
      </div>

      {/* Orange block – be yourself */}
      <div className="w-full rounded-2xl bg-[#FFB200] -mt-4 pt-6 px-6 pb-8 relative">
        <img src="/intro/buself.png" alt="Arrow up" />
        <p className="text-white text-center text-sm mt-4">
          It is the golden rule to play this quiz, more intuition you use, the best
          result it be.
        </p>
      </div>
    </div>
  );
}
