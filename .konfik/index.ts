import { GitignoreKonfik } from '@konfik-plugin/gitignore'
import { PackageJsonKonfik } from '@konfik-plugin/package-json'
import { TsconfigKonfik } from '@konfik-plugin/tsconfig'

import * as base from '../packages/base/.konfik.js'
import { eslintDeps, eslintKonfik } from '../packages/base/src/eslint/base.js'
import { prettierKonfik } from '../packages/base/src/prettier.js'
import { tsconfigKonfik } from '../packages/base/src/tsconfig/base.js'

export { prettyPrint } from '../packages/base/src/index.js'

const gitignoreKonfik = GitignoreKonfik([
  'node_modules',
  '.idea/',
  '.DS_STORE',
  '',
  'tmp',
  'dist',
  '',
  '/.yarn/*',
  '!/.yarn/releases',
  '!/.yarn/patches',
  '!/.yarn/plugins',
  '!/.yarn/sdks',
  '',
  '*.log',
  '',
  '.direnv',
  '.envrc.*',
  '',
])

const rootPkg = PackageJsonKonfik({
  private: true,
  workspaces: ['./packages/*'],
  packageManager: 'yarn@3.1.1',
  devDependencies: {
    '@konfik-plugin/gitignore': 'latest',
    '@konfik-plugin/package-json': 'latest',
    '@konfik-plugin/prettier': 'latest',
    '@konfik-plugin/tsconfig': 'latest',
    prettier: 'latest',
    konfik: 'latest',
    ...eslintDeps,
  },
  scripts: {
    'build:konfik': 'konfik build -c ./.konfik/index.ts',
    'lint:check': 'run lint:eslint:check && run lint:prettier:check',
    'lint:fix': 'run lint:eslint:fix & run lint:prettier:fix',
    'lint:eslint:fix': 'eslint packages --ext .ts --fix',
    'lint:eslint:check': 'eslint packages --ext .ts --max-warnings=0',
    'lint:prettier:fix': 'prettier packages --write',
    'lint:prettier:check': 'prettier packages --check',
  },
})

const tsconfig = TsconfigKonfik({
  ...tsconfigKonfik,
})

export default {
  '.gitignore': gitignoreKonfik,
  'package.json': rootPkg,
  '.eslintrc.json': eslintKonfik,
  'prettier.config.js': prettierKonfik,
  'tsconfig.json': tsconfig,
  packages: {
    base: { 'package.json': base.konfikPkg },
  },
}
