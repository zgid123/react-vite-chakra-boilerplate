import { Stack } from '@chakra-ui/react';
import {
  useFormContext,
  type FieldPath,
  type TFieldArray,
  type DeepRequired,
  type RegisterOptions,
  type UseFieldArrayRemove,
} from '@react/utils/useForm';

import type { JSX } from 'react';

import { Show } from '../../../Show';
import { DeleteIcon } from '../../../Icon';
import { FormInput } from '../../FormInput';

import type { IFormValuesProps } from './interface';

interface IProductProps {
  index: number;
  arrayName: 'products';
  remove: UseFieldArrayRemove;
  field: TFieldArray<IFormValuesProps, 'products'>;
  rules?: RegisterOptions<
    DeepRequired<IFormValuesProps>,
    `products.${number}.name`
  >;
}

export function Product({
  index,
  field,
  rules,
  remove,
  arrayName,
}: IProductProps): JSX.Element {
  const { control } = useFormContext<IFormValuesProps>();
  const prefixName: FieldPath<IFormValuesProps> = `${arrayName}.${index}`;

  const handleRemove = () => {
    remove(index);
  };

  return (
    <Stack pos='relative'>
      <FormInput
        label='Name'
        rules={rules}
        control={control}
        name={`${prefixName}.name`}
      />
      <Show when={!Number(field.id)}>
        <DeleteIcon
          m={2}
          top={0}
          w='20px'
          h='20px'
          right={0}
          pos='absolute'
          color='red.500'
          cursor='pointer'
          onClick={handleRemove}
        />
      </Show>
    </Stack>
  );
}
