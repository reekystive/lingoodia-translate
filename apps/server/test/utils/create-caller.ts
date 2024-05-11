import { AnyRouter, createCallerFactory } from '@trpc/server';

export const createCaller = <TRouter extends AnyRouter>(router: TRouter) => {
  const create = createCallerFactory();
  const caller = create(router);
  return caller({});
};
