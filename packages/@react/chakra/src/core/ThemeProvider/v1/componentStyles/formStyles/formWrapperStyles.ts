import {
  defineFormWrapperPartsStyle,
  defineFormWrapperStyleConfig,
} from '../../../componentAnatomies';

export const FormWrapper = defineFormWrapperStyleConfig({
  baseStyle: defineFormWrapperPartsStyle({
    container: {
      h: '100%',
    },
    label: {
      fontSize: 'xl',
    },
    supportiveText: {
      fontSize: 'md',
      whiteSpace: 'pre-line',
    },
  }),
});
