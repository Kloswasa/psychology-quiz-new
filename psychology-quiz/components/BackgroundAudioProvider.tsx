'use client';

import { useEffect, useRef } from 'react';

const BACKGROUND_AUDIO_SRC = '/sounds/background.mp3';

export function BackgroundAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(BACKGROUND_AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const startAudio = () => {
      if (startedRef.current || !audioRef.current) return;
      startedRef.current = true;
      const playPromise = audioRef.current.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.catch(() => {
          // Ignore autoplay errors; playback will be retried on next interaction
        });
      }
    };

    // Try to start immediately (may be blocked), and also on first user interaction
    startAudio();

    window.addEventListener('pointerdown', startAudio);
    window.addEventListener('keydown', startAudio);
    window.addEventListener('touchstart', startAudio);

    return () => {
      window.removeEventListener('pointerdown', startAudio);
      window.removeEventListener('keydown', startAudio);
      window.removeEventListener('touchstart', startAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return <>{children}</>;
}

