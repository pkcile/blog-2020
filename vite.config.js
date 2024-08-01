// vite.config.js
import legacy from "@vitejs/plugin-legacy";
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
//   root: resolve(__dirname, 'public/index.html'),
  plugins: [
    legacy({
      targets: ["ie>=11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
  base: './', 
  minify: true, // 是否压缩代码
  sourceMap: true, // 是否生成sourceMap
})