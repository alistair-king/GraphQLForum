import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // GraphQL/react-hook-form decorator thunks and lib callbacks often
      // pass unused args by design
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    },
  },
)
