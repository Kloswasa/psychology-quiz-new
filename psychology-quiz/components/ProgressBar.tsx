export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current) / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-1 text-sm text-gray-600">{current}/{total}</div>
      <div className="h-2 w-full rounded bg-gray-200">
        <div className="h-2 rounded bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

