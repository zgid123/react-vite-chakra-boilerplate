import {
  Stack,
  chakra,
  useStyleConfig,
  type StackProps,
} from '@chakra-ui/react';

import type { JSX } from 'react';

import { Show } from '../Show';
import { mergeStyle } from '../ThemeProvider';
import { useMultiStyles } from '../internalHooks';

interface IFormWrapperProps extends StackProps {
  label?: string;
  supportiveText?: string;
}

export function FormWrapper({
  label,
  children,
  supportiveText,
  ...rest
}: IFormWrapperProps): JSX.Element {
  const textStyles = useStyleConfig('Text');
  const styles = useMultiStyles('FormWrapper');
  const headingStyles = useStyleConfig('Heading');

  return (
    <Stack
      spacing={6}
      className='form-wrapper'
      __css={styles.container}
      {...rest}
    >
      <Stack>
        <Show when={!!label}>
          <chakra.h3
            className='form-wrapper__label'
            __css={mergeStyle(headingStyles, styles.label || {})}
          >
            {label}
          </chakra.h3>
        </Show>
        <Show when={!!supportiveText}>
          <chakra.p
            className='form-wrapper__supportive-text'
            __css={mergeStyle(textStyles, styles.supportiveText || {})}
          >
            {supportiveText}
          </chakra.p>
        </Show>
      </Stack>
      {children}
    </Stack>
  );
}
