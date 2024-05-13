import { createContext } from '@src/context/create-context.ts';
import { appRouter } from '@src/router.ts';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from 'ws';

const wsServer = new ws.Server({
  port: 3001,
});

const handler = applyWSSHandler({ wss: wsServer, router: appRouter, createContext });

wsServer.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wsServer.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wsServer.clients.size})`);
  });
});

console.log('✅ WebSocket Server listening on ws://localhost:3001');

process.on('SIGTERM', () => {
  console.log('SIGTERM');
  handler.broadcastReconnectNotification();
  wsServer.close();
});
