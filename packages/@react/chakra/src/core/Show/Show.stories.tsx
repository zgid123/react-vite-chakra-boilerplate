import { Heading } from '@chakra-ui/react';

import type { Meta, StoryObj } from '@storybook/react';

import { Show } from './Show';
import { chakraDecorator } from '../../storybook';

const meta = {
  title: 'Chakra Core/Show',
  component: Show,
  decorators: [chakraDecorator],
} satisfies Meta<typeof Show>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    when: true,
    children: <Heading>Show when true</Heading>,
  },
};
