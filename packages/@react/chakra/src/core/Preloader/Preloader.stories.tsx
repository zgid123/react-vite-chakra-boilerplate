import type { Meta, StoryObj } from '@storybook/react';

import { Preloader } from '../Preloader';
import { chakraDecorator } from '../../storybook';

const meta = {
  title: 'Chakra Core/Preloader',
  component: Preloader,
  decorators: [chakraDecorator],
} satisfies Meta<typeof Preloader>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {};

export const Center: TStory = {
  args: {
    variant: 'center',
  },
};

export const Global: TStory = {
  args: {
    variant: 'global',
  },
};

export const WithChildren: TStory = {
  args: {
    children: 'Loading...',
  },
};
