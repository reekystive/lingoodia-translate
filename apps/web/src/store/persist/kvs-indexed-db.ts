import { kvsIndexedDB } from '@kvs/indexeddb';

interface Schema {
  'openai-api-key': string;
}

const kvs = await kvsIndexedDB<Schema>({
  name: 'lingoodia-kvs',
  version: 1,
});

export { kvs };

if (import.meta.env.DEV) {
  // @ts-expect-error for debugging
  window.kvs = kvs;
}
