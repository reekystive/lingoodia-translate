import { useEffect } from 'react';
import { updateMetaThemeColor, updateRootColor } from './update-root-color.ts';
import { useThemeMode } from './use-theme-mode.ts';

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

export const useBodyThemeAttribute = () => {
  const { themeMode } = useThemeMode();
  useEffect(() => {
    if (themeMode === 'dark') {
      document.body.setAttribute('data-mode', 'dark');
    } else {
      document.body.setAttribute('data-mode', 'light');
    }
  }, [themeMode]);
};
