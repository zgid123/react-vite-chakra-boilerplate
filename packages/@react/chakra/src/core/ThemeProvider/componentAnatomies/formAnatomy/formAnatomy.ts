import { formAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

export const {
  definePartsStyle: defineFormPartsStyle,
  defineMultiStyleConfig: defineFormStyleConfig,
} = createMultiStyleConfigHelpers(formAnatomy.keys);
