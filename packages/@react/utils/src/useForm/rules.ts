import type {
  Validate,
  FieldPath,
  FieldValues,
  FieldPathValue,
} from 'react-hook-form';

export function required<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  message = 'Required',
): Validate<FieldPathValue<TFieldValues, TFieldName>, TFieldValues> {
  return (value: string | Record<string, unknown> | null): string | true => {
    if (typeof value === 'number') {
      value = (value as number).toString();
    }

    if (value === null) {
      value = '';
    }

    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    return !!value?.trim?.() || message;
  };
}
