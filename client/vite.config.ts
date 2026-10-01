/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      // API calls stay same-origin in dev; the GraphQL server runs on :4000
      '/graphql': {
        target: 'http://localhost:4000',
        ws: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    // globals let @testing-library/react register automatic cleanup
    globals: true,
  },
})
