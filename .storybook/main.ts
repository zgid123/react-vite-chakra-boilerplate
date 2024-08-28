import { join, dirname } from 'path';

import type { StorybookConfig } from '@storybook/react-vite';

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../**/*.mdx', '../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: [
    {
      to: '/fonts',
      from: '../workspaces/main-project/public/fonts',
    },
  ],
  addons: [
    getAbsolutePath('storybook-dark-mode'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    options: {},
    name: getAbsolutePath('@storybook/react-vite'),
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
