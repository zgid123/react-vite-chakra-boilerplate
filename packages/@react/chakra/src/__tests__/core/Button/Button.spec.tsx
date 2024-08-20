import { combine } from '@core/utils/stringUtils';
import { describe, expect, it, suite } from 'vitest';
import { getByClassName } from '@internal/vitest/testing-library';

import { Button } from '../../../core/Button';
import { renderWithTheme } from '../../utils';

describe('Button', () => {
  suite('default', () => {
    it('renders default Button', () => {
      renderWithTheme(<Button>Test</Button>);

      const button = getByClassName('chakra-button');

      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe('Test');
    });
  });

  suite('loading state without custom loadingText', () => {
    it('renders loading Button', () => {
      renderWithTheme(<Button isLoading>Test</Button>);

      const button = getByClassName('chakra-button');
      const spinner = getByClassName('chakra-button__spinner');

      expect(button).toBeInTheDocument();
      expect(spinner).toBeInTheDocument();

      expect(button.textContent).toBe(
        combine(
          {
            joinWith: '',
          },
          spinner.textContent || '',
          'Test',
        ),
      );
    });
  });

  suite('loading state with custom loadingText', () => {
    it('renders loading Button and loadingText', () => {
      renderWithTheme(
        <Button isLoading loadingText='Custom Text'>
          Test
        </Button>,
      );

      const button = getByClassName('chakra-button');
      const spinner = getByClassName('chakra-button__spinner');

      expect(button).toBeInTheDocument();
      expect(spinner).toBeInTheDocument();

      expect(button.textContent).toBe(
        combine(
          {
            joinWith: '',
          },
          spinner.textContent || '',
          'Custom Text',
        ),
      );
    });
  });
});
