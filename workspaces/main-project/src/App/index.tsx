import { useAutoSignIn } from '@react/auth';
import { Preloader } from '@react/chakra/core';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import type { JSX } from 'react';

import { routeTree } from '~/routeTree.gen';
import { queryClient } from '~/utils/queryClient';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
    auth: {
      isAuthenticated: false,
    },
  },
});

export function App(): JSX.Element {
  const { isAuthenticated, isLoading } = useAutoSignIn();

  if (isLoading) {
    return <Preloader variant='global' />;
  }

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          isAuthenticated,
        },
      }}
    />
  );
}
