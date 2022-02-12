import { PackageJsonKonfik } from '@konfik-plugin/package-json'

export const konfikPkg = PackageJsonKonfik({
  name: '@schickling/konfik-base',
  type: 'module',
  version: '0.0.0',
  exports: {
    '.': './src/index.ts',
  },
  dependencies: {
    '@konfik-plugin/eslint': 'latest',
    '@konfik-plugin/prettier': 'latest',
  },
  publishConfig: {
    access: 'public',
  },
})
