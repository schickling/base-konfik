import { PrettierKonfik } from '@konfik-plugin/prettier'

export const prettierKonfik = PrettierKonfik({
  printWidth: 120,
  semi: false,
  trailingComma: 'all',
  singleQuote: true,
})
