import '@fontsource/belanosima';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Routes } from '@generouted/react-router';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { FC } from 'react';
import './global.scss';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
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
});

export const App: FC = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};
