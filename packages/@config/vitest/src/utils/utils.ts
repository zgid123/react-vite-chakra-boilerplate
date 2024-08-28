import { resolve } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { UserConfig } from 'vitest/config';

const _dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

export function reactSetup(): UserConfig['test'] {
  return {
    environment: 'jsdom',
    setupFiles: [resolve(_dirname, './reactSetup')],
  };
}
