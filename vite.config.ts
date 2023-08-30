import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next'
      })],
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/utils.scss';`
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      views: path.resolve(__dirname, "./src/views"),
      components: path.resolve(__dirname, "./src/components")
    }
  },
  server: {
    open: true,
    port: 6510,
    host: '0.0.0.0'
  }
})
