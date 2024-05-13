import { AddressInfo } from 'net';
import { expressApp } from './express.ts';

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

export async function startServer(props: { port: number }) {
  const server = expressApp.listen(props.port);
  server.once('listening', () => {
    printAddress(server.address() ?? null);
  });
  if (import.meta.hot) {
    import.meta.hot.on('vite:beforeFullReload', () => {
      console.log('[vite-node] Hot reloading...');
      void server.close();
    });
  }
}
