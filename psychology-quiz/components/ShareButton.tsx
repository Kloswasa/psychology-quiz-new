'use client';

import type { FC } from 'react';
import { useState } from 'react';

export type ShareButtonProps = {
  url: string;
  title: string;
  themeColor?: string;
  themeColorHover?: string;
  /** Optional image URL to share (same image as save). Fetched and passed as file when supported. */
  imageUrl?: string | null;
  /** Filename for the shared image when sharing as file (e.g. "travel-result.png"). */
  imageFilename?: string;
};

const ShareButton: FC<ShareButtonProps> = (props) => {
  const { url, title, themeColor, themeColorHover, imageUrl, imageFilename } = props;
  const [hover, setHover] = useState(false);
  const [sharing, setSharing] = useState(false);
  const bg = themeColor ?? '#4A90D9';
  const bgHover = themeColorHover ?? '#3A7BC2';

  const shareUrlOnly = async (fullUrl: string) => {
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

  const share = async () => {
    if (typeof window === 'undefined') return;

    const fullUrl =
      url.startsWith('/') ? `${window.location.origin}${url}` : url;

    const tryShareWithImage = imageUrl && navigator.share;

    if (tryShareWithImage) {
      setSharing(true);
      try {
        const imageFullUrl = imageUrl.startsWith('http')
          ? imageUrl
          : `${window.location.origin}${imageUrl}`;
        const res = await fetch(imageFullUrl);
        if (!res.ok) throw new Error('Failed to load image');
        const blob = await res.blob();
        const filename = imageFilename ?? 'travel-result.png';
        const file = new File([blob], filename, { type: blob.type || 'image/png' });

        const shareData: ShareData = {
          title,
          text: title,
          url: fullUrl,
          files: [file],
        };

        if (typeof navigator.canShare === 'function' && !navigator.canShare(shareData)) {
          await shareUrlOnly(fullUrl);
        } else {
          await navigator.share(shareData);
        }
      } catch (err) {
        if ((err as Error).name === 'AbortError') {
          // User cancelled – do nothing
        } else {
          await shareUrlOnly(fullUrl);
        }
      } finally {
        setSharing(false);
      }
      return;
    }

    await shareUrlOnly(fullUrl);
  };

  return (
    <button
      onClick={share}
      disabled={sharing}
      className="flex-1 rounded-xl py-3 text-base font-semibold text-white transition disabled:opacity-60"
      type="button"
      style={{ backgroundColor: hover ? bgHover : bg }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {sharing ? 'Sharing…' : 'Share'}
    </button>
  );
};

export default ShareButton;

