import { useMultiStyleConfig, type ThemingProps } from '@chakra-ui/react';

import type { Dict } from '@chakra-ui/utils';

import type { IStyleConfigProps } from '../ThemeProvider';

export function useMultiStyles<T extends keyof IStyleConfigProps>(
  themeKey: T,
  props?: ThemingProps & Dict,
): IStyleConfigProps[T] {
  return useMultiStyleConfig(themeKey, props);
}
