export const dangerouslyPerformLongSyncTask = (ms: number) => {
  const start = performance.now();
  while (performance.now() - start < ms) {
    // do nothing
  }
};
