import { resolve } from 'path';
import { defineConfig, type UserConfigExport } from 'vitest/config';

import type { InlineConfig } from 'vitest/node';

import { reactSetup } from './utils';

interface IConfigVitestParams {
  root: string;
  server?: InlineConfig['server'];
  environment?: 'react' | 'nodejs';
}

export function configVitest({
  root,
  server,
  environment,
}: IConfigVitestParams): UserConfigExport {
  const setup = environment === 'react' ? reactSetup() : {};

  return defineConfig({
    test: {
      server,
      root: './src',
      globals: true,
      include: ['__tests__/**/*.spec.ts', '__tests__/**/*.spec.tsx'],
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html'],
      },
      ...setup,
    },
    resolve: {
      alias: [
        {
          find: '~',
          replacement: resolve(root, 'src'),
        },
      ],
    },
  });
}
