import { z } from 'zod';
import { publicProcedure, router } from './trpc.ts';
import { wait } from './utils.ts';

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    await wait(10);
    const users = ['Alice', 'Bob', 'Charlie'];
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    await wait(10);
    const user = { id: input };
    return user;
  }),
  userCreate: publicProcedure.input(z.object({ name: z.string(), id: z.string() })).mutation(async (opts) => {
    const { input } = opts;
    await wait(10);
    const user = input;
    return user;
  }),
});
