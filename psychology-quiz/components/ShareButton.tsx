'use client';

import type { FC } from 'react';
import { useState } from 'react';

export type ShareButtonProps = {
  url: string;
  title: string;
  themeColor?: string;
  themeColorHover?: string;
};

const ShareButton: FC<ShareButtonProps> = (props) => {
  const { url, title, themeColor, themeColorHover } = props;
  const [hover, setHover] = useState(false);
  const bg = themeColor ?? '#4A90D9';
  const bgHover = themeColorHover ?? '#3A7BC2';

  const share = async () => {
    const fullUrl =
      typeof window !== 'undefined' && url.startsWith('/')
        ? `${window.location.origin}${url}`
        : url;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: fullUrl,
          text: title,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          await navigator.clipboard.writeText(fullUrl);
          alert('Link copied to clipboard');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(fullUrl);
        alert('Link copied to clipboard');
      } catch {
        alert('Could not copy link');
      }
    }
  };

  return (
    <button
      onClick={share}
      className="flex-1 rounded-xl py-3 text-base font-semibold text-white transition"
      type="button"
      style={{ backgroundColor: hover ? bgHover : bg }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Share
    </button>
  );
};

export default ShareButton;

