import { Stack } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';
import { chakraDecorator } from '../../storybook';

const meta = {
  title: 'Chakra Core/Input',
  component: Input,
  decorators: [chakraDecorator],
} satisfies Meta<typeof Input>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  args: {
    placeholder: 'Username or email',
  },
  render: (args) => {
    return (
      <Stack p={2}>
        <Input {...args} />
      </Stack>
    );
  },
};

export const WithLeftElement: TStory = {
  args: {
    leftElement: <EmailIcon />,
    placeholder: 'Username or email',
  },
  render: (args) => {
    return (
      <Stack p={2}>
        <Input {...args} />
      </Stack>
    );
  },
};

export const WithRightElement: TStory = {
  args: {
    rightElement: <EmailIcon />,
    placeholder: 'Username or email',
  },
  render: (args) => {
    return (
      <Stack p={2}>
        <Input {...args} />
      </Stack>
    );
  },
};
