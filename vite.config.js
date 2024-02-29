import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import publicConfig from './src/config/public.js'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  base: "./",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$mixcomponent': fileURLToPath(new URL('../v8_mixcomponent', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/style/global-variables.scss" as *;`,
      },
    },
  },
  server: {
    host: true,
    port: 8082,
    proxy: {
      '/apiproxy': {
        target: publicConfig.proxy_url + '/apiproxy',
        changeOrigin: true,
        rewrite: (path) => path.replace('/apiproxy', ''),
      },
      '/mixservice': {
        target: publicConfig.proxy_url + '/mixservice',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mixservice/, ''),
      },
      '/aprusbackend': {
        target: 'http://design.mixiot.top/aprusbackend',
        changeOrigin: true,
        rewrite: (path) => path.replace('/aprusbackend', ''),
      },
    },
    fs: {
      allow: ['..'],//允许为项目根目录的上一级提供服务
    },
  }
})
