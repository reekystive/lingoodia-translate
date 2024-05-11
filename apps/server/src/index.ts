import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { startDevServer } from './bootstrap/dev-server.ts';
import { appRouter } from './router.ts';

if (process.env.NODE_ENV === 'development') {
  const port = Number(process.env.PORT) || 3000;
  void startDevServer({
    router: appRouter,
    port,
  });
}

// Export type router type signature, NOT the router itself.
export type AppRouter = typeof appRouter;

// For Cloudflare Workers
export default {
  async fetch(request: Request): Promise<Response> {
    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });
  },
};
