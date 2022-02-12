import { TsconfigKonfik } from '@konfik-plugin/tsconfig'

/**
 * Mostly based on https://github.com/tsconfig/bases/blob/main/bases/strictest.json
 */
export const tsconfigKonfik = TsconfigKonfik({
  compilerOptions: {
    // ----------
    // strictness
    // ----------
    alwaysStrict: true,
    strict: true,
    allowUnusedLabels: false,
    noUncheckedIndexedAccess: true,
    allowUnreachableCode: false,
    noFallthroughCasesInSwitch: true,
    noImplicitOverride: true,
    noImplicitReturns: true,
    noPropertyAccessFromIndexSignature: true,
    noUnusedLocals: true,
    noUnusedParameters: true,
    importsNotUsedAsValues: 'error',
    forceConsistentCasingInFileNames: true,

    incremental: true,
    composite: true,

    sourceMap: true,
    declarationMap: true,
    declaration: true,

    checkJs: true,
    allowJs: true,

    skipLibCheck: true,

    // Makes long error messages more readable (if this is not enough a ts-patch based override is needed in typescript)
    noErrorTruncation: true,
    isolatedModules: true,

    moduleResolution: 'Node',
    esModuleInterop: true,
  },
  exclude: ['**/dist', '**/node_modules'],
})
