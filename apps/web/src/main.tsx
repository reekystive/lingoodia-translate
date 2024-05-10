import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app.tsx';

dayjs.extend(localizedFormat);

const root = document.getElementById('root');
if (!root) throw new Error('No root element');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
