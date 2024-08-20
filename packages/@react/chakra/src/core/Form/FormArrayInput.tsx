import { useMemo, type JSX } from 'react';
import { combine } from '@core/utils/stringUtils';
import {
  Flex,
  Button,
  HStack,
  FormControl,
  FormErrorMessage,
  type StackProps,
} from '@chakra-ui/react';
import {
  get,
  useFieldArray,
  type Control,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
  type FieldArrayPath,
  type UseFieldArrayAppend,
  type UseFieldArrayReturn,
} from '@react/utils/useForm';

import { Show } from '../Show';
import { FormInput } from './FormInput';
import { FormWrapper } from './FormWrapper';

import type { IBaseFormInputProps } from './interface';

interface IRenderParams<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> extends UseFieldArrayReturn<TFieldValues, TName, 'inputId'> {
  arrayName: TName;
  control: Control<TFieldValues>;
}

interface IFormArrayInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> extends IBaseFormInputProps<TFieldValues, TName> {
  containerProps?: StackProps;
  errors?: UseFormReturn['formState']['errors'];
  render?: (params: IRenderParams<TFieldValues, TName>) => JSX.Element;
  addMoreButton?: {
    text: string;
    onClick: (params: {
      add: UseFieldArrayAppend<TFieldValues, TName>;
    }) => () => void;
  };
}

export function FormArrayInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
  name,
  label,
  rules,
  render,
  errors,
  control,
  attachment,
  controlProps,
  addMoreButton,
  supportiveText,
  containerProps,
  shouldUnregister,
}: IFormArrayInputProps<TFieldValues, TName>): JSX.Element {
  const { text, onClick } = addMoreButton || {};
  const errorMessage = get(errors, `${name}.root.message`, '') as string;

  const methods = useFieldArray({
    name,
    rules,
    control,
    keyName: 'inputId',
  });

  const content = useMemo(() => {
    const { fields, remove, ...rest } = methods;

    if (render) {
      return render({
        fields,
        remove,
        control,
        arrayName: name,
        ...rest,
      });
    }

    return (
      <HStack>
        {fields.map((field, index) => {
          return (
            <FormInput
              control={control}
              key={field.inputId}
              shouldUnregister={shouldUnregister}
              name={
                combine(
                  { joinWith: '.' },
                  name,
                  index.toString(),
                ) as FieldPath<TFieldValues>
              }
            />
          );
        })}
      </HStack>
    );
  }, [control, methods, name, render, shouldUnregister]);

  const handleClick = () => {
    return onClick?.({
      add: methods.append,
    })?.();
  };

  return (
    <FormControl isInvalid={!!errorMessage} {...controlProps}>
      <FormWrapper
        label={label}
        supportiveText={supportiveText}
        {...containerProps}
      >
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        {content}
        {attachment}
        <Show when={!!addMoreButton}>
          <Flex flex={1} alignItems='flex-end'>
            <Button flex={1} onClick={handleClick}>
              {text}
            </Button>
          </Flex>
        </Show>
      </FormWrapper>
    </FormControl>
  );
}
