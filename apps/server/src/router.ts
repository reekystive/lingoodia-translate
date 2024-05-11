import { observable } from '@trpc/server/observable';
import { z } from 'zod';
import { publicProcedure, router } from './trpc.ts';
import { delay } from './utils.ts';

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    await delay(10);
    const users = ['Alice', 'Bob', 'Charlie'];
    return users;
  }),
  userById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    await delay(10);
    const user = { id: input };
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string(), id: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      await delay(10);
      const user = input;
      return user;
    }),
  randomNumber: publicProcedure.subscription(() => {
    return observable<{ randomNumber: number }>((emit) => {
      const timer = setInterval(() => {
        emit.next({ randomNumber: Math.random() });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    });
  }),
});
