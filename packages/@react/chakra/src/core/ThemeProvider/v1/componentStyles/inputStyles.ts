import { cssVar } from '@chakra-ui/react';

import { pxToRem } from '../../utils';
import {
  defineInputPartsStyle,
  defineInputStyleConfig,
} from '../../componentAnatomies';

export const $customInputHeightVar = cssVar('custom-input-height');

export const Input = defineInputStyleConfig({
  baseStyle: defineInputPartsStyle({
    group: {
      [$customInputHeightVar.variable]: pxToRem(52),
    },
    element: {
      pl: 4,
      pr: 3,
      py: 3,
      pointerEvents: 'none',
      w: $customInputHeightVar.reference,
      h: $customInputHeightVar.reference,
      '> svg': {
        p: 0.5,
      },
    },
  }),
});
