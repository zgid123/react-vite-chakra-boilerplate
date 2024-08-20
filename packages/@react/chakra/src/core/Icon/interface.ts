import type { ReactElement } from 'react';
import type { IconProps, ComponentWithAs } from '@chakra-ui/react';

export interface IIconProps extends IconProps {
  variant?: 'fill' | 'stroke' | 'none';
}

export type TSVGIcon = ComponentWithAs<'svg', IIconProps>;

export interface ICreateIconParams {
  d?: string;
  viewBox?: string;
  displayName?: string;
  defaultProps?: IIconProps;
  path?: ReactElement | ReactElement[];
}
