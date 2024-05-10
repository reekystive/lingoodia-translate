import { useEffect } from 'react';
import { updateMetaThemeColor, updateRootColor } from './update-root-color.ts';

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
