import {
  Box,
  forwardRef,
  type BoxProps,
  type ComponentWithAs,
} from '@chakra-ui/react';

export const Form: ComponentWithAs<'form', BoxProps> = forwardRef<
  BoxProps,
  'form'
>((props, ref) => {
  return <Box as='form' ref={ref} {...props} />;
});
