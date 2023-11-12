import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

// vite.config.ts
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    UnoCSS()
  ],
  server: {
    host: "localhost",
    port: 8080
  },
  resolve: {
    alias: {
      "@": "/src/",
      "~": "./"
    }
  }
})
