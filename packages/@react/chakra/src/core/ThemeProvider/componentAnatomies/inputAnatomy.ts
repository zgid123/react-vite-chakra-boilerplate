import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const {
  definePartsStyle: defineInputPartsStyle,
  defineMultiStyleConfig: defineInputStyleConfig,
} = createMultiStyleConfigHelpers(inputAnatomy.keys);
