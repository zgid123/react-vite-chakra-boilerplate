import { createIcon as createChakraIcon } from '@chakra-ui/icons';

import type { ICreateIconParams } from './interface';

export function createIcon(
  params: ICreateIconParams,
): ReturnType<typeof createChakraIcon> {
  return createChakraIcon(params);
}
