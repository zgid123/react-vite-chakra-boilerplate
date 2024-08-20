import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  clean: true,
  outDir: 'lib',
  format: 'esm',
  splitting: false,
  entry: [
    'src/utils/index.ts',
    'src/utils/reactSetup.ts',
    'src/testingLibrary/index.ts',
  ],
  external: [
    'vitest',
    '@testing-library/react',
    '@testing-library/jest-dom',
    '@testing-library/user-event',
  ],
});
