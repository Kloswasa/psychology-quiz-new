'use client';

import { useCallback, useRef, useState } from 'react';
import { IntroPagination } from './intro/IntroPagination';
import { IntroPage1 } from './intro/IntroPage1';
import { IntroPage2 } from './intro/IntroPage2';
import { IntroPage3 } from './intro/IntroPage3';

const SWIPE_THRESHOLD = 50;

export function IntroCarousel() {
  const [pageIndex, setPageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback((index: number) => {
    setPageIndex(Math.max(0, Math.min(2, index)));
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta > 0) goTo(pageIndex + 1);
      else goTo(pageIndex - 1);
    }
  }, [pageIndex, goTo]);

  return (
    <div
      className="relative flex flex-col h-full min-h-screen touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex flex-1 min-h-0 w-full overflow-hidden"
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="flex h-full w-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${pageIndex * 100}%)` }}
        >
          <div className="h-full w-full flex-shrink-0">
            <IntroPage1 />
          </div>
          <div className="h-full w-full flex-shrink-0">
            <IntroPage2 />
          </div>
          <div className="h-full w-full flex-shrink-0">
            <IntroPage3 />
          </div>
        </div>
      </div>

      <IntroPagination pageIndex={pageIndex} onPageChange={goTo} />
    </div>
  );
}
