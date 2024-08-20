import { Stack } from '@chakra-ui/react';
import { useForm, required } from '@react/utils/useForm';

import type { JSX } from 'react';

import { Form } from '../Form';
import { Button } from '../../Button';
import { FormInput } from '../FormInput';

interface IFormValuesProps {
  email: string;
}

export function DefaultForm(): JSX.Element {
  const { control, watch, handleSubmit } = useForm<IFormValuesProps>({
    defaultValues: {
      email: 'alphanolucifer@gmail.com',
    },
  });

  const submit = () => {
    alert(JSON.stringify(watch()));
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Stack spacing={6}>
        <FormInput
          name='email'
          label='Email'
          control={control}
          supportiveText='Your email'
          rules={{
            validate: {
              required: required(),
            },
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
    </Form>
  );
}
