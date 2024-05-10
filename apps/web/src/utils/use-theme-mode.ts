import { useSyncExternalStore } from 'react';

type ThemeMode = 'dark' | 'light';

const DARK_QUERY = '(prefers-color-scheme: dark)';

class ThemeModeStorage {
  private listeners = new Set<() => void>();
  public getSnapshot = () => {
    const localStorageValue = window.localStorage.getItem('theme-mode') as ThemeMode | null;
    if (localStorageValue) {
      return localStorageValue;
    }
    const matchValue: ThemeMode = window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
    localStorage.setItem('theme-mode', matchValue);
    return matchValue;
  };
  public subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  public setThemeMode = (newThemeMode: ThemeMode) => {
    localStorage.setItem('theme-mode', newThemeMode);
    this.listeners.forEach((listener) => listener());
  };
}

const themeModeStorage = new ThemeModeStorage();

export const useThemeMode = () => {
  const themeMode = useSyncExternalStore(themeModeStorage.subscribe, themeModeStorage.getSnapshot);
  const toggleThemeMode = () => {
    const newThemeMode: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    themeModeStorage.setThemeMode(newThemeMode);
  };
  return { themeMode, toggleThemeMode, setThemeMode: themeModeStorage.setThemeMode };
};
