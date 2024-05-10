import { useEffect } from 'react';
import { updateMetaThemeColor, updateRootColor } from './update-root-color.ts';
import { ThemeMode, useThemeMode } from './use-theme-mode.ts';

export const useRootColor = (color: `#${string}`) => {
  useEffect(() => {
    updateRootColor(color);
  }, [color]);
  return color;
};

export const useMetaThemeColor = (color: `#${string}`) => {
  useEffect(() => {
    updateMetaThemeColor(color);
  }, [color]);
  return color;
};

export const updateBodyThemeAttribute = (themeMode: ThemeMode) => {
  if (themeMode === 'dark') {
    document.body.setAttribute('data-mode', 'dark');
  } else {
    document.body.setAttribute('data-mode', 'light');
  }
};

export const useBodyThemeAttribute = () => {
  const { themeMode } = useThemeMode();
  useEffect(() => {
    updateBodyThemeAttribute(themeMode);
  }, [themeMode]);
};
