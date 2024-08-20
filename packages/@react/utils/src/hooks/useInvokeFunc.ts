import { useCallback } from 'react';
import { debounce, throttle, type TCallback } from '@core/utils';

interface IOptionsProps {
  delay?: number;
  invokeType?: 'throttle' | 'debounce';
}

export function useInvokeFunc<T extends TCallback>(
  callback: T,
  { delay = 500, invokeType = 'debounce' }: IOptionsProps = {},
): ReturnType<typeof debounce<T>> {
  const invoke = invokeType === 'debounce' ? debounce : throttle;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    invoke(callback, {
      delay,
    }),
    [],
  );
}
