import { Box } from '@react/chakra';

import type { JSX, ReactNode } from 'react';

interface IMainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: IMainLayoutProps): JSX.Element {
  return <Box>{children}</Box>;
}
