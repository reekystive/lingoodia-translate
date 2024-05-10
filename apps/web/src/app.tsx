import '@fontsource-variable/inter';
import '@fontsource/belanosima';
import { Routes } from '@generouted/react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { StyledEngineProvider } from '@mui/material/styles';
import { FC } from 'react';
import './global.scss';
import { useAppMuiTheme } from './theme/mui-theme.ts';
import { useBodyThemeAttribute, useThemeColor } from './utils/use-root-color.ts';
import { useThemeMode } from './utils/use-theme-mode.ts';

export const App: FC = () => {
  useBodyThemeAttribute();
  useThemeColor();
  const { themeMode } = useThemeMode();
  const muiTheme = useAppMuiTheme(themeMode);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
