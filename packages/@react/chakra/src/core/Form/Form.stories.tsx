import type { Meta, StoryObj } from '@storybook/react';

import { Form } from './Form';
import { DefaultForm } from './storyComponents';
import { chakraDecorator } from '../../storybook';
import { ArrayInputForm } from './storyComponents/ArrayInputForm';

const meta = {
  title: 'Chakra Core/Form',
  component: Form,
  decorators: [chakraDecorator],
} satisfies Meta<typeof Form>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Default: TStory = {
  render: DefaultForm,
};

export const ArrayInput: TStory = {
  render: ArrayInputForm,
};
