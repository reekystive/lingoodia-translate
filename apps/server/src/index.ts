import { appRouter } from './router.ts';

import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { createContext } from './context.ts';

const server = fastify({ maxParamLength: 5000 });

void server.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

async function bootstrap() {
  const port = Number(process.env.PORT ?? 4000);
  try {
    await server.listen({ port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
  const addresses = server.addresses();
  for (const address of addresses) {
    const isIpv6 = address.family.toLowerCase() === 'ipv6';
    const ip = isIpv6 ? `[${address.address}]` : address.address;
    const url = `http://${ip}:${address.port}/`;
    console.log('listening on %o port %o (%o)', address.address, address.port, url);
  }
}

void bootstrap();

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
