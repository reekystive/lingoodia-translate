import { appRouter } from '@src/router.ts';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const cloudflareWorker = {
  async fetch(request: Request): Promise<Response> {
    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });
  },
};
