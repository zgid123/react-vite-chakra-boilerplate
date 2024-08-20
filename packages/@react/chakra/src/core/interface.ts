import type { ComponentWithAs } from '@chakra-ui/react';
import type { ComponentType, ElementType, JSX } from 'react';

export type AsProps<T, DefaultProps> = T extends undefined
  ? DefaultProps
  : T extends ComponentWithAs<ElementType, infer P>
    ? P
    : T extends ComponentType<DefaultProps>
      ? DefaultProps
      : T extends ComponentType<infer P>
        ? P
        : T extends keyof JSX.IntrinsicElements
          ? JSX.IntrinsicElements[T]
          : DefaultProps;
