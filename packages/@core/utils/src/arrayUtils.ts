import { isNullish } from 'remeda';

type TWrapArrayReturn<T> = T extends unknown[] ? T : T[];

export function wrapArray<T>(data?: T): TWrapArrayReturn<T> {
  if (isNullish(data)) {
    return [] as TWrapArrayReturn<T>;
  }

  return (Array.isArray(data) ? data : [data]) as TWrapArrayReturn<T>;
}
