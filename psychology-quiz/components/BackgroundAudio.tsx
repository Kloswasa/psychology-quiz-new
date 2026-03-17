'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Global background audio that starts once the user first interacts
 * on the homepage and then keeps playing across route changes.
 */
export function BackgroundAudio() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Lazily create the Audio element once
  useEffect(() => {
    if (audioRef.current) return;
    const audio = new Audio('/sounds/main-bg.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Start playback on first user interaction while on the homepage
  useEffect(() => {
    if (hasStarted || pathname !== '/') return;
    if (!audioRef.current) return;

    const startAudio = () => {
      if (!audioRef.current) return;
      const playPromise = audioRef.current.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise
          .then(() => {
            setHasStarted(true);
            window.removeEventListener('click', startAudio);
            window.removeEventListener('touchstart', startAudio);
            window.removeEventListener('keydown', startAudio);
          })
          .catch(() => {
            // Ignore autoplay errors; user can trigger again
          });
      }
    };

    window.addEventListener('click', startAudio);
    window.addEventListener('touchstart', startAudio);
    window.addEventListener('keydown', startAudio);

    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
      window.removeEventListener('keydown', startAudio);
    };
  }, [hasStarted, pathname]);

  return null;
}

