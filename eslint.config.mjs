import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': typescript,
      'prettier': prettierPlugin
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.eslint.json'
      }
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...prettier.rules,
      'prettier/prettier': ['error', { usePrettierrc: true }],
      'max-len': ['error', { code: 120 }],
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  }
];
