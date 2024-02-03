import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"

// vite.config.ts
export default defineConfig({
  base: "./",
  optimizeDeps: {
    include: [
      'vue',
      '@vueuse/core',
    ],
  },
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core",
        "vue-i18n",
        {
          from: '@vueuse/core',
          imports: ['Fn'],
          type: true,
        },
      ],
      dts: true,
      dirs: [
        "./src/hooks",
        "./src/datatypes",
        "./src/store"
      ],
      vueTemplate: true
    }),
    Components({
      dts: true,
    })
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
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].[hash].js',
        assetFileNames: '[ext]/[name].[hash].[ext]',
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        },
      }
    }
  }
})
