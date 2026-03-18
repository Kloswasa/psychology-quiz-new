'use client';

import { useCallback } from 'react';
import { useSound } from '@/components/SoundContext';

type SoundToggleButtonProps = {
  className?: string;
};

export function SoundToggleButton({ className = '' }: SoundToggleButtonProps) {
  const { enabled, setEnabled } = useSound();

  const toggle = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  return (
    <button
      type="button"
      onClick={toggle}
      className={`
        rounded-2xl px-2 py-2 text-xs font-semibold
        text-white
        border border-white/40
        bg-white/10
        backdrop-blur-md
        shadow-lg
        ${className}
      `}
    >
      <span className="sr-only">{enabled ? 'Sound on' : 'Sound off'}</span>
      <svg
        width="28"
        height="25"
        viewBox="0 0 31 27"
        xmlns="http://www.w3.org/2000/svg"
        className={enabled ? 'text-[#0088ff]' : 'text-white/70'}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.58 5.7986C26.7909 5.58793 27.0769 5.46959 27.375 5.46959C27.6731 5.46959 27.9591 5.58793 28.17 5.7986L28.173 5.8016L28.1775 5.8046L28.188 5.8151L28.218 5.8451L28.311 5.9486C28.386 6.0341 28.491 6.1556 28.6125 6.3101C29.9985 8.11156 30.75 10.3207 30.75 12.5936C30.75 14.8665 29.9985 17.0756 28.6125 18.8771C28.4869 19.0374 28.3548 19.1925 28.2165 19.3421L28.1865 19.3721L28.1775 19.3826L28.173 19.3856L28.1715 19.3871L27.4065 18.6251L28.1715 19.3901C27.9605 19.6011 27.6742 19.7197 27.3757 19.7197C27.0773 19.7197 26.791 19.6011 26.58 19.3901C26.369 19.1791 26.2504 18.8928 26.2504 18.5944C26.2504 18.2959 26.369 18.0097 26.58 17.7986L26.5785 17.8001L26.5755 17.8016L26.583 17.7941L26.6325 17.7401C26.6805 17.6881 26.75 17.6046 26.841 17.4896C27.7899 16.2508 28.3586 14.763 28.4779 13.2071C28.5972 11.6512 28.262 10.0941 27.513 8.7251C27.3175 8.36481 27.0927 8.02116 26.841 7.6976C26.7595 7.59234 26.6735 7.49074 26.583 7.3931L26.5755 7.3856C26.3663 7.17419 26.2494 6.88857 26.2502 6.59117C26.2511 6.29378 26.3696 6.00882 26.58 5.7986ZM17.6805 0.437603C19.425 -0.712897 21.75 0.539603 21.75 2.6291V24.0581C21.75 26.1491 19.425 27.4001 17.6805 26.2496L8.6805 20.3171C8.61961 20.2765 8.54818 20.2546 8.475 20.2541H4.125C3.03098 20.2541 1.98177 19.8195 1.20818 19.0459C0.434597 18.2723 0 17.2231 0 16.1291V10.5581C0 9.46408 0.434597 8.41488 1.20818 7.64129C1.98177 6.8677 3.03098 6.4331 4.125 6.4331H8.475C8.54854 6.43334 8.62052 6.41196 8.682 6.3716L17.6805 0.437603Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

