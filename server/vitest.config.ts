import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
  },
  plugins: [
    // Nest's DI resolves constructor types via legacy decorator metadata,
    // which esbuild cannot emit — SWC can
    swc.vite({ module: { type: 'es6' } }),
  ],
})
