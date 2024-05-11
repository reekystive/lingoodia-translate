import { AnyRouter } from '@trpc/server';
import {
  CreateExpressContextOptions,
  createExpressMiddleware,
} from '@trpc/server/adapters/express';
import express from 'express';
import { AddressInfo } from 'net';

function printAddress(address: string | AddressInfo | null) {
  if (!address) {
    console.log('listening');
  } else if (typeof address === 'string') {
    console.log('listening on %o', address);
  } else {
    const isIpv6 = address.family.toLowerCase() === 'ipv6';
    const host = isIpv6 ? `[${address.address}]` : address.address;
    const url = `http://${host}:${address.port}/`;
    console.log('listening on %o port %o (%o)', address.address, address.port, url);
  }
}

const createContext = ({ req: _req, res: _res }: CreateExpressContextOptions) => ({}); // no context

export async function startDevServer(props: { router: AnyRouter; port: number }) {
  const app = express();
  app.use(
    '/trpc',
    createExpressMiddleware({
      router: props.router,
      createContext,
    })
  );

  let server: ReturnType<typeof app.listen> | null = null;

  function start() {
    return new Promise<void>((resolve, reject) => {
      server = app.listen(props.port);
      server.once('error', reject);
      server.once('listening', () => {
        printAddress(server?.address() ?? null);
        resolve();
      });
    });
  }

  function shutdown() {
    return new Promise<void>((resolve) => {
      server?.close(() => {
        console.log('server closed');
        resolve();
      });
    });
  }

  if (import.meta.hot) {
    import.meta.hot.on('vite:beforeFullReload', () => {
      console.log('[vite-node] Hot reloading...');
      void shutdown();
    });
  }

  await start();
}
