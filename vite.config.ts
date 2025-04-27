import { defineConfig } from 'vite';
import _path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { copyFiles } from './internal/plugins';
import { rollupOptions } from './internal/rollup';

// https://vitejs.dev/config/
const name = 'dist';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: _path.resolve(__dirname, 'packages'),
      tsconfigPath: 'tsconfig.json',
      include: [
        'packages/**/type.ts',
        'packages/components/message',
        'packages/components/message_box',
        'packages/components/dialog_service',
        'packages/constant',
        'packages/utils',
        'packages/locale',
        'packages/native',
        'packages/ksw-ux'
      ],
      outDir: [`${name}/es`, `${name}/lib`]
    }),
    copyFiles()
  ],
  esbuild: {
    pure: ['console.log', 'alert', 'debugger'],
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'vue';`,
  },
  build: {
    outDir: name,
    lib: {
      entry: 'packages/index.ts',
      fileName: 'index',
    },
    rollupOptions
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@ksw-ux/*': 'packages/*',
      'ksw-ux': 'packages',
      '@ksware/ksw-ux': 'packages'
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 12580,
  },
});
