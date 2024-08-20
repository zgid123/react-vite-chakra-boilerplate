import type { ReactNode, JSX } from 'react';

export interface IShowProps {
  when: boolean;
  children: ReactNode;
}

export function Show({ when, children }: IShowProps): JSX.Element {
  return <>{when && children}</>;
}
