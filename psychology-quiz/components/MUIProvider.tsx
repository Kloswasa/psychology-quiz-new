'use client';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

// Create MD3 theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8b5cf6',
    },
  },
});

export default function MUIProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css', prepend: true });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
