import { Container } from '@react/chakra';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { ReactQueryDevtools, type QueryClient } from '@react/utils/queryHooks';

import type { JSX } from 'react';

interface IRouterContextProps {
  queryClient: QueryClient;
  auth: {
    isAuthenticated: boolean;
  };
}

function Root(): JSX.Element {
  return (
    <Container centerContent h='100vh' p={3}>
      <Outlet />
      <ReactQueryDevtools />
      <TanStackRouterDevtools />
    </Container>
  );
}

export const Route = createRootRouteWithContext<IRouterContextProps>()({
  component: Root,
});
