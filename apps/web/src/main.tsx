import { Routes } from '@generouted/react-router';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './global.scss';

const root = document.getElementById('root');
if (!root) throw new Error('No root element');

createRoot(root).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
