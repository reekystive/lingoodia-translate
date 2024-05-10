import generouted from '@generouted/react-router/plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA as pwa } from 'vite-plugin-pwa';
import sassDts from 'vite-plugin-sass-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sassDts(),
    generouted(),
    pwa({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'Lingoodia Translate',
        short_name: 'Lingoodia',
        description: 'Lingoodia translate web application',
        theme_color: '#1B1514',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
      },
    }),
  ],
});
