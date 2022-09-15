import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`
    }
  },

  // 反向代理这样配置
  server: {
    // port: 5174,
    // host: 'http://127.0.0.1/',
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    proxy: {
      '/operate/': {
        target: 'https://xxxxxx',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/operate/, '/operate'),
      }
    }
  }
})
