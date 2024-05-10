import '@fontsource-variable/inter';
import '@fontsource/belanosima';
import { Routes } from '@generouted/react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { FC } from 'react';
import './global.scss';
import { muiTheme } from './theme/mui-theme.ts';

export const App: FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
