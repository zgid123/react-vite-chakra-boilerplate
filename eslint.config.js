import js from '@eslint/js';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import reactPlugin from 'eslint-plugin-react';
import tsParser from '@typescript-eslint/parser';
import { fixupPluginRules } from '@eslint/compat';
import storybookPlugin from 'eslint-plugin-storybook';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import prettierRecommendedPlugin from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  allConfig: js.configs.all,
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: js.configs.recommended,
});

function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export default tseslint.config(
  js.configs.recommended,
  prettierRecommendedPlugin,
  {
    name: 'base',
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        ...globals.es6,
        ...globals.node,
        ...globals.browser,
        ...globals.commonjs,
        TAny: true,
        window: true,
        process: true,
        TObject: true,
        TFunction: true,
        NodeListOf: true,
        ITranslationProps: true,
      },
    },
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.d.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            match: true,
            regex: '^I[A-Za-z]',
          },
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      'comma-dangle': ['error', 'always-multiline'],
      'linebreak-style': ['error', 'unix'],
      'max-len': 'off',
      'new-cap': 'off',
      'no-console': 'warn',
      'object-curly-spacing': 'off',
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
    },
  },
  {
    name: 'react',
    languageOptions: {
      globals: {
        ...globals.es2020,
        ...globals.browser,
      },
    },
    files: [
      'packages/@react/**/*.ts',
      'packages/@react/**/*.tsx',
      'workspaces/**/*.ts',
      'workspaces/**/*.tsx',
    ],
    plugins: {
      react: reactPlugin,
      storybook: storybookPlugin,
      'react-hooks': fixupPluginRules(reactHooksPlugin),
      import: legacyPlugin('eslint-plugin-import', 'import'),
      'jsx-a11y': legacyPlugin('eslint-plugin-jsx-a11y', 'jsx-a11y'),
    },
    ignores: ['dist', '.eslintrc.json', '**/*.d.ts'],
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...storybookPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/jsx-key': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    name: 'react-app',
    files: ['workspaces/**/*.ts', 'workspaces/**/*.tsx'],
    ignores: ['**/*.d.ts'],
    plugins: {
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],
    },
  },
);
