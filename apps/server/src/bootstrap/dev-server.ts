import { AnyRouter } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
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

export async function startDevServer(props: { router: AnyRouter; port: number }) {
  const server = createHTTPServer({
    router: props.router,
    middleware: cors(),
    createContext: () => ({}),
  });

  function start() {
    return new Promise<void>((resolve, reject) => {
      server.server.once('error', (err) => {
        console.error(err);
        reject(err);
      });
      server.server.once('listening', () => {
        const address = server.server.address();
        printAddress(address);
        resolve();
      });
      server.listen(props.port);
    });
  }

  function shutdown() {
    return new Promise<void>((resolve) => {
      server.server.once('close', resolve);
      server.server.close();
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
