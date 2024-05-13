import { appRouter } from '@src/router.ts';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

const expressApp = express();

expressApp.use(cors({ origin: '*' }));

expressApp.use(
  '/trpc',
  createExpressMiddleware({
    router: appRouter,
    middleware: cors({ origin: '*' }),
  })
);

export { expressApp };
