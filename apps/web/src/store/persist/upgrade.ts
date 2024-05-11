export function upgrade() {
  // upgrade from 'light' to '"light"'
  const themeMode = localStorage.getItem('theme-mode');
  if (themeMode === 'light' || themeMode === 'dark') {
    localStorage.setItem('theme-mode', JSON.stringify(themeMode));
  }
}
