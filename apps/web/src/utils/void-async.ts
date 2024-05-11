export function letRun(callback: () => void | Promise<void>) {
  void callback();
}
