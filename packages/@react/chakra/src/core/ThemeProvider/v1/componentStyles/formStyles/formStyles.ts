import {
  defineFormPartsStyle,
  defineFormStyleConfig,
} from '../../../componentAnatomies';

export const Form = defineFormStyleConfig({
  baseStyle: defineFormPartsStyle({
    container: {
      w: '100%',
      pos: 'relative',
    },
    helperText: {
      whiteSpace: 'pre-line',
    },
  }),
});
