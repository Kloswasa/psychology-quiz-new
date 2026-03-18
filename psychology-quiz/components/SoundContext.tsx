'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
};

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabledState] = useState(true);

  // Load initial state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem('bg-sound-enabled');
    if (stored === '0') {
      setEnabledState(false);
    }
  }, []);

  const setEnabled = (value: boolean) => {
    setEnabledState(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('bg-sound-enabled', value ? '1' : '0');
    }
  };

  const value = useMemo(
    () => ({
      enabled,
      setEnabled,
    }),
    [enabled]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return ctx;
}

