import { GitignoreKonfik } from '@konfik-plugin/gitignore'
import { PackageJsonKonfik } from '@konfik-plugin/package-json'
import { TsconfigKonfik } from '@konfik-plugin/tsconfig'

import * as base from '../packages/base/.konfik.js'
import { eslintDeps, eslintKonfik } from '../packages/base/src/eslint/base.js'
import { prettierKonfik } from '../packages/base/src/prettier.js'
import { tsconfigKonfik } from '../packages/base/src/tsconfig/base.js'
import { konfikVersion } from './common.js'
import * as githubWorkflows from './github_workflows.js'

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
    '@konfik-plugin/gitignore': konfikVersion,
    '@konfik-plugin/package-json': konfikVersion,
    '@konfik-plugin/prettier': konfikVersion,
    '@konfik-plugin/tsconfig': konfikVersion,
    '@konfik-plugin/github': konfikVersion,
    // needed for pretty printing of konfik files
    prettier: 'latest',
    konfik: konfikVersion,
    ...eslintDeps,
  },
  scripts: {
    'build:konfik': 'konfik build -c ./.konfik/index.ts',
    'lint:check': 'eslint packages .konfik --ext .ts,.tsx --max-warnings=0',
    'lint:fix': 'eslint packages .konfik --ext .ts,.tsx --fix',
  },
})

const tsconfig = TsconfigKonfik({
  ...tsconfigKonfik,
})

export default {
  '.github': {
    workflows: {
      'main.yml': githubWorkflows.main,
    },
  },
  '.gitignore': gitignoreKonfik,
  'package.json': rootPkg,
  '.eslintrc.json': eslintKonfik,
  'prettier.config.js': prettierKonfik,
  'tsconfig.json': tsconfig,
  packages: {
    base: { 'package.json': base.konfikPkg },
  },
}
