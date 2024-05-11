import { ThemeMode } from '../../utils/use-theme-mode.ts';

interface Schema {
  'theme-mode': ThemeMode;
}

import TypedLocalStore from 'typed-local-store';

export const typedStorage = new TypedLocalStore<Schema>();
