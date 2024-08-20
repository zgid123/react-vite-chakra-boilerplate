import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const formWrapperAnatomy = [
  'label',
  'container',
  'supportiveText',
] as const;

export const {
  definePartsStyle: defineFormWrapperPartsStyle,
  defineMultiStyleConfig: defineFormWrapperStyleConfig,
} = createMultiStyleConfigHelpers(formWrapperAnatomy);
