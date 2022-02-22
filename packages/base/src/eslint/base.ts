import { EslintKonfik } from '@konfik-plugin/eslint'

export const d = <T extends string>(_: readonly T[]): T[] => _ as T[]

export const eslintKonfik = EslintKonfik({
  env: { es6: true },

  ignorePatterns: d(['!.konfik', '**/dist/*', '**/.nyc_output/*', 'node_modules/*'] as const),

  parser: '@typescript-eslint/parser' as const,

  plugins: d([
    '@typescript-eslint',
    'simple-import-sort',
    // https://github.com/import-js/eslint-plugin-import
    'import',
    'prefer-arrow',
  ] as const),

  extends: d([
    'plugin:@typescript-eslint/recommended',
    // https://github.com/sindresorhus/eslint-plugin-unicorn
    'plugin:unicorn/recommended',
    // Turns off all rules that are unnecessary or might conflict with Prettier.
    'prettier',
    // NOTE This needs to be the last *last* extension (this applies prettier rules as eslint rules i.e. you don't need the Prettier VSC plugin anymore)
    // See for more: https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    // NOTE this also means that the VSC "Format Document" command won't work
    'plugin:prettier/recommended',
  ] as const),

  rules: {
    // ----------------
    // Unicorn --------
    // ----------------
    'unicorn/prevent-abbreviations': 'off', // sometimes abbreviations are useful
    'unicorn/filename-case': 'off', // TODO find a file-name/dir-name convention I'm happy with
    'unicorn/prefer-optional-catch-binding': 'off',
    'unicorn/catch-error-name': 'off',
    'unicorn/no-array-callback-reference': 'off', // TODO find better alternative
    'unicorn/consistent-function-scoping': 'off', // NOTE doesn't seem to work well with Effect (but seems useful nonetheless)
    'unicorn/prefer-ternary': 'off', // NOTE IMO tenary statements aren't always more readable
    'unicorn/no-array-reduce': 'off', // NOTE I agree that using `reduce` a lot can make things less readable but it's still very powerful
    'unicorn/no-array-for-each': 'off', // NOTE IMO `forEach` is still very useful in many cases
    'unicorn/no-null': 'off', // NOTE In theory I very much agree with this but e.g. `JSON.stringify` is still a common use case for me
    'unicorn/prefer-spread': 'off', // NOTE I haven't made up my mind on this yet
    'unicorn/no-abusive-eslint-disable': 'off', // NOTE using `eslint-disable` is still useful sometimes (e.g. in generated files)
    'unicorn/prefer-query-selector': 'off',

    // ----------------
    // Function-related
    //
    // I generally prefer to use function expressions (aka arrow functions) over `function` definitions:
    //
    // Pros:
    // + Easier to refactor (e.g. change from a constant to a function)
    // + Almost identical syntax to type-level function definitions
    // + Allows for single line function definitions
    // + Helps avoid `this` binding issues for classes
    //
    // Cons:
    // - Doesn't work well for function overloads (which is uncommon in app code but more common in lib code)
    // - Also doesn't seem to work for functions returning `never`
    // ----------------
    'prefer-arrow-callback': 'warn', // this is about function values provided as arguments
    'prefer-arrow/prefer-arrow-functions': [
      'warn',
      {
        classPropertiesAllowed: true,
        disallowPrototype: true,
        singleReturnOnly: false,
      },
    ],
    'no-empty-function': 'off', // allow empty function bodies
    '@typescript-eslint/no-empty-function': 'off', // this extra rule seems to be needed (https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-empty-function.md#rule-details)

    // ----------------
    // `import`-related
    // ----------------
    'simple-import-sort/imports': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-named-as-default': 'warn',
    'import/no-named-as-default-member': 'warn',
    'import/no-duplicates': 'warn',
    // TODO auto-fixing https://github.com/import-js/eslint-plugin-import/issues/2227 / https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md
    'import/extensions': ['error', 'ignorePackages'],

    // ------------------
    // TypeScript-related
    // ------------------
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // With inlay types this becomes less important
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
  },
})

export const eslintDeps = {
  '@typescript-eslint/eslint-plugin': '^5.11.0',
  '@typescript-eslint/parser': '^5.11.0',
  eslint: '^8.9.0',
  'eslint-config-prettier': '^8.3.0',
  'eslint-plugin-prettier': '^4.0.0',
  'eslint-plugin-import': '^2.25.4',
  'eslint-plugin-simple-import-sort': '^7.0.0',
  'eslint-plugin-prefer-arrow': '^1.2.3',
  'eslint-plugin-unicorn': '^40.1.0',
  typescript: '^4.5.5',
} as const
