import { cssVar, defineStyleConfig } from '@chakra-ui/styled-system';

const $formErrorMessageColor = cssVar('form-error-color');

export const FormErrorMessage = defineStyleConfig({
  baseStyle: {
    mt: '2',
    fontSize: 'sm',
    lineHeight: 'normal',
    color: $formErrorMessageColor.reference,
    [$formErrorMessageColor.variable]: 'colors.red.500',
  },
});
