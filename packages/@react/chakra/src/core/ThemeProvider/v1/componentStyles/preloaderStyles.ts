import { keyframes, type SystemStyleObject } from '@chakra-ui/react';

import { pxToRem } from '../../utils';
import {
  definePreloaderPartsStyle,
  definePreloaderStyleConfig,
} from '../../componentAnatomies';

export const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

export const Preloader: ReturnType<typeof definePreloaderStyleConfig> =
  definePreloaderStyleConfig({
    baseStyle: definePreloaderPartsStyle(() => {
      const pseudo: SystemStyleObject = {
        content: '""',
        gridArea: '1/1',
        animation: 'inherit',
      };

      return {
        container: {
          bgColor: 'white',
          flexDir: 'column',
          display: 'inline-flex',
        },
        loader: {
          w: pxToRem(90),
          aspectRatio: 1,
          bg: 'deepMauve.500',
          display: 'inline-grid',
          animation: `${rotate} 6s infinite linear`,
          clipPath:
            'polygon(100% 50%, 85.36% 85.36%, 50% 100%, 14.64% 85.36%, 0% 50%, 14.64% 14.64%, 50% 0%, 85.36% 14.64%)',
          _before: {
            ...pseudo,
            m: '10%',
            bg: 'mossyGreen.500',
            animationDuration: '10s',
            clipPath:
              'polygon(100% 50%, 81.17% 89.09%, 38.87% 98.75%, 4.95% 71.69%, 4.95% 28.31%, 38.87% 1.25%, 81.17% 10.91%)',
          },
          _after: {
            ...pseudo,
            m: '20%',
            bg: 'madang.500',
            animationDuration: '3s',
            animationDirection: 'reverse',
            clipPath:
              'polygon(100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%, 25% 6.7%, 75% 6.7%)',
          },
        },
      };
    }),
    variants: {
      normal: {},
      global: definePreloaderPartsStyle({
        container: {
          w: '100vw',
          h: '100vh',
          zIndex: 10_000,
          pos: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
      center: definePreloaderPartsStyle({
        container: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    },
    defaultProps: {
      variant: 'normal',
    },
  });
