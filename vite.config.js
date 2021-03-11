import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'views': resolve(__dirname, 'src/views'),
      'components': resolve(__dirname, 'src/components'),
      'netWork': resolve(__dirname, 'src/netWork'),
      'router': resolve(__dirname, 'src/router'),
      'store': resolve(__dirname, 'src/store'),
      'plugins': resolve(__dirname, 'src/plugins'),
      'assets': resolve(__dirname, 'src/assets')
    }
  },
})
