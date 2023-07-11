import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/horse': {
        target: 'http://666.666.666.666:16443',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    Unocss(),
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'assets': resolve(__dirname, 'src/assets'),
    },
  },
})
