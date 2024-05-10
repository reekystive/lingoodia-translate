import { ThemeOptions, createTheme } from '@mui/material';
import { produce } from 'immer';
import { useMemo } from 'react';
import { ThemeMode } from '../utils/use-theme-mode.ts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No root element found');
}

const muiTheme: ThemeOptions = {
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
  typography: {
    fontFamily: [
      'Inter Variable',
      'Inter',
      'system-ui',
      'Avenir',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#b77a71',
      '50': '#faf7f6',
      '100': '#f5eceb',
      '200': '#eeddda',
      '300': '#e1c4c0',
      '400': '#cfa19a',
      '500': '#b77a71',
      '600': '#a4675e',
      '700': '#89544c',
      '800': '#724842',
      '900': '#61403b',
      A100: '#f5eceb',
      A200: '#eeddda',
      A400: '#cfa19a',
      A700: '#89544c',
      contrastText: '#fff',
      dark: '#89544c',
      light: '#f5eceb',
    },
  },
};

export const useAppMuiTheme = (themeMode: ThemeMode) => {
  const theme = useMemo(() => {
    const newThemeOptions = produce(muiTheme, (draft) => {
      if (draft.palette) {
        draft.palette.mode = themeMode;
      }
    });
    return createTheme(newThemeOptions);
  }, [themeMode]);
  return theme;
};
