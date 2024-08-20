import { chakra, useStyleConfig } from '@chakra-ui/react';
import {
  get,
  useFormContext,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from '@react/utils/useForm';

import type { JSX } from 'react';

interface IFormErrorProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: UseFormReturn<TFieldValues>['control']; // for typing suggestion
}

export function FormErrorMessage<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name }: IFormErrorProps<TFieldValues, TName>): JSX.Element | null {
  const formContext = useFormContext();
  const styles = useStyleConfig('FormErrorMessage');

  if (!formContext) {
    return null;
  }

  const errorMessage = get(
    formContext.formState.errors,
    `${name}.message`,
    '',
  ) as string;

  if (!errorMessage) {
    return null;
  }

  return (
    <chakra.p className='form-error-message' __css={styles}>
      {errorMessage}
    </chakra.p>
  );
}
