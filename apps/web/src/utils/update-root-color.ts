const META_THEME_COLOR_ID = 'meta-theme-color';

export const updateMetaThemeColor = (color: `#${string}`) => {
  const metaThemeColor = document.getElementById(META_THEME_COLOR_ID);
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', color);
  }
};

export const updateRootColor = (color: `#${string}`) => {
  // set background color to :root
  const root = document.documentElement;
  root.style.setProperty('--theme-color', color);
};
