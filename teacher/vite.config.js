import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'common': path.resolve(__dirname, './src/common'),
      'components': path.resolve(__dirname, './src/common/components'),
      'utils': path.resolve(__dirname, './src/common/utils'),
      'style': path.resolve(__dirname, './src/common/style'),
      'imgs': path.resolve(__dirname, './src/common/imgs'),
    }
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.NODE_ENV === "production" ? "" : "http://localhost:8070",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
    }
  }
})
