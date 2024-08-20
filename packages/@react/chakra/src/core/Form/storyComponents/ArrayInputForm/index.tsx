import uniqid from 'uniqid';
import { SimpleGrid, Stack } from '@chakra-ui/react';
import { useForm, required, FormProvider } from '@react/utils/useForm';

import type { JSX } from 'react';

import { Form } from '../../Form';
import { Product } from './Product';
import { Button } from '../../../Button';
import { FormArrayInput } from '../../FormArrayInput';

import type { IFormValuesProps } from './interface';

export function ArrayInputForm(): JSX.Element {
  const methods = useForm<IFormValuesProps>({
    defaultValues: {
      products: [],
    },
  });

  const { control, handleSubmit } = methods;

  const submit = (data: IFormValuesProps) => {
    alert(JSON.stringify(data));
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <FormProvider {...methods}>
        <Stack spacing={6}>
          <FormArrayInput
            name='products'
            control={control}
            label='Product List'
            addMoreButton={{
              text: 'Add Product',
              onClick: ({ add }) => {
                return () => {
                  add({
                    id: uniqid(),
                    name: '',
                  });
                };
              },
            }}
            render={({ fields, remove, arrayName }) => {
              return (
                <SimpleGrid columns={2} spacing={10}>
                  {fields.map((field, index) => {
                    return (
                      <Product
                        index={index}
                        field={field}
                        remove={remove}
                        key={field.inputId}
                        arrayName={arrayName}
                        rules={{
                          validate: {
                            required: required(),
                          },
                        }}
                      />
                    );
                  })}
                </SimpleGrid>
              );
            }}
          />
          <Button
            type='submit'
            style={{
              placeSelf: 'flex-start',
            }}
          >
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Form>
  );
}
