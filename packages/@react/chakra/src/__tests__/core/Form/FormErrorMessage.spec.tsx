import { describe, expect, it, suite } from 'vitest';
import { FormProvider, required, useForm } from '@react/utils/useForm';
import {
  waitFor,
  getByTag,
  fireEvent,
  getByName,
  getByClassName,
  queryByClassName,
} from '@internal/vitest/testing-library';

import type { JSX } from 'react';

import { renderWithTheme } from '../../utils';
import { Form, FormInput, FormErrorMessage } from '../../../core/Form';

interface IFormValuesProps {
  name: string;
}

function TestForm(): JSX.Element {
  const methods = useForm<IFormValuesProps>({
    defaultValues: {
      name: '',
    },
  });

  const { control } = methods;

  return (
    <Form>
      <FormProvider {...methods}>
        <FormInput
          name='name'
          control={control}
          rules={{
            validate: {
              required: required(),
            },
          }}
        />
        <FormErrorMessage name='name' control={control} />
      </FormProvider>
    </Form>
  );
}

describe('FormErrorMessage', () => {
  suite('valid input', () => {
    it('does not render error message', async () => {
      renderWithTheme(<TestForm />);

      const form = getByTag('form');
      const nameInput = getByName('name');

      expect(form).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();

      fireEvent.input(nameInput, {
        target: {
          value: 'test',
        },
      });

      fireEvent.blur(nameInput);

      await waitFor(() => {
        const formErrorMessage = queryByClassName('form-error-message');

        expect(formErrorMessage).not.toBeInTheDocument();
      });
    });
  });

  suite('invalid input', () => {
    it('renders error message', async () => {
      renderWithTheme(<TestForm />);

      const form = getByTag('form');
      const nameInput = getByName('name');

      expect(form).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();

      fireEvent.input(nameInput, {
        target: {
          value: '',
        },
      });

      fireEvent.blur(nameInput);

      await waitFor(() => {
        const formErrorMessage = getByClassName('form-error-message');

        expect(formErrorMessage).toBeInTheDocument();
      });
    });
  });

  suite('without form provider', () => {
    function TestForm(): JSX.Element {
      const { control } = useForm<IFormValuesProps>({
        defaultValues: {
          name: '',
        },
      });

      return (
        <Form>
          <FormInput
            name='name'
            control={control}
            rules={{
              validate: {
                required: required(),
              },
            }}
          />
          <FormErrorMessage name='name' control={control} />
        </Form>
      );
    }

    it('does not render error message', async () => {
      renderWithTheme(<TestForm />);

      const form = getByTag('form');
      const nameInput = getByName('name');

      expect(form).toBeInTheDocument();
      expect(nameInput).toBeInTheDocument();

      fireEvent.input(nameInput, {
        target: {
          value: '',
        },
      });

      fireEvent.blur(nameInput);

      await waitFor(() => {
        const formErrorMessage = queryByClassName('form-error-message');

        expect(formErrorMessage).not.toBeInTheDocument();
      });
    });
  });
});
