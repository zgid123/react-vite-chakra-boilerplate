import type { SystemStyleObject } from '@chakra-ui/react';

export type TBuildStyles<T extends readonly string[]> = {
  [key in T[number]]?: SystemStyleObject;
};
