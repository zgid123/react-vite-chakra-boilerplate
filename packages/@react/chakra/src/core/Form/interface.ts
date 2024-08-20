import type { ReactNode } from 'react';
import type { FormControlProps } from '@chakra-ui/react';
import type {
  Control,
  FieldValues,
  RegisterOptions,
} from '@react/utils/useForm';

export interface IBaseFormInputProps<TFieldValues extends FieldValues, TName> {
  name: TName;
  label?: string;
  attachment?: ReactNode;
  supportiveText?: string;
  shouldUnregister?: boolean;
  control: Control<TFieldValues>;
  controlProps?: FormControlProps;
  rules?: RegisterOptions<TAny, TAny>;
}
