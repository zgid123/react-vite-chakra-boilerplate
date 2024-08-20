import { configVitest } from '@internal/vitest/utils';

import type { UserConfigExport } from 'vitest/config';

export default async function config(): Promise<UserConfigExport> {
  return configVitest({
    root: __dirname,
    environment: 'react',
  });
}
