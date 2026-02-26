'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import ShareButton from '@/components/ShareButton';

type Destination = { name: string; reason: string; url?: string };

/** Darken a hex color by a factor 0–1 (0 = black, 1 = unchanged). */
function darkenHex(hex: string, amount = 0.2): string {
  const match = hex.replace(/^#/, '').match(/.{2}/g);
  if (!match) return hex;
  const [r, g, b] = match.map((x) => Math.max(0, Math.round(parseInt(x, 16) * (1 - amount))));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const SECTION_RADIUS = 'rounded-2xl';

function RecommendationCarousel({ destinations, themeColor }: { destinations: Destination[]; themeColor?: string }) {
  const dotColor = themeColor ?? '#4A90D9';
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const len = destinations.length;
  const d = destinations[index];

  const goTo = useCallback(
    (i: number) => setIndex((len + i) % len),
    [len]
  );

  useEffect(() => {
    if (len <= 1) return;
    const id = setInterval(() => goTo(index + 1), 5000);
    return () => clearInterval(id);
  }, [len, index, goTo]);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart == null || len <= 1) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) goTo(dx > 0 ? index - 1 : index + 1);
    setTouchStart(null);
  };

  return (
    <div className="mt-3">
      <div
        className="overflow-hidden rounded-xl bg-white/80 shadow-sm"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex min-h-[120px]">
          {/* Left: image – placeholder per Figma card (destination image when available) */}
          <div className="w-[42%] shrink-0 overflow-hidden rounded-l-xl bg-[#E8E4DC]">
            <div className="h-full min-h-[120px] w-full" aria-hidden />
          </div>
          {/* Right: title, description, Detail button */}
          <div className="flex flex-1 flex-col justify-between p-3">
            <div>
              <h3 className="line-clamp-2 font-bold text-neutral-900">{d.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-700">
                {d.reason}
              </p>
            </div>
            <button
              type="button"
              className="mt-2 w-fit 
              flex-1 rounded-full 
              border border-neutral-300 
              bg-white px-4 py-1.5 
              text-base font-semibold 
              transition 
              shadow-sm 
              hover:bg-neutral-100"
              onClick={() => d.url && window.open(d.url, '_blank', 'noopener,noreferrer')}
                // className="mt-2 w-fit   text-sm font-medium text-neutral-800 hover:bg-neutral-50"
              style={{
                borderColor: dotColor,
                color: dotColor,
              }}
            >
              Detail
            </button>
          </div>
        </div>
      </div>
      {/* Carousel dots */}
      {len > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {destinations.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="h-2 w-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: i === index ? dotColor : '#D1D5DB',
              }}
              aria-label={`Go to recommendation ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TextCarousel({
  items,
  ariaLabelPrefix,
  themeColor,
}: {
  items: string[];
  ariaLabelPrefix: string;
  themeColor?: string;
}) {
  const dotColor = themeColor ?? '#4A90D9';
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const len = items.length;
  const text = items[index];

  const goTo = useCallback(
    (i: number) => setIndex((len + i) % len),
    [len]
  );

  useEffect(() => {
    if (len <= 1) return;
    const id = setInterval(() => goTo(index + 1), 5000);
    return () => clearInterval(id);
  }, [len, index, goTo]);

  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart == null || len <= 1) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) goTo(dx > 0 ? index - 1 : index + 1);
    setTouchStart(null);
  };

  if (len === 0) return null;

  return (
    <div className="mt-3">
      <div
        className="flex min-h-[4.5rem] items-center justify-center overflow-hidden rounded-xl bg-white/80 px-4 py-3 shadow-sm"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <p className="line-clamp-3 text-left text-sm text-neutral-800">{text}</p>
      </div>
      {len > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="h-2 w-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: i === index ? dotColor : '#D1D5DB',
              }}
              aria-label={`${ariaLabelPrefix} ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TravelerResult({
  title,
  description,
  personalityName,
  shareUrl,
  shareTitle,
  imageUrl,
  riasecType,
  themeColor,
  destinations,
  tips,
  trivia,
}: {
  title: string;
  description: string;
  personalityName?: string;
  shareUrl: string;
  shareTitle: string;
  imageUrl?: string | null;
  riasecType?: string;
  themeColor?: string;
  destinations: Destination[];
  tips: string[];
  trivia: string[];
}) {
  const displayName = (personalityName ?? title).toUpperCase();
  const bgColor = themeColor ?? '#4A90D9';
  const bgColorHover = useMemo(() => darkenHex(bgColor, 0.2), [bgColor]);
  const resultImageSrc =
    (riasecType ? `/images/results/${riasecType}.png` : null) ?? imageUrl ?? null;

  const handleSave = () => {
    // Placeholder: save result (e.g. download as image). Implement when ready.
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard. You can paste it to save.');
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-safe" style={{ backgroundColor: bgColor }}>
      <div className="mx-auto max-w-lg">
        {/* Result card section – full image visible, no cropping */}
        <section
          className={`${SECTION_RADIUS} overflow-hidden bg-[#FFF5E5] shadow-lg`}
          data-result-card
        >
          {/* Result image – full image shown at natural aspect ratio */}
          <div className="w-full bg-[#E8E4DC]">
            {resultImageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resultImageSrc}
                alt={displayName}
                className="h-auto w-full object-contain"
              />
            ) : null}
          </div>
          <p className="p-5 text-sm leading-relaxed text-neutral-900">
            {description}
          </p>
        </section>

        {/* Save and Share section */}
        <section
          className={`${SECTION_RADIUS} overflow-hidden bg-[#FFF5E5] p-4 shadow-lg`}
        >
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-xl border-2 bg-white py-3 text-base font-semibold transition"
              style={{
                borderColor: bgColor,
                color: bgColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${bgColor}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
              }}
            >
              Save
            </button>
            <ShareButton
              url={shareUrl}
              title={shareTitle}
              themeColor={bgColor}
              themeColorHover={bgColorHover}
            />
          </div>
        </section>

        {/* Information section – three subsections with round corners */}
        <section >
          {/* Recommendation subsection – carousel cards per Figma */}
          <div
            className={`${SECTION_RADIUS} overflow-hidden bg-[#FFF5E5] p-5 shadow-lg`}
          >
            <h2 className="text-3xl text-center font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-permanent-marker), cursive', color: bgColor }} >
              Recommendation
            </h2>
            {destinations.length > 0 ? (
              <RecommendationCarousel destinations={destinations} themeColor={bgColor} />
            ) : null}
          </div>

          {/* Tips of the day subsection – carousel */}
          <div
            className={`${SECTION_RADIUS} overflow-hidden bg-[#FFF5E5] p-5 shadow-lg`}
          >
            <h2 className="text-lg font-bold text-neutral-900">
              Tips of the day
            </h2>
            <TextCarousel items={tips} ariaLabelPrefix="Tip" themeColor={bgColor} />
          </div>

          {/* Trivia subsection – carousel */}
          <div
            className={`${SECTION_RADIUS} overflow-hidden bg-[#FFF5E5] p-5 shadow-lg`}
          >
            <h2 className="text-lg font-bold text-neutral-900">
              Travel trivia
            </h2>
            <TextCarousel items={trivia} ariaLabelPrefix="Trivia" themeColor={bgColor} />
          </div>
        </section>
      </div>
    </div>
  );
}
