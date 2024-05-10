import { defineConfig } from 'vite';
import pathsystem from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver  } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
		outDir: "dist/kingsware-ui",
		lib: {
			entry: pathsystem.resolve(__dirname, "./package/index.ts"),
			name: "kingsware-ui",
			fileName: "kingsware-ui",
		},
		rollupOptions: {
			external: ["vue"],
			output: {
				globals: {
					vue: "Vue",
				},
			},
		},
	},
  resolve: {
    // 配置路径别名
    alias: {
      '@': pathsystem.resolve(__dirname, './package'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 12580
  }
});