import { EslintKonfik } from '@konfik-plugin/eslint'

import * as base from './base.js'

export const eslintKonfik = EslintKonfik({
  env: { browser: true, es6: true },
  ignorePatterns: base.eslintKonfik.ignorePatterns,
  parser: base.eslintKonfik.parser,
  plugins: base.eslintKonfik.plugins,
  extends: [...base.eslintKonfik.extends, 'plugin:react-hooks/recommended'],
  rules: {
    ...base.eslintKonfik.rules,

    'react/no-children-prop': 'off', // 🤷‍♂️ It seems to be more of a stylistic suggestion https://stackoverflow.com/a/42984758
  },
})

export const eslintDeps = {
  ...base.eslintDeps,
  'eslint-plugin-react-hooks': '^4.3.0',
} as const
