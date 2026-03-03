'use client';

type BackButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  color?: string;
};

export default function BackButton({ onClick, disabled, color = '#ffffff' }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden
        rounded-2xl
        px-4 py-2
        text-sm font-medium
        transition-all duration-300
        active:scale-95
        touch-manipulation
        backdrop-blur-sm bg-white/10 border border-white/30 hover:bg-white/20 hover:border-white/50 shadow-lg
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:border-white/30
      `}
      style={{
        color,
        backdropFilter: 'blur(8px) saturate(150%)',
        WebkitBackdropFilter: 'blur(8px) saturate(150%)',
      }}
    >
      <span className="relative z-10 drop-shadow-lg">Back</span>
    </button>
  );
}

