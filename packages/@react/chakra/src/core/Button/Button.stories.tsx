import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { chakraDecorator } from '../../storybook';

const meta = {
  title: 'Chakra Core/Button',
  component: Button,
  decorators: [chakraDecorator],
} satisfies Meta<typeof Button>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    children: 'Button',
  },
};

export const Loading: TStory = {
  args: {
    isLoading: true,
    children: 'Button',
  },
};

export const LoadingWithCustomText: TStory = {
  args: {
    isLoading: true,
    children: 'Button',
    loadingText: 'Loading...',
  },
};

export const Disabled: TStory = {
  args: {
    isDisabled: true,
    children: 'Button',
  },
};
