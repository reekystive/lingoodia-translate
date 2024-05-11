import { useEffect } from 'react';
import { useMedia } from 'react-use';
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

export const useThemeColor = () => {
  const isDesktop = useMedia('(min-width: 640px)');
  const { themeMode } = useThemeMode();
  useEffect(() => {
    if (themeMode === 'dark') {
      updateRootColor('#151312');
      if (isDesktop) {
        updateMetaThemeColor('#1B1514');
      } else {
        updateMetaThemeColor('#151312');
      }
    } else {
      updateRootColor('#F9F5F4');
      if (isDesktop) {
        updateMetaThemeColor('#EEDDDA');
      } else {
        updateMetaThemeColor('#F9F5F4');
      }
    }
  }, [themeMode, isDesktop]);
};
