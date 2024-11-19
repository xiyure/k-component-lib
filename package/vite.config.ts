import { defineConfig } from 'vite';
import fs from 'fs';
import { copyFile } from 'fs/promises';
import _path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
const name = 'kingsware-ui';
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: '.',
      include: ['../package'],
      outDir: [`${name}/es`, `${name}/lib`]
    }),
    copyFiles()
  ],
  esbuild: {
    pure: ['console.log', 'alert', 'debugger'],
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'vue';`
  },
  build: {
    outDir: name,
		lib: {
			entry: 'index.ts',
      name,
      fileName: 'index'
		},
		rollupOptions: {
      input: ['index.ts'],
      output: [
        {
          format: "es",
          entryFileNames: "[name].mjs",
          preserveModules: true,
          exports: "named",
          dir: `${name}/es`,
          globals: {
            vue: "Vue",
            "element-plus": "ElementPlus",
            "vxe-table": "VxeTable",
            "vxe-pc-ui": "VxeUI",
            "vue-i18n": "VueI18n",
            sortablejs: "Sortable"
          }
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          exports: "named",
          dir: `${name}/lib`,
          globals: {
            vue: "Vue",
            "element-plus": "ElementPlus",
            "vxe-table": "VxeTable",
            "vxe-pc-ui": "VxeUI",
            "vue-i18n": "VueI18n",
            sortablejs: "Sortable"
          }
        },
      ],
			external: [
        "vue",
        "element-plus",
        "vxe-table",
        "vxe-pc-ui",
        "vue-i18n",
        "chinese-lunar-calendar",
        "sortablejs"
      ]
		},
	},
  resolve: {
    // 配置路径别名
    alias: {
      '@': '.',
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  server: {
    host: '0.0.0.0',
    port: 12580
  }
});


function copyFiles() {
  const paths = [
    {
      from: _path.resolve(__dirname, '../package/static'),
      to: _path.resolve(__dirname, `${name}`),
      isDir: true
    },
    {
      from: _path.resolve(__dirname, `${name}/es/style.css`),
      to: _path.resolve(__dirname, `${name}/style.css`)
    }
  ];
  return {
    name: 'copy-file-plugin',
    closeBundle() {
      try {
        for (const { from, to, isDir = false } of paths) {
          fs.cp(from, to, {recursive: isDir}, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
  };
}