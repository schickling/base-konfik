import { EslintKonfik } from '@konfik-plugin/eslint'

import * as base from './base.js'

export const eslintKonfik = EslintKonfik({
  env: { browser: true, es6: true },
  ignorePatterns: base.eslintKonfik.ignorePatterns,
  parser: base.eslintKonfik.parser,
  plugins: base.eslintKonfik.plugins,
  extends: base.d([
    ...base.eslintKonfik.extends,
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ] as const),
  rules: {
    ...base.eslintKonfik.rules,

    'react/no-children-prop': 'off', // 🤷‍♂️ It seems to be more of a stylistic suggestion https://stackoverflow.com/a/42984758
  },
})

export const eslintDeps = {
  ...base.eslintDeps,
  'eslint-plugin-react-hooks': '^4.3.0',
  'eslint-plugin-react': '^7.28.0',
} as const
