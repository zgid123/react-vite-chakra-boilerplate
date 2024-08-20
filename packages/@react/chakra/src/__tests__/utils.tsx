import '@testing-library/jest-dom';

import { render, renderHook } from '@internal/vitest/testing-library';

import type { JSX } from 'react';

import { ThemeV1Provider } from '../core/ThemeProvider';

export function renderWithTheme(
  component: JSX.Element,
): ReturnType<typeof render> {
  return render(component, {
    wrapper: ({ children }) => {
      return <ThemeV1Provider>{children}</ThemeV1Provider>;
    },
  });
}

export const renderHookWithTheme: typeof renderHook = (
  renderFunc,
  options = {},
) => {
  return renderHook(renderFunc, {
    wrapper: ({ children }) => {
      return <ThemeV1Provider>{children}</ThemeV1Provider>;
    },
    ...options,
  });
};
