import { createElement } from 'react';
import { Heading, Icon, SimpleGrid, Stack } from '@chakra-ui/react';

import type { Meta, StoryObj } from '@storybook/react';

import * as icons from './';

import { chakraDecorator } from '../../storybook';

const meta = {
  title: 'Chakra Core/Icon',
  component: Icon,
  decorators: [chakraDecorator],
} satisfies Meta<typeof Icon>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  render: () => {
    return (
      <SimpleGrid columns={5} spacing={4}>
        {Object.entries(icons).map(([name, icon], index) => {
          return (
            <Stack
              p={2}
              key={index}
              borderRadius='lg'
              border='1px solid'
              alignItems='center'
              justifyContent='center'
              borderColor='pelorous.300'
            >
              {createElement(icon)}
              <Heading>{name}</Heading>
            </Stack>
          );
        })}
      </SimpleGrid>
    );
  },
};
