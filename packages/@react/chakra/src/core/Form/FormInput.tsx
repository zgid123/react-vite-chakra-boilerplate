import {
  useController,
  type FieldPath,
  type FieldValues,
} from '@react/utils/useForm';
import {
  useMemo,
  cloneElement,
  createElement,
  isValidElement,
  type JSX,
  type ReactElement,
  type ComponentType,
} from 'react';
import {
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Show } from '../Show';
import { Input, type IInputProps } from '../Input';

import type { AsProps } from '../interface';
import type { IBaseFormInputProps } from './interface';

type TComponent = ReactElement | ComponentType<TAny>;

interface IFormInputProps<
  T extends undefined | TComponent,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends IBaseFormInputProps<TFieldValues, TName> {
  component?: T | typeof Input;
  valueProp?: keyof AsProps<T, IInputProps>;
}

export function FormInput<
  T extends undefined | TComponent,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  rules,
  control,
  valueProp,
  isDisabled,
  attachment,
  controlProps,
  defaultValue,
  supportiveText,
  shouldUnregister,
  component = Input,
  onChange: onExternalChange,
  ...rest
}: IFormInputProps<T, TFieldValues, TName> &
  AsProps<T, IInputProps>): JSX.Element {
  const { field, fieldState, formState } = useController({
    name,
    rules,
    control,
    shouldUnregister,
    disabled: isDisabled,
    defaultValue: defaultValue as TAny,
  });

  const { isSubmitting } = formState;
  const { error, isTouched } = fieldState;

  const content = useMemo(() => {
    const { onChange: onInternalChange, ...fieldRest } = field;
    const isValid = isValidElement(component);

    const onChange: typeof onInternalChange = (event) => {
      onInternalChange(event);
      onExternalChange?.(event);
    };

    const props: IInputProps = {
      ...rest,
      ...fieldRest,
      onChange,
    };

    if (valueProp) {
      (props as TAny)[valueProp] = fieldRest.value;
    }

    if (isValid) {
      return cloneElement(component, props);
    }

    return createElement(component as ComponentType<TAny>, props);
  }, [component, field, onExternalChange, rest, valueProp]);

  return (
    <FormControl
      isDisabled={isSubmitting}
      isInvalid={!!error?.message && isTouched}
      {...controlProps}
    >
      <Show when={!!label}>
        <FormLabel>{label}</FormLabel>
      </Show>
      {content}
      {attachment}
      <Show when={!!supportiveText && !error?.message}>
        <FormHelperText>{supportiveText}</FormHelperText>
      </Show>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
}
