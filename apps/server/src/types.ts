/* eslint-disable @typescript-eslint/no-namespace */
// define import.meta.hot as boolean | undefined;

declare global {
  interface ImportMeta {
    hot?: {
      on: (event: 'vite:beforeFullReload', cb: () => void) => void;
      dispose: (cb: () => void) => void;
    };
  }
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production';
      PORT?: string;
    }
  }
}

export {};
