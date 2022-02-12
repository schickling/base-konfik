import type { FileType } from '@konfik/core'
import { GitignoreKonfik } from '@konfik-plugin/gitignore'
import { PackageJsonKonfik } from '@konfik-plugin/package-json'
import type { BuiltInParserName } from 'prettier'
import { format } from 'prettier'

import * as base from '../packages/base/.konfik.js'
import { eslintDeps, eslintKonfik } from '../packages/base/src/eslint.js'
import { prettierKonfik } from '../packages/base/src/prettier.js'

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
    prettier: 'latest',
    konfik: 'latest',
    ...eslintDeps,
  },
})

export default {
  '.gitignore': gitignoreKonfik,
  'package.json': rootPkg,
  '.eslintrc.json': eslintKonfik,
  'prettier.config.js': prettierKonfik,
  packages: {
    base: { 'package.json': base.konfikPkg },
  },
}

export const prettyPrint = (uglyString: string, fileType: FileType): string => {
  const parser = mapFileTypeToParser(fileType)
  if (parser === undefined) return uglyString

  return format(uglyString, { ...prettierKonfik, parser })
}

const mapFileTypeToParser = (fileType: FileType): BuiltInParserName | undefined => {
  switch (fileType) {
    case 'json-stringify':
      return 'json-stringify'
    case 'json':
      return 'json'
    case 'yaml':
      return 'yaml'
    case 'js':
    case 'ts':
      return 'babel-ts'
    case 'plain':
      return undefined
  }
}
