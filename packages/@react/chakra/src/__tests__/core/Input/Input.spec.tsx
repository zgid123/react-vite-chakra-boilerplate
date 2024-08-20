import { EmailIcon } from '@chakra-ui/icons';
import { describe, expect, it, suite } from 'vitest';
import { getByClassName, getByTag } from '@internal/vitest/testing-library';

import { Input } from '../../../core/Input';
import { renderWithTheme } from '../../utils';

describe('Input', () => {
  suite('default', () => {
    it('renders Input', () => {
      renderWithTheme(<Input />);

      const inputGroup = getByClassName('chakra-input__group');
      const input = getByClassName('chakra-input');

      expect(inputGroup).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
  });

  suite('with left element', () => {
    it('renders Input', () => {
      renderWithTheme(<Input leftElement={<EmailIcon />} />);

      const inputGroup = getByClassName('chakra-input__group');
      const input = getByClassName('chakra-input');
      const leftElement = getByClassName('chakra-input__left-element');
      const icon = getByTag('svg');

      expect(inputGroup).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(leftElement).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });

  suite('with left element', () => {
    it('renders Input', () => {
      renderWithTheme(<Input rightElement={<EmailIcon />} />);

      const inputGroup = getByClassName('chakra-input__group');
      const input = getByClassName('chakra-input');
      const rightElement = getByClassName('chakra-input__right-element');
      const icon = getByTag('svg');

      expect(inputGroup).toBeInTheDocument();
      expect(input).toBeInTheDocument();
      expect(rightElement).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });
});
