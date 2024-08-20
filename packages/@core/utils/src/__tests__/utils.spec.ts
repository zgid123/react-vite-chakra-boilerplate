import { describe, expect, it, vi } from 'vitest';
import { setTimeout } from 'node:timers/promises';

import { debounce, throttle } from '../utils';

describe('debounce', () => {
  it('calls function after delay', async () => {
    const mainFn = vi.fn();
    const subFn = vi.fn();

    const debounceFn = debounce(mainFn, {
      delay: 100,
    });

    const testFn = () => {
      subFn();

      debounceFn();
    };

    testFn();
    testFn();
    testFn();

    await setTimeout(100);

    expect(subFn).toBeCalledTimes(3);
    expect(mainFn).toBeCalledTimes(1);
  });
});

describe('throttle', () => {
  it('calls function after delay', async () => {
    const mainFn = vi.fn();
    const subFn = vi.fn();

    const throttleFn = throttle(mainFn, {
      delay: 100,
    });

    const testFn = () => {
      subFn();

      throttleFn();
    };

    testFn();
    testFn();

    await setTimeout(100);

    testFn();

    expect(subFn).toBeCalledTimes(3);
    expect(mainFn).toBeCalledTimes(2);
  });
});
