import { Heading } from '@react/chakra';
import { createFileRoute } from '@tanstack/react-router';

import type { JSX } from 'react';

function Overview(): JSX.Element {
  return <Heading>Overview</Heading>;
}

export const Route = createFileRoute('/_auth/')({
  component: Overview,
});
