import { ThemeMode } from '../../utils/use-theme-mode.ts';

interface Schema {
  'theme-mode': ThemeMode;
}

import TypedLocalStore from 'typed-local-store';

export const typedStorage = new TypedLocalStore<Schema>();

if (import.meta.env.DEV) {
  // @ts-expect-error for debugging
  window.typedStorage = typedStorage;
}
