import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './router';

addEventListener('fetch', (event) => {
  event.respondWith(
    fetchRequestHandler({
      endpoint: '/trpc',
      req: event.request,
      router: appRouter,
      createContext: () => ({}),
    })
  );
});
