'use client';

export function IntroPage2() {
  return (
    <div className="flex flex-col min-h-full px-4 py-6 overflow-y-auto">
      {/* Blue block – How to play */}
      <div className="w-full rounded-t-3xl rounded-b-2xl bg-[#0088ff] p-6 pb-8 text-white">
        <h2
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          HOW TO PLAY?
        </h2>
        <p className="text-center text-sm mb-6">
          &ldquo;Simply through multiple choices quiz&rdquo;
        </p>
        <div className="flex justify-center gap-8">
          {/* Left: vertical options + one selected (orange) */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col gap-1">
              <div className="w-8 h-8 rounded border-2 border-white/80" />
              <div className="w-8 h-8 rounded border-2 border-white/80 bg-orange-400" />
            </div>
            <div className="w-8 h-8 rounded border-2 border-white/80" />
            <span className="text-2xl" aria-hidden>👆</span>
          </div>
          {/* Right: horizontal options + one selected */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              <div className="w-6 h-8 rounded border border-white/80" />
              <div className="w-6 h-8 rounded border border-white/80" />
              <div className="w-6 h-8 rounded border border-white/80 bg-orange-400" />
              <div className="w-6 h-8 rounded border border-white/80" />
            </div>
            <span className="text-2xl" aria-hidden>👆</span>
          </div>
        </div>
      </div>

      {/* Orange block – be yourself */}
      <div className="w-full rounded-2xl bg-[#f97316] -mt-4 pt-6 px-6 pb-8 relative">
        <div
          className="inline-block bg-white rounded-lg px-4 py-2 shadow-md -translate-y-1"
          style={{ transform: 'translateY(-8px)' }}
        >
          <span
            className="text-xl font-bold text-[#0088ff]"
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
          >
            be yourself
          </span>
        </div>
        <p className="text-white text-center text-sm mt-4">
          It is the golden rule to play this quiz, more intuition you use, the best
          result it be.
        </p>
      </div>
    </div>
  );
}
