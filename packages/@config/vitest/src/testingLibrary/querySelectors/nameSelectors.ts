import { screen } from '@testing-library/react';

import type { TScreen } from './interface';

export function getByName(
  name: string,
  screenContext: TScreen = screen,
): HTMLElement {
  return screenContext.getByText((_, e) => {
    return e?.getAttribute('name')?.trim() === name;
  });
}

export function queryByName(
  name: string,
  screenContext: TScreen = screen,
): HTMLElement | null {
  return screenContext.queryByText((_, e) => {
    return e?.getAttribute('name')?.trim() === name;
  });
}
