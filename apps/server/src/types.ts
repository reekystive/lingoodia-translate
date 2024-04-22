// define import.meta.hot as boolean | undefined;

declare global {
  interface ImportMeta {
    hot?: {
      on: (event: 'vite:beforeFullReload', cb: () => void) => void;
      dispose: (cb: () => void) => void;
    };
  }
}

export {};
