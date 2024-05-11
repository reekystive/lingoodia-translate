import type { AppRouter } from '@lingoodia/server/src/index.ts';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: SERVER_BASE_URL })],
});
