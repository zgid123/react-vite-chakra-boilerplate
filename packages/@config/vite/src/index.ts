import { resolve } from 'path';
import detect from 'detect-port';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import {
  defineConfig,
  type Alias,
  type UserConfig,
  type UserConfigExport,
} from 'vite';

export type { UserConfigExport } from 'vite';

import { wrapArray } from './utils';

interface IConfigParams extends Omit<UserConfig, 'server'> {
  port: number;
  base: string;
  remote?: boolean;
  hasTanstackRouter?: boolean;
  server?: Omit<Required<UserConfig>['server'], 'port'>;
}

export async function config({
  base,
  port,
  build,
  server,
  plugins,
  remote = false,
  hasTanstackRouter,
  resolve: resolveConfig,
  ...rest
}: IConfigParams): Promise<UserConfigExport> {
  const { watch, ...restServer } = server || {};
  const { alias = [], ...restResolve } = resolveConfig || {};
  const wrappedPlugins = wrapArray(plugins);

  port = await detect(port);

  if (!remote) {
    wrappedPlugins.push(
      react({
        tsDecorators: true,
      }),
    );
  }

  if (hasTanstackRouter) {
    wrappedPlugins.push(TanStackRouterVite());
  }

  return defineConfig({
    plugins: wrappedPlugins,
    server: {
      port,
      watch: {
        usePolling: true,
        ...watch,
      },
      ...restServer,
    },
    resolve: {
      alias: [
        {
          find: '~',
          replacement: resolve(base, 'src'),
        },
        ...wrapArray<Alias[]>(alias as Alias[]),
      ],
      ...restResolve,
    },
    build: {
      minify: true,
      target: 'esnext',
      ...build,
    },
    ...rest,
  });
}
