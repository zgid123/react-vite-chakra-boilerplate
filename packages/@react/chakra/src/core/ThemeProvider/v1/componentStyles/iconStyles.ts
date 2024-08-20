import {
  cssVar,
  defineStyle,
  defineStyleConfig,
  type SystemStyleObject,
} from '@chakra-ui/react';

import { mergeStyle, pxToRem } from '../../utils';

const $svgColor = cssVar('svg-color', 'currentColor');

export const Icon = defineStyleConfig({
  baseStyle: defineStyle(({ variant = 'stroke', color = 'black' }) => {
    const props: SystemStyleObject = {
      w: pxToRem(24),
      h: pxToRem(24),
      [$svgColor.variable]: `colors.${color}`,
    };

    switch (variant) {
      case 'fill': {
        mergeStyle(props, {
          stroke: 'transparent',
          fill: $svgColor.reference,
        });

        break;
      }
      case 'stroke': {
        mergeStyle(props, {
          fill: 'transparent',
          stroke: $svgColor.reference,
        });

        break;
      }
      default: {
        mergeStyle(props, {
          fill: 'transparent',
          stroke: 'transparent',
          _dark: {
            fill: 'transparent',
            stroke: 'transparent',
          },
        });
      }
    }

    return props;
  }),
});
