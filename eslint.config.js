import eslintJs from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfigs from 'eslint-config-prettier';
import { defineFlatConfig } from 'eslint-define-config';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
// @ts-expect-error no declarations is available
import reactPlugin from 'eslint-plugin-react';
// @ts-expect-error no declarations is available
import reactHooksPlugin from 'eslint-plugin-react-hooks';
// @ts-expect-error no declarations is available
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

/** @type {import('eslint').ESLint.ConfigData} */
const prettierPluginRecommendedConfig = /** @type {any} */ (prettierPlugin.configs).recommended;

export default defineFlatConfig([
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/*.module.{scss,sass}.d.ts'],
  },
  {
    files: ['{apps,libs}/*/**/*.{j,t}s{,x}'],
    plugins: {
      '@typescript-eslint': /** @type {any} */ (tsPlugin),
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          './tsconfig{,.node}.json',
          '{apps,libs}/*/tsconfig{,.node}.json',
          '{apps,libs}/*/{src,test}/tsconfig{,.node}.json',
        ],
      },
      globals: { ...globals.browser, ...globals.es2020 },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...tsPlugin.configs['strict-type-checked'].rules,
      ...tsPlugin.configs['stylistic-type-checked'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...prettierConfigs.rules,
      ...prettierPluginRecommendedConfig.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      '@typescript-eslint/no-unsafe-call': 'off', // this rule is slow and buggy when refactoring code
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    files: ['apps/server/src/**/*.ts'],
    languageOptions: {
      globals: { ...globals.node, ...globals.es2020 },
    },
    rules: {
      '@typescript-eslint/require-await': 'off',
    },
  },
]);
