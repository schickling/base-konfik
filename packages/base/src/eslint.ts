import { EslintKonfik } from '@konfik-plugin/eslint'

export const eslintKonfik = EslintKonfik({
  env: {
    browser: true,
    node: true,
    es6: true,
  },

  ignorePatterns: ['packages/_archive/*', 'examples/*', '**/dist/*', '**/.nyc_output/*', '!.konfik'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  extends: ['plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'simple-import-sort/imports': 'error',
    'import/no-duplicates': 'warn',
    // "func-style": ["warn", "expression"],
    'import/no-extraneous-dependencies': 'error',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
  },
})

export const eslintDeps = {
  '@typescript-eslint/eslint-plugin': '^4.33.0',
  '@typescript-eslint/parser': '^4.33.0',
  eslint: '^7.21.0',
  'eslint-config-prettier': '^8.3.0',
  'eslint-plugin-import': '^2.25.4',
  'eslint-plugin-simple-import-sort': '^7.0.0',
  'eslint-plugin-react-hooks': '^4.3.0',
  typescript: '^4.5.5',
} as const
