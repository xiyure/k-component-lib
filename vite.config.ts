import { defineConfig } from 'vite';
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
      tsconfigPath: "tsconfig.json",
      include: ['package'],
    })
  ],
  esbuild: {
    pure: ['console.log', 'alert', 'debugger'],
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'vue';`
  },
  publicDir: 'static',
  build: {
    outDir: name,
		lib: {
			entry: 'package/index.ts',
      name,
      fileName: 'index'
		},
		rollupOptions: {
			external: [
        "vue",
        "element-plus",
        "vxe-table",
        "vxe-pc-ui",
        "vue-i18n",
        "chinese-lunar-calendar",
        "sortablejs"
      ],
      output: {
				globals: {
					vue: "Vue",
          "element-plus": "ElementPlus",
          "vxe-table": "VxeTable",
          "vxe-pc-ui": "VxeUI",
          "vue-i18n": "VueI18n",
          "chinese-lunar-calendar": "ChineseLunarCalendar",
          sortablejs: "Sortable"
				},
			}
		},
	},
  resolve: {
    // 配置路径别名
    alias: {
      '@': _path.resolve(__dirname, './package'),
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