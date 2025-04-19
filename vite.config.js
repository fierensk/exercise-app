/// <reference types="vitest/globals" />
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/exercise-app/", 
  plugins: [react()],
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
    testTimeout: 5000,
    reporters: ['verbose'],
  }
})