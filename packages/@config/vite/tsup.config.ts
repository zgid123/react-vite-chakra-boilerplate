import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  splitting: false,
  entry: ['src/index.ts'],
  external: ['path', 'detect-port'],
});
