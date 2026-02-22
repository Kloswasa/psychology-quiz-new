'use client';

/** Holland RIASEC hexagon – 6 segments (R,I,A,S,E,C) with Figma-style colors */
const SEGMENTS = [
  { label: 'R', color: '#a855f7' }, // purple
  { label: 'I', color: '#f97316' },  // orange
  { label: 'A', color: '#22c55e' },  // green
  { label: 'S', color: '#84cc16' },  // lime
  { label: 'E', color: '#38bdf8' },  // sky
  { label: 'C', color: '#2563eb' },  // blue
];

export function RiasecHexagon({ size = 140 }: { size?: number }) {
  const r = size / 2;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[140px] mx-auto"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <defs>
        {SEGMENTS.map((_, i) => {
          const a1 = (Math.PI / 3) * i - Math.PI / 6;
          const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 6;
          const x1 = cx + r * Math.cos(a1);
          const y1 = cy + r * Math.sin(a1);
          const x2 = cx + r * Math.cos(a2);
          const y2 = cy + r * Math.sin(a2);
          const segmentD = `M ${cx} ${cy} L ${x1} ${y1} L ${x2} ${y2} Z`;
          return (
            <clipPath key={i} id={`riasec-clip-${i}`}>
              <path d={segmentD} />
            </clipPath>
          );
        })}
      </defs>
      {SEGMENTS.map((seg, i) => {
        const a1 = (Math.PI / 3) * i - Math.PI / 6;
        const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 6;
        const x1 = cx + r * Math.cos(a1);
        const y1 = cy + r * Math.sin(a1);
        const x2 = cx + r * Math.cos(a2);
        const y2 = cy + r * Math.sin(a2);
        const segmentD = `M ${cx} ${cy} L ${x1} ${y1} L ${x2} ${y2} Z`;
        return (
          <path
            key={i}
            d={segmentD}
            fill={seg.color}
            stroke="#fff"
            strokeWidth={1.5}
          />
        );
      })}
    </svg>
  );
}
