import type { FileType } from '@konfik/core'
import { type BuiltInParserName, format } from 'prettier'

import { prettierKonfik } from './prettier.js'

export * from './prettier.js'

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
