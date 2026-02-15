'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create MD3 theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8b5cf6', // Purple
    },
    secondary: {
      main: '#d946ef', // Pink
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default function MUIProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
