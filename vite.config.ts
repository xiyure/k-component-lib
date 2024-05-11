import { defineConfig } from 'vite';
import pathsystem from 'path';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver  } from 'unplugin-vue-components/resolvers';
import fs from 'fs';

// https://vitejs.dev/config/
const name = 'kingsware-ui';
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['./package'],
      tsconfigPath: 'tsconfig.json'
    }),
    copyFilePlugin({
      src: pathsystem.resolve(__dirname, 'package/components/components.d.ts'),
      dest: pathsystem.resolve(__dirname, `${name}/components/components.d.ts`)
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    outDir: name,
		lib: {
			entry: pathsystem.resolve(__dirname, "package/index.ts"),
			name: name,
			fileName: "index",
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

type copyFilePluginType = {
  src: string,
  dest: string
}
// 将某些文件直接复制到打包后的目录下
function copyFilePlugin({src, dest}:copyFilePluginType) {
  return {
    name: 'copy-file-plugin',
    closeBundle() {
      try {
        fs.copyFile(src, dest, (err) => {
          if (!err) {
            console.log('successfully');
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
  };
}