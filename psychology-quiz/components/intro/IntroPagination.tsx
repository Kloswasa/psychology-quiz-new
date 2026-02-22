'use client';

/** Pagination bars – Figma: 1st=blue, 2nd=black, 3rd=orange; active = wider + full opacity */
export function IntroPagination({
  pageIndex,
  onPageChange,
}: {
  pageIndex: number;
  onPageChange?: (index: number) => void;
}) {
  const colors = ['#0088ff', '#000000', '#f97316'];
  return (
    <div
      className="flex items-center justify-center gap-2"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPageChange?.(i)}
          className="transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0088ff] focus:ring-offset-2 rounded-full"
          style={{
            width: i === pageIndex ? 24 : 16,
            height: 6,
            backgroundColor: colors[i],
            opacity: i === pageIndex ? 1 : 0.5,
          }}
          aria-label={`Go to intro page ${i + 1}`}
        />
      ))}
    </div>
  );
}
