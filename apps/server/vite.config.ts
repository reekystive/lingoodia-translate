import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['vitest.setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['html', 'text-summary', 'lcovonly'],
      all: true,
    },
    testTimeout: 15000,
  },
  ssr: { noExternal: true },
  server: { port: 4000 },
  plugins: [tsconfigPaths()],
  build: {
    ssr: true,
    sourcemap: true,
    rollupOptions: {
      input: 'src/index.ts',
      output: {
        format: 'esm',
        entryFileNames: '[name].mjs',
      },
    },
  },
});
