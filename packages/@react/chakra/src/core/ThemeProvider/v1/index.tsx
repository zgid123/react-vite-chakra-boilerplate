import {
  ChakraProvider,
  mergeThemeOverride,
  type Theme,
} from '@chakra-ui/react';

import type { ReactNode, JSX, FC } from 'react';

import { Font } from './Font';
import { theme } from './theme';

interface IThemeProviderProps {
  font?: FC;
  children: ReactNode;
  theme?: Partial<Theme>;
}

export function ThemeV1Provider({
  font,
  children,
  theme: themeProps = {} as Theme,
}: IThemeProviderProps): JSX.Element {
  const themeConfig = mergeThemeOverride(theme, themeProps);
  const FontComponent = font || Font;

  return (
    <ChakraProvider theme={themeConfig}>
      <FontComponent />
      {children}
    </ChakraProvider>
  );
}
