import { Box, SimpleGrid } from '@chakra-ui/react';
import { describe, expect, it, suite } from 'vitest';
import { required, useForm } from '@react/utils/useForm';
import {
  waitFor,
  getByTag,
  fireEvent,
  getByName,
  queryByName,
} from '@config/vitest/testing-library';

import type { JSX } from 'react';

import { renderWithTheme } from '../../utils';
import { DeleteIcon } from '../../../core/Icon';
import { Form, FormArrayInput, FormInput } from '../../../core/Form';

interface IFormValuesProps {
  products: {
    name: string;
  }[];
}

function TestForm(): JSX.Element {
  const { control } = useForm<IFormValuesProps>({
    defaultValues: {
      products: [],
    },
  });

  return (
    <Form>
      <FormArrayInput
        name='products'
        control={control}
        label='Product List'
        addMoreButton={{
          text: 'Add Product',
          onClick: ({ add }) => {
            return () => {
              add({
                name: '',
              });
            };
          },
        }}
        render={({ fields, remove }) => {
          return (
            <SimpleGrid columns={2} spacing={10}>
              {fields.map((field, index) => {
                const handleRemove = () => {
                  remove(index);
                };

                return (
                  <Box key={field.inputId}>
                    <FormInput
                      label='Name'
                      control={control}
                      name={`products.${index}.name`}
                      rules={{
                        validate: {
                          required: required(),
                        },
                      }}
                    />
                    <DeleteIcon
                      m={2}
                      top={0}
                      w='20px'
                      h='20px'
                      right={0}
                      pos='absolute'
                      color='red.500'
                      cursor='pointer'
                      onClick={handleRemove}
                    />
                  </Box>
                );
              })}
            </SimpleGrid>
          );
        }}
      />
    </Form>
  );
}

describe('FormArrayInput', () => {
  suite('valid input', () => {
    it('renders FormArrayInput', async () => {
      const { getByText, queryByText } = renderWithTheme(<TestForm />);

      const form = getByTag('form');
      const addProductBtn = getByText('Add Product');

      fireEvent.click(addProductBtn);

      const productNameInput = getByName('products.0.name');

      expect(form).toBeInTheDocument();
      expect(productNameInput).toBeInTheDocument();

      fireEvent.input(productNameInput, {
        target: {
          value: 'test',
        },
      });

      fireEvent.blur(productNameInput);

      await waitFor(() => {
        const requiredSpan = queryByText('Required');

        expect(requiredSpan).not.toBeInTheDocument();
      });
    });
  });

  suite('invalid input', () => {
    it('renders error message', async () => {
      const { getByText } = renderWithTheme(<TestForm />);

      const form = getByTag('form');
      const addProductBtn = getByText('Add Product');

      fireEvent.click(addProductBtn);

      const productNameInput = getByName('products.0.name');

      expect(form).toBeInTheDocument();
      expect(productNameInput).toBeInTheDocument();

      fireEvent.input(productNameInput, {
        target: {
          value: '',
        },
      });

      fireEvent.blur(productNameInput);

      await waitFor(() => {
        const requiredSpan = getByText('Required');

        expect(requiredSpan).toBeInTheDocument();
      });
    });
  });

  suite('remove record when calling remove', () => {
    it('removes array element', async () => {
      const { getByText } = renderWithTheme(<TestForm />);

      const form = getByTag('form');
      const addProductBtn = getByText('Add Product');

      fireEvent.click(addProductBtn);

      const productNameInput = getByName('products.0.name');
      const svg = getByTag('svg');

      expect(form).toBeInTheDocument();
      expect(productNameInput).toBeInTheDocument();
      expect(svg).toBeInTheDocument();

      fireEvent.click(svg);

      await waitFor(() => {
        const productNameInput = queryByName('products.0.name');

        expect(productNameInput).not.toBeInTheDocument();
      });
    });
  });
});
