import { useSyncExternalStore } from 'react';

export type ThemeMode = 'dark' | 'light';

const DARK_QUERY = '(prefers-color-scheme: dark)';

class ThemeModeStorage {
  private listeners = new Set<() => void>();
  constructor() {
    window.matchMedia(DARK_QUERY).addEventListener('change', () => {
      this.listeners.forEach((listener) => listener());
    });
  }
  public getSnapshot = () => {
    const localStorageValue = window.localStorage.getItem('theme-mode') as ThemeMode | null;
    if (localStorageValue) {
      return localStorageValue;
    }
    const matchValue: ThemeMode = window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
    return matchValue;
  };
  public subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  public setThemeMode = (newThemeMode: ThemeMode) => {
    const matchValue: ThemeMode = window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
    if (newThemeMode === matchValue) {
      localStorage.removeItem('theme-mode');
    } else {
      localStorage.setItem('theme-mode', newThemeMode);
    }
    this.listeners.forEach((listener) => listener());
  };
}

export const themeModeStorage = new ThemeModeStorage();

export const useThemeMode = () => {
  const themeMode = useSyncExternalStore(themeModeStorage.subscribe, themeModeStorage.getSnapshot);
  const toggleThemeMode = () => {
    const newThemeMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    themeModeStorage.setThemeMode(newThemeMode);
  };
  return { themeMode, toggleThemeMode, setThemeMode: themeModeStorage.setThemeMode };
};
