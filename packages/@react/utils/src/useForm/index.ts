import type {
  FieldValues,
  FieldArrayPath,
  FieldArrayWithId,
} from 'react-hook-form';

export {
  get,
  FormProvider,
  useController,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

export type {
  Control,
  FieldPath,
  FieldValues,
  UseFormReset,
  UseFormReturn,
  SubmitHandler,
  FieldArrayPath,
  RegisterOptions,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayReturn,
  UseFieldArrayRemove,
} from 'react-hook-form';

export * from './hooks';
export * from './interface';
export * from './rules';

export type TGroupRegisterOptions<
  TKeys extends string | symbol | number,
  RegisterOptions,
> = Partial<Record<TKeys, RegisterOptions>>;

export type TFieldArray<
  TFieldValues extends FieldValues = FieldValues,
  TFieldArrayName extends
    FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> = FieldArrayWithId<TFieldValues, TFieldArrayName, 'inputId'>;
