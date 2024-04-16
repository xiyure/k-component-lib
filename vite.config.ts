import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pathsystem from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': pathsystem.resolve(__dirname, './package'),
    },
  }
});