import { Text } from '@chakra-ui/react';
import { describe, expect, it, suite } from 'vitest';

import { Show } from '../../../core';
import { renderWithTheme } from '../../utils';

describe('Show', () => {
  suite('with when is true', () => {
    it('renders children', () => {
      const { getByText } = renderWithTheme(
        <Show when={true}>
          <Text>Test</Text>
        </Show>,
      );

      const testText = getByText('Test');

      expect(testText).toBeInTheDocument();
      expect(testText.textContent).toBe('Test');
    });
  });

  suite('with when is false', () => {
    it('does not render children', () => {
      const { queryByText } = renderWithTheme(
        <Show when={false}>
          <Text>Test</Text>
        </Show>,
      );

      const testText = queryByText('Test');

      expect(testText).not.toBeInTheDocument();
    });
  });
});
