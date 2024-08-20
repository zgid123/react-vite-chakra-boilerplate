import { Box } from '@chakra-ui/react';

import type { JSX, ReactNode } from 'react';

import { useMultiStyles } from '../internalHooks';

export interface IPreloaderProps {
  children?: ReactNode;
  variant?: 'normal' | 'global' | 'center';
}

export function Preloader({
  variant,
  children,
  ...rest
}: IPreloaderProps): JSX.Element {
  const { container, loader } = useMultiStyles('Preloader', {
    variant,
  });

  return (
    <Box className='preloader' __css={container} {...rest}>
      <Box className='preloader-loader' __css={loader} />
      {children}
    </Box>
  );
}
