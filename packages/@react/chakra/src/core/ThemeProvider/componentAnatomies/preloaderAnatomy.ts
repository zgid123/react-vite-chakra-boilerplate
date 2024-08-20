import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const preloaderAnatomy = ['loader', 'container'] as const;

export const {
  definePartsStyle: definePreloaderPartsStyle,
  defineMultiStyleConfig: definePreloaderStyleConfig,
} = createMultiStyleConfigHelpers(preloaderAnatomy);
