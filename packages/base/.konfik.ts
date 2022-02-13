import { PackageJsonKonfik } from '@konfik-plugin/package-json'

export const konfikPkg = PackageJsonKonfik({
  name: '@schickling/konfik-base',
  type: 'module',
  version: '0.0.0',
  exports: {
    '.': './src/index.ts',
    './eslint/base': './src/eslint/base.ts',
    './eslint/react': './src/eslint/react.ts',
    './eslint/next': './src/eslint/next.ts',
    './tsconfig/base': './src/tsconfig/base.ts',
  },
  dependencies: {
    '@konfik-plugin/eslint': 'latest',
    '@konfik-plugin/prettier': 'latest',
    '@konfik-plugin/tsconfig': 'latest',
    prettier: '^2.5.1',
  },
  publishConfig: {
    access: 'public',
  },
})
