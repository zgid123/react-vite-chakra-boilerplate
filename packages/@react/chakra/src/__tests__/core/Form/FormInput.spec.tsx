import { Stack, Text } from '@chakra-ui/react';
import { describe, expect, it, suite } from 'vitest';
import { required, useForm } from '@react/utils/useForm';
import {
  waitFor,
  getByTag,
  fireEvent,
  getByName,
  getByClassName,
} from '@internal/vitest/testing-library';

import type { JSX, ReactNode } from 'react';

import { renderWithTheme } from '../../utils';
import { Form, FormInput } from '../../../core/Form';

interface IFormValuesProps {
  name: string;
}

interface ITestFormProps {
  label?: string;
  attachment?: ReactNode;
  supportiveText?: string;
}

function TestForm({
  label,
  attachment,
  supportiveText,
}: ITestFormProps): JSX.Element {
  const { control } = useForm<IFormValuesProps>({
    defaultValues: {
      name: '',
    },
  });

  return (
    <Form>
      <FormInput
        name='name'
        label={label}
        control={control}
        attachment={attachment}
        supportiveText={supportiveText}
        rules={{
          validate: {
            required: required(),
          },
        }}
      />
    </Form>
  );
}

describe('FormArrayInput', () => {
  suite('valid input', () => {
    suite('default', () => {
      it('renders FormInput', async () => {
        const { queryByText } = renderWithTheme(<TestForm />);

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
          const requiredSpan = queryByText('Required');

          expect(requiredSpan).not.toBeInTheDocument();
        });
      });
    });

    suite('with label', () => {
      it('renders FormInput with label', async () => {
        const { queryByText } = renderWithTheme(
          <TestForm label='Label Name' />,
        );

        const form = getByTag('form');
        const nameInput = getByName('name');
        const label = getByClassName('chakra-form__label');

        expect(form).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(label.textContent).toBe('Label Name');

        fireEvent.input(nameInput, {
          target: {
            value: 'test',
          },
        });

        fireEvent.blur(nameInput);

        await waitFor(() => {
          const requiredSpan = queryByText('Required');

          expect(requiredSpan).not.toBeInTheDocument();
        });
      });
    });

    suite('with supportiveText', () => {
      it('renders FormInput with supportiveText', async () => {
        const { queryByText } = renderWithTheme(
          <TestForm supportiveText='Supportive Name' />,
        );

        const form = getByTag('form');
        const nameInput = getByName('name');
        const supportiveText = getByClassName('chakra-form__helper-text');

        expect(form).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(supportiveText).toBeInTheDocument();
        expect(supportiveText.textContent).toBe('Supportive Name');

        fireEvent.input(nameInput, {
          target: {
            value: 'test',
          },
        });

        fireEvent.blur(nameInput);

        await waitFor(() => {
          const requiredSpan = queryByText('Required');

          expect(requiredSpan).not.toBeInTheDocument();
        });
      });
    });

    suite('with attachment', () => {
      it('renders FormInput with attachment', async () => {
        const { queryByText } = renderWithTheme(
          <TestForm
            attachment={
              <Stack>
                <Text>Test attachment</Text>
              </Stack>
            }
          />,
        );

        const form = getByTag('form');
        const nameInput = getByName('name');
        const attachment = getByClassName('chakra-stack');

        expect(form).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(attachment).toBeInTheDocument();
        expect(attachment.textContent).toBe('Test attachment');

        fireEvent.input(nameInput, {
          target: {
            value: 'test',
          },
        });

        fireEvent.blur(nameInput);

        await waitFor(() => {
          const requiredSpan = queryByText('Required');

          expect(requiredSpan).not.toBeInTheDocument();
        });
      });
    });
  });

  suite('invalid input', () => {
    it('renders error message', async () => {
      const { getByText } = renderWithTheme(<TestForm />);

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
        const requiredSpan = getByText('Required');

        expect(requiredSpan).toBeInTheDocument();
      });
    });
  });
});
