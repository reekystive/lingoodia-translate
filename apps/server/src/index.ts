import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './router.ts';

const server = createHTTPServer({
  router: appRouter,
});

const port = Number(process.env.PORT ?? 4000);

server.listen(port);
server.server.once('listening', () => {
  const address = server.server.address();
  if (address === null) {
    return;
  }
  if (typeof address === 'object' && 'address' in address) {
    const isIpv6 = address.family.toLowerCase() === 'ipv6';
    const ip = isIpv6 ? `[${address.address}]` : address.address;
    const url = `http://${ip}:${address.port}/`;
    console.log('listening on %o port %o (%o)', address.address, address.port, url);
  } else {
    console.log('listening on %o', address);
  }
});

function shutdown() {
  return new Promise<void>((resolve) => {
    server.server.close(() => {
      resolve();
    });
  });
}

if (import.meta.hot) {
  console.log('[vite-node] hot reloading');
  import.meta.hot.on('vite:beforeFullReload', () => {
    void shutdown();
  });
}

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
