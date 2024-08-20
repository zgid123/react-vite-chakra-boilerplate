import {
  useMemo,
  forwardRef,
  type JSX,
  type ReactNode,
  type ForwardedRef,
} from 'react';
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input as ChakraInput,
  type InputProps,
  type InputGroupProps,
} from '@chakra-ui/react';

import { Show } from '../Show';
import { $customInputHeightVar } from '../ThemeProvider/v1/componentStyles/inputStyles';

export interface IInputProps extends InputProps {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  containerProps?: InputGroupProps;
}

function InputRender(
  { leftElement, rightElement, containerProps, ...rest }: IInputProps,
  ref?: ForwardedRef<HTMLInputElement>,
): JSX.Element {
  const inputProps = useMemo<InputProps>(() => {
    const props: InputProps = {};

    if (leftElement) {
      Object.assign(props, {
        paddingInlineStart: $customInputHeightVar.reference,
      });
    }

    if (rightElement) {
      Object.assign(props, {
        paddingInlineEnd: $customInputHeightVar.reference,
      });
    }

    return props;
  }, [leftElement, rightElement]);

  return (
    <InputGroup {...containerProps}>
      <Show when={!!leftElement}>
        <InputLeftElement>{leftElement}</InputLeftElement>
      </Show>
      <ChakraInput ref={ref} {...rest} {...inputProps} />
      <Show when={!!rightElement}>
        <InputRightElement>{rightElement}</InputRightElement>
      </Show>
    </InputGroup>
  );
}

export const Input = forwardRef(InputRender);
