import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';
import { updateBodyThemeAttribute } from './utils/use-root-color.ts';
import { themeModeStorage } from './utils/use-theme-mode.ts';

dayjs.extend(localizedFormat);
updateBodyThemeAttribute(themeModeStorage.getSnapshot());

const root = document.getElementById('root');
if (!root) throw new Error('No root element');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
