'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const SWIPE_THRESHOLD = 60;

/**
 * Page center: use this as the reference to assign other image positions.
 * All positions/sizes are % of the content area (above the swipe footer).
 * Example: leftPercent: PAGE_CENTER.left - 12  → 12% to the left of center.
 */
const PAGE_CENTER = { left: 50, top: 50 } as const;
/** Heading width as % of content area – scales with screen (e.g. 70 = 70% of content width). */
const CENTER_HEADING_WIDTH_PERCENT = 72;

type AnimationPhase =
  | 'offscreen'
  | 'imagesToCenter'
  | 'headingFadeIn'
  | 'imagesSpread'
  | 'readySwipe'
  | 'swipeComplete';

/**
 * Responsive asset: position and size in % of container so layout scales
 * without collisions on different screen sizes. Figma node 946:4243.
 */
function StaticAsset({
  children,
  leftPercent,
  topPercent,
  widthPercent,
  rotate,
  zIndex = 1,
  phase,
  isHeading = false,
}: {
  children: React.ReactNode;
  leftPercent: number;
  topPercent: number;
  widthPercent: number;
  rotate: string;
  zIndex?: number;
  phase: AnimationPhase;
  isHeading?: boolean;
}) {
  const isRightSide = leftPercent >= PAGE_CENTER.left;

  let currentLeft = leftPercent;
  let currentTop = topPercent;
  let opacity = 1;

  if (!isHeading) {
    if (phase === 'offscreen') {
      currentLeft = isRightSide ? 110 : -10;
      currentTop = topPercent;
      opacity = 0;
    } else if (phase === 'imagesToCenter' || phase === 'headingFadeIn') {
      currentLeft = PAGE_CENTER.left;
      currentTop = PAGE_CENTER.top;
      opacity = 1;
    } else if (phase === 'imagesSpread' || phase === 'readySwipe') {
      currentLeft = leftPercent;
      currentTop = topPercent;
    } else if (phase === 'swipeComplete') {
      currentLeft = leftPercent;
      currentTop = topPercent - 10;
      opacity = 0;
    }
  } else {
    if (phase === 'offscreen' || phase === 'imagesToCenter') {
      opacity = 0;
    } else if (phase === 'headingFadeIn' || phase === 'imagesSpread' || phase === 'readySwipe') {
      opacity = 1;
    } else if (phase === 'swipeComplete') {
      opacity = 0;
    }
  }

  return (
    <div
      className="absolute min-w-0"
      style={{
        left: `${currentLeft}%`,
        top: `${currentTop}%`,
        width: `${widthPercent}%`,
        zIndex,
        transform: 'translate(-50%, -50%) rotate(' + rotate + ')',
        opacity,
        transition:
          'left 800ms cubic-bezier(0.22, 0.61, 0.36, 1), top 800ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 600ms ease-out',
      }}
    >
      {children}
    </div>
  );
}

/** Swipe-up area at bottom – adjust these to change size and look */
const SWIPE_ZONE = {
  minHeight: 120,          // min height (px); also used for “swipe starts in bottom zone” detection
  paddingTop: 24,           // space above label (p x); e.g. 24, 32, 48
  textColor: 'text-black',  // 'text-white', 'text-black'
  caretClass: 'text-xs',
  labelClass: 'font-bold',
  barWidth: { idle: 48, hover: 56 },
} as const;

export function HomePage() {
  const router = useRouter();
  const touchStartY = useRef(0);
  const [swipeHint, setSwipeHint] = useState(false);
  const [phase, setPhase] = useState<AnimationPhase>('offscreen');
  const [swipeCompleted, setSwipeCompleted] = useState(false);

  useEffect(() => {
    const toCenter = setTimeout(() => setPhase('imagesToCenter'), 50);
    const headingIn = setTimeout(() => setPhase('headingFadeIn'), 850);
    const spreadOut = setTimeout(() => setPhase('imagesSpread'), 1700);
    const showSwipe = setTimeout(() => setPhase('readySwipe'), 2400);

    return () => {
      clearTimeout(toCenter);
      clearTimeout(headingIn);
      clearTimeout(spreadOut);
      clearTimeout(showSwipe);
    };
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const delta = touchStartY.current - endY;
      const bottomZoneStart =
        typeof window !== 'undefined' ? window.innerHeight - SWIPE_ZONE.minHeight : 500;
      const startInZone = touchStartY.current > bottomZoneStart;
      if (delta > SWIPE_THRESHOLD && startInZone) {
        setSwipeCompleted(true);
        setPhase('swipeComplete');
        setTimeout(() => {
          router.push('/intro');
        }, 800);
      }
    },
    [router]
  );

  const handleSwipeZoneClick = useCallback(() => {
    setSwipeCompleted(true);
    setPhase('swipeComplete');
    setTimeout(() => {
      router.push('/intro');
    }, 800);
  }, [router]);

  return (
    <div
      className="relative mx-auto flex min-h-screen max-w-[430px] w-full flex-col overflow-hidden bg-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Full-height background – spans content + footer so image connects seamlessly */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${
          swipeCompleted ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Image
          src="/home/home-background.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="430px"
          quality={90}
        />
      </div>

      {/* Content area: all positions/sizes are % of this area. Heading is at PAGE_CENTER (50%, 50%); assign others e.g. leftPercent={PAGE_CENTER.left - 38} for "38% left of center". */}
      <div
        className={`relative z-10 flex flex-1 min-h-0 w-full transition-opacity duration-700 ${
          swipeCompleted ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* G'Day / sticker – top-left */}
        <StaticAsset
          leftPercent={16}
          topPercent={13}
          widthPercent={23}
          rotate="-8deg"
          zIndex={3}
          phase={phase}
        >
          <div className="block w-full touch-manipulation rounded drop-shadow-md">
            <Image
              src="/home/sticker.png"
              alt="Good day mate"
              width={200}
              height={240}
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </StaticAsset>

        {/* Beach polaroid – top mid-left */}
        <StaticAsset
          leftPercent={45}
          topPercent={24}
          widthPercent={63}
          rotate="-10deg"
          zIndex={2}
          phase={phase}
        >
          <div className="block w-full touch-manipulation rounded drop-shadow-md">
            <Image
              src="/home/polaroid-beach.png"
              alt="Typical australian beach"
              width={540}
              height={610}
              className="w-full h-auto object-contain"
              draggable={false}
              quality={90}
            />
          </div>
        </StaticAsset>

        {/* Circular emblem – top-right */}
        <StaticAsset
          leftPercent={76}
          topPercent={10}
          widthPercent={19}
          rotate="-12deg"
          zIndex={3}
          phase={phase}
        >
          <div className="block w-full touch-manipulation rounded drop-shadow-md">
            <Image
              src="/home/emblem-circle.png"
              alt="Concentric circle emblem"
              width={160}
              height={160}
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </StaticAsset>

        {/* Koala stamp – upper right */}
        <StaticAsset
          leftPercent={85}
          topPercent={32}
          widthPercent={20}
          rotate="15deg"
          zIndex={4}
          phase={phase}
        >
          <div className="block w-full touch-manipulation rounded drop-shadow-md">
            <Image
              src="/home/koala-stamp.png"
              alt="Koala stamp"
              width={180}
              height={217}
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </StaticAsset>

        {/* Australia Calls heading – page center (reference for other asset positions) */}
        <StaticAsset
          leftPercent={PAGE_CENTER.left}
          topPercent={53}
          widthPercent={85}
          rotate="0deg"
          zIndex={10}
          phase={phase}
          isHeading
        >
          <div className="block w-full text-center">
            <img
              src="/home/heading.png"
              alt="Australia Calls"
              className="w-full h-auto object-contain drop-shadow-md"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </StaticAsset>

        {/* Forest polaroid – lower left */}
        <StaticAsset
          leftPercent={45}
          topPercent={85}
          widthPercent={47}
          rotate="15deg"
          zIndex={6}
          phase={phase}
        >
          <div className="block w-full touch-manipulation rounded drop-shadow-md">
            <Image
              src="/home/polaroid-bushland.png"
              alt="Bushland"
              width={400}
              height={471}
              className="w-full h-auto object-contain"
              draggable={false}
              quality={90}
            />
          </div>
        </StaticAsset>

        {/* Wildlife ahead badge – lower left, over forest */}
        <StaticAsset
          leftPercent={18}
          topPercent={75}
          widthPercent={22}
          rotate="6deg"
          zIndex={7}
          phase={phase}
        >
          <div className="block w-full touch-manipulation rounded drop-shadow-md">
            <Image
              src="/home/wildlife-sign.png"
              alt="Wildlife ahead"
              width={190}
              height={211}
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </StaticAsset>

        {/* Kangaroo – lower middle */}
        <StaticAsset
          leftPercent={72}
          topPercent={73}
          widthPercent={30}
          rotate="60deg"
          zIndex={8}
          phase={phase}
        >
          <div className="block w-full touch-manipulation rounded drop-shadow-md">
            <Image
              src="/home/kangaroo.png"
              alt="Kangaroo"
              width={260}
              height={312}
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </StaticAsset>

        {/* Boomerang – lower right */}
        <StaticAsset
          leftPercent={70}
          topPercent={88}
          widthPercent={70}
          rotate="-70deg"
          zIndex={6}
          phase={phase}
        >
          <div className="block w-full touch-manipulation rounded drop-shadow-md">
            <Image
              src="/home/boomerang.png"
              alt="Boomerang"
              width={600}
              height={300}
              className="w-full h-auto object-contain"
              draggable={false}
              quality={90}
            />
          </div>
        </StaticAsset>
      </div>

      {/* Swipe up CTA – separate footer div, always at the bottom; swipe up (from bottom zone) or tap to continue */}
      <div
        className={`relative z-10 flex shrink-0 flex-col items-center justify-center gap-1 px-4 sm:px-6 pb-safe ${SWIPE_ZONE.textColor} drop-shadow-md transition-opacity duration-700 ${
          swipeCompleted ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          minHeight: SWIPE_ZONE.minHeight,
          paddingTop: SWIPE_ZONE.paddingTop,
          fontFamily: 'var(--font-bitter), sans-serif',
        }}
      >
        <div
          className={`w-full max-w-sm flex flex-col items-center transition-transform transition-opacity duration-700 ${
            phase === 'readySwipe' && !swipeCompleted
              ? 'opacity-100 translate-y-0 animate-bounce-up'
              : ''
          } ${
            phase !== 'readySwipe' && !swipeCompleted
              ? 'opacity-0 translate-y-6 pointer-events-none'
              : ''
          } ${
            swipeCompleted ? '-translate-y-[120vh] opacity-0 pointer-events-none' : ''
          }`}
        >
          <button
            type="button"
            onClick={handleSwipeZoneClick}
            onMouseEnter={() => setSwipeHint(true)}
            onMouseLeave={() => setSwipeHint(false)}
            className="
              relative overflow-hidden w-full flex flex-col items-center justify-center gap-1 rounded-2xl px-6 py-3
              backdrop-blur-sm bg-white/85 border border-white/30
              transition-all duration-300 touch-manipulation
              hover:bg-white/20 hover:border-white/50 shadow-lg hover:shadow-xl
              active:scale-95
              focus:outline-none
            "
            style={{
              backdropFilter: 'blur(8px) saturate(150%)',
              WebkitBackdropFilter: 'blur(8px) saturate(150%)',
            }}
            aria-label="Swipe up or press to continue"
          >
            {/* Glassmorphic overlay – same as choice answers */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-100" />
            <span className="relative z-10 flex items-center gap-6"
            style={{color: '#0088ff' }}
>
              <Image src="/icons/swipe-up.svg" alt="" width={20} height={20} className="size-5 shrink-0 opacity-90" aria-hidden />
              <span className={SWIPE_ZONE.labelClass}>Swipe up</span>
              <Image src="/icons/swipe-up.svg" alt="" width={20} height={20} className="size-5 shrink-0 opacity-90" aria-hidden />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
