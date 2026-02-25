'use client';

import { useRouter } from 'next/navigation';

export function IntroPage3() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-full px-4 py-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2
          className="text-2xl font-bold text-[#0088ff]"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}
        >
          WHAT YOU WILL GET?
        </h2>
        <p className="text-sm text-black mt-1">
          Your personal travel style with a handy information!
        </p>
      </div>

      {/* Orange panel + sample card */}
      <div className="flex-1 rounded-2xl bg-[#f97316] p-4 pb-6">
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
        <p className="text-center font-bold text-black mt-3">Native Aussie Animal</p>
        <div className="flex justify-center gap-1.5 mt-2">
          <div className="w-2 h-2 rounded-full bg-gray-700" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4 text-center border-t border-dashed border-[#0088ff]/50 pt-4">
        <p className="text-sm text-[#0088ff] mb-3">If you ready, then shall we</p>
        <button
          type="button"
          onClick={() => router.push('/quiz')}
          className="w-full max-w-[200px] rounded-xl bg-[#0088ff] text-white font-semibold py-3 px-6 shadow-md active:scale-[0.98] transition-transform"
        >
          Start
        </button>
        <p
          className="text-orange-500 font-bold text-lg mt-2 opacity-90"
          style={{ fontFamily: 'var(--font-permanent-marker), cursive' }}
        >
          LET&apos;S WANDER IN DOWN UNDER
        </p>
      </div>
    </div>
  );
}
