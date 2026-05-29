import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: [
      'lib/**',
      'site/**',
      'node_modules/**',
      'coverage/**',
      'babel.config.js',
      'minify.mjs',
    ],
  },
);
