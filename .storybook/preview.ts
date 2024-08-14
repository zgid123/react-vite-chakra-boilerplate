import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/i,
        color: /(background|color)$/i,
      },
    },
  },
};

export default preview;
