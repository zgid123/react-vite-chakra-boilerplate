import { screen } from '@testing-library/react';

import type { TScreen } from './interface';

export function getById(
  id: string,
  screenContext: TScreen = screen,
): HTMLElement {
  return screenContext.getByText((_, e) => {
    return e?.id === id;
  });
}
