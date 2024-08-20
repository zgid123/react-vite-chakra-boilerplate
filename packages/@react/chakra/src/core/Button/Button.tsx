import { Button as ChakraButton, type ButtonProps } from '@chakra-ui/react';

import type { JSX } from 'react';

export function Button({
  children,
  loadingText,
  ...rest
}: ButtonProps): JSX.Element {
  if (typeof children === 'string' && !loadingText) {
    loadingText = children;
  }

  return (
    <ChakraButton loadingText={loadingText} {...rest}>
      {children}
    </ChakraButton>
  );
}
