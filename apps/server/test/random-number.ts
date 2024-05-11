import { expect, test } from 'vitest';
import { appRouter } from '../src/router.ts';
import { createCaller } from './utils/create-caller.ts';

test('get random number', () => {
  const caller = createCaller(appRouter);
  const randomNumber = caller.randomNumber();
  expect(randomNumber).toBeDefined();
});
