import { config, type UserConfigExport } from '@config/vite';

export default function viteConfig(): Promise<UserConfigExport> {
  return config({
    port: 3_001,
    base: __dirname,
    hasTanstackRouter: true,
  });
}
