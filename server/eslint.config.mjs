import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      // GraphQL decorator thunks pass unused args by design: `type => X`,
      // `returns => X`, `of => X`
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    },
  },
)
