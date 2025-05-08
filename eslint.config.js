import { dirname } from 'path'
import { fileURLToPath } from 'url'

import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const commonSettings = {
  react: { version: 'detect' },
  'import/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      moduleDirectory: ['node_modules', '.']
    }
  }
}

const commonRules = {
  'react/react-in-jsx-scope': 'off',
  'react/prop-types': 'off',
  'react/display-name': 'off',
  'react/jsx-uses-react': 'error',
  'react/jsx-uses-vars': 'error',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
      pathGroups: [
        { pattern: 'react', group: 'builtin', position: 'before' },
        { pattern: '@/**', group: 'internal', position: 'before' }
      ],
      pathGroupsExcludedImportTypes: ['react']
    }
  ],
  'jsx-a11y/anchor-is-valid': 'error',
  'jsx-a11y/click-events-have-key-events': 'error',
  'jsx-a11y/no-static-element-interactions': 'error',
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'no-debugger': 'warn',
  'no-duplicate-imports': 'error',
  'no-unused-expressions': 'error',
  'no-unused-vars': 'off',
  'prettier/prettier': 'off',

  // sort import no used
  'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_'
    }
  ]
}

const config = [
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**', 'coverage/**', 'eslint.config.js']
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },
    settings: commonSettings,
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: reactPlugin,
      import: importPlugin,
      // sort import no used
      'jsx-a11y': jsxA11yPlugin,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...commonRules,
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error'
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        warnOnUnsupportedTypeScriptVersion: false,
        EXPERIMENTAL_useProjectService: true
      }
    },
    settings: {
      ...commonSettings,
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.app.json', './tsconfig.node.json'],
          alwaysTryTypes: true
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', '.']
        }
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react: reactPlugin,
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...commonRules,
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'warn',
      '@typescript-eslint/explicit-function-return-type': [
        'off',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-non-null-assertion': 'warn'
    }
  }
]

export default config
