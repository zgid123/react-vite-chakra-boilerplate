type TWrapArrayReturn<T> = T extends unknown[] ? T : T[];

export function wrapArray<T>(data?: T): TWrapArrayReturn<T> {
  let result = data ?? [];

  return (Array.isArray(result) ? result : [result]) as TWrapArrayReturn<T>;
}
