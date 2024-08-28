import { configVitest } from '@config/vitest/utils';

import type { UserConfigExport } from 'vitest/config';

export default async function config(): Promise<UserConfigExport> {
  return configVitest({
    root: __dirname,
  });
}
