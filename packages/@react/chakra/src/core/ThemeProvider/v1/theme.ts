import { extendTheme } from '@chakra-ui/react';

import {
  Form,
  Icon,
  Input,
  Preloader,
  FormWrapper,
  FormErrorMessage,
} from './componentStyles';

export const theme: ReturnType<typeof extendTheme> = extendTheme({
  fonts: {
    body: 'Inter',
    heading: 'Inter',
  },
  colors: {
    mossyGreen: {
      50: '#f4f6f5',
      100: '#e6eae8',
      200: '#cdd5d1',
      300: '#b4c1ba',
      400: '#9baca3',
      500: '#83988e',
      600: '#667b71',
      700: '#4c5c54',
      800: '#333d38',
      900: '#191f1c',
    },
    madang: {
      50: '#f9fcf8',
      100: '#f1f8ec',
      200: '#e3f1da',
      300: '#d8eccb',
      400: '#cae5b8',
      500: '#bcdea5',
      600: '#92ca6e',
      700: '#6aac3f',
      800: '#457029',
      900: '#233815',
    },
    deepMauve: {
      50: '#efeced',
      100: '#ded8dc',
      200: '#c0b4bb',
      300: '#a08d98',
      400: '#7d6974',
      500: '#574951',
      600: '#453a40',
      700: '#352c31',
      800: '#241e22',
      900: '#110e0f',
    },
  },
  components: {
    Form,
    FormErrorMessage,
    FormWrapper,
    Icon,
    Input,
    Preloader,
  },
});
