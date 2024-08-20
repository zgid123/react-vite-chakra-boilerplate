import { screen } from '@testing-library/react';

import type { TScreen } from './interface';

export function getByTag(
  tagName: string,
  screenContext: TScreen = screen,
): HTMLElement {
  return screenContext.getByText((_, e) => {
    return e?.tagName.toLowerCase() === tagName;
  });
}

export function getAllByTag(
  tagName: string,
  screenContext: TScreen = screen,
): HTMLElement[] {
  return screenContext.getAllByText((_, e) => {
    return e?.tagName.toLowerCase() === tagName;
  });
}
