import { PackageJsonKonfik } from '@konfik-plugin/package-json'

import { konfikVersion } from '../../.konfik/common.js'

export const konfikPkg = PackageJsonKonfik({
  name: '@schickling/base-konfik',
  type: 'module',
  version: '0.0.0',
  exports: {
    '.': './src/index.ts',
    './eslint/base': './src/eslint/base.ts',
    './eslint/react': './src/eslint/react.ts',
    './eslint/next': './src/eslint/next.ts',
    './tsconfig/base': './src/tsconfig/base.ts',
  },
  types: './src/index.ts',
  typesVersions: {
    '*': {
      'eslint/base': ['./src/eslint/base.ts'],
      'eslint/react': ['./src/eslint/react.ts'],
      'eslint/next': ['./src/eslint/next.ts'],
      'tsconfig/base': ['./src/tsconfig/base.ts'],
    },
  },
  dependencies: {
    '@konfik-plugin/eslint': konfikVersion,
    '@konfik-plugin/prettier': konfikVersion,
    '@konfik-plugin/tsconfig': konfikVersion,
    prettier: '^2.6.0',
  },
  publishConfig: {
    access: 'public',
  },
})
