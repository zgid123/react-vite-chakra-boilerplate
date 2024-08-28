import { AuthService } from '@core/api';
import { authApi, authStore } from '@react/auth';
import { useRequest } from '@react/utils/queryHooks';
import { Button, Form, FormInput } from '@react/chakra/core';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Card, CardBody, Flex, Heading, Stack } from '@react/chakra';
import {
  email,
  useForm,
  required,
  type SubmitHandler,
} from '@react/utils/useForm';

import type { JSX } from 'react';

interface IFormValuesProps {
  email: string;
  password: string;
}

function SignIn(): JSX.Element {
  const navigate = Route.useNavigate();
  const search = Route.useSearch<Record<string, string>>();
  const signIn = authStore.use.signIn();

  const { control, handleSubmit } = useForm<IFormValuesProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useRequest(authApi.signIn, {
    onSuccess({ authToken, profile, refreshToken }) {
      signIn(profile);
      AuthService.setToken(authToken);
      AuthService.setRefreshToken(refreshToken);

      navigate({
        to: search.redirect || '/',
      });
    },
  });

  const submit: SubmitHandler<IFormValuesProps> = (data) => {
    mutate(data);
  };

  return (
    <Flex w='100vw' h='100vh' alignItems='center' justifyContent='center'>
      <Card py={10} px={20}>
        <CardBody>
          <Stack spacing={10}>
            <Heading alignSelf='center'>Sign In</Heading>
            <Stack as={Form} spacing={8} onSubmit={handleSubmit(submit)}>
              <FormInput
                name='email'
                label='Email'
                control={control}
                rules={{
                  validate: {
                    email: email(),
                    required: required(),
                  },
                }}
              />
              <FormInput
                name='password'
                type='password'
                label='Password'
                control={control}
                rules={{
                  validate: {
                    required: required(),
                  },
                }}
              />
              <Button type='submit' colorScheme='teal' isLoading={isPending}>
                Sign In
              </Button>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  );
}

export const Route = createFileRoute('/sign-in/')({
  component: SignIn,
  beforeLoad({ context, search }) {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: (search as Record<string, string>).redirect || '/',
      });
    }
  },
});
