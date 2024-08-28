import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

import type { JSX } from 'react';

import { MainLayout } from '~/layouts';

function AuthLayout(): JSX.Element {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
  beforeLoad({ context, location }) {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
