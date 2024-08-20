export type TCallback = (...args: TAny[]) => TAny;

interface IIntervalOptions {
  delay?: number;
}

export function debounce<T extends TCallback>(
  func: T,
  opts?: IIntervalOptions,
): (...args: Parameters<T>) => void {
  const { delay } = opts || {};

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func?.(args);
    }, delay);
  };
}

export function throttle<T extends TCallback>(
  func: T,
  opts?: IIntervalOptions,
): (...args: Parameters<T>) => void {
  let lastInvokeTime = 0;
  const { delay = 1000 } = opts || {};

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastInvokeTime >= delay) {
      func?.(args);

      lastInvokeTime = now;
    }
  };
}
