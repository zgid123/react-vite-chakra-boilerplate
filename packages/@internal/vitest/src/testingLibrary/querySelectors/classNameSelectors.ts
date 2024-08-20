import { screen } from '@testing-library/react';

import type { TScreen } from './interface';

export function getByClassName(
  className: string | RegExp,
  screenContext: TScreen = screen,
): HTMLElement {
  return screenContext.getByText((_, e) => {
    if (className instanceof RegExp) {
      return className.test(e?.className || '');
    }

    return !!e?.classList.contains(className);
  });
}

export function getAllByClassName(
  className: string | RegExp,
  screenContext: TScreen = screen,
): HTMLElement[] {
  return screenContext.getAllByText((_, e) => {
    if (className instanceof RegExp) {
      return className.test(e?.className || '');
    }

    return !!e?.classList.contains(className);
  });
}

export function queryByClassName(
  className: string | RegExp,
  screenContext: TScreen = screen,
): HTMLElement | null {
  return screenContext.queryByText((_, e) => {
    if (className instanceof RegExp) {
      return className.test(e?.className || '');
    }

    return !!e?.classList.contains(className);
  });
}
