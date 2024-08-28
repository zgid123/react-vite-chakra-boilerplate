import { Text } from '@chakra-ui/react';
import { describe, expect, it, suite } from 'vitest';
import { getByClassName } from '@config/vitest/testing-library';

import { renderWithTheme } from '../../utils';
import { FormWrapper } from '../../../core/Form';

describe('FormWrapper', () => {
  suite('default', () => {
    it('renders FormWrapper', () => {
      renderWithTheme(<FormWrapper />);

      const formWrapper = getByClassName('form-wrapper');

      expect(formWrapper).toBeInTheDocument();
      expect(formWrapper.textContent).toBe('');
    });
  });

  suite('with children', () => {
    it('renders FormWrapper and its children', () => {
      renderWithTheme(
        <FormWrapper>
          <Text>Test Children</Text>
        </FormWrapper>,
      );

      const formWrapper = getByClassName('form-wrapper');

      expect(formWrapper).toBeInTheDocument();
      expect(formWrapper.textContent).toBe('Test Children');
    });
  });

  suite('with label', () => {
    it('renders FormWrapper and its label', () => {
      renderWithTheme(<FormWrapper label='Test Label' />);

      const formWrapper = getByClassName('form-wrapper');
      const formWrapperLabel = getByClassName('form-wrapper__label');

      expect(formWrapper).toBeInTheDocument();
      expect(formWrapperLabel).toBeInTheDocument();
      expect(formWrapperLabel.textContent).toBe('Test Label');
    });
  });

  suite('with supportiveText', () => {
    it('renders FormWrapper and its supportiveText', () => {
      renderWithTheme(<FormWrapper supportiveText='Test Supportive Text' />);

      const formWrapper = getByClassName('form-wrapper');
      const formWrapperSupportiveText = getByClassName(
        'form-wrapper__supportive-text',
      );

      expect(formWrapper).toBeInTheDocument();
      expect(formWrapperSupportiveText).toBeInTheDocument();
      expect(formWrapperSupportiveText.textContent).toBe(
        'Test Supportive Text',
      );
    });
  });
});
