import { AppRouter } from '@src/index.ts';
import { NodeHTTPCreateContextFn } from '@trpc/server/adapters/node-http';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import http from 'http';

// created for each request
export const createContext: NodeHTTPCreateContextFn<
  AppRouter,
  http.IncomingMessage,
  http.ServerResponse
  // express.Request,
  // express.Response
> = async ({ req, res }) => {
  return {
    req,
    res,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

createHTTPServer;
