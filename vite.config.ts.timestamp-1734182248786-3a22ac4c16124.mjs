// vite.config.ts
import { defineConfig } from "file:///D:/RengarTang/Kingsware/code_demo/storybook8/kswux/node_modules/vite/dist/node/index.js";
import _path from "path";
import fs from "fs";
import vue from "file:///D:/RengarTang/Kingsware/code_demo/storybook8/kswux/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/RengarTang/Kingsware/code_demo/storybook8/kswux/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import dts from "file:///D:/RengarTang/Kingsware/code_demo/storybook8/kswux/node_modules/vite-plugin-dts/dist/index.mjs";
import autoprefixer from "file:///D:/RengarTang/Kingsware/code_demo/storybook8/kswux/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwindcss from "file:///D:/RengarTang/Kingsware/code_demo/storybook8/kswux/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname = "D:\\RengarTang\\Kingsware\\code_demo\\storybook8\\kswux";
var name = "kingsware-ui";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: "tsconfig.json",
      include: ["packages"]
    }),
    copyFiles()
  ],
  esbuild: {
    pure: ["console.log", "alert", "debugger"],
    jsxFactory: "h",
    jsxFragment: "Fragment",
    jsxInject: `import { h, Fragment } from 'vue';`
  },
  build: {
    outDir: name,
    lib: {
      entry: "packages/index.ts",
      name,
      fileName: "index"
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
        }
      }
    }
  },
  resolve: {
    // 配置路径别名
    alias: {
      "@ksw-ux/*": _path.resolve(__vite_injected_original_dirname, "packages/*"),
      "ksw-ux": _path.resolve(__vite_injected_original_dirname, "packages")
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer]
    }
  },
  server: {
    host: "0.0.0.0",
    port: 12580
  }
});
function copyFiles() {
  const paths = [
    {
      from: resolvePath("packages/static/tailwind"),
      to: resolvePath(`${name}/tailwind`),
      isDir: true
    }
    // {
    //   from: resolvePath('typings/global.d.ts'),
    //   to: resolvePath(`${name}/global.d.ts`)
    // }
  ];
  return {
    name: "copy-file-plugin",
    closeBundle() {
      try {
        for (const { from, to, isDir = false } of paths) {
          fs.cp(from, to, { recursive: isDir }, (err) => {
            if (err) {
              console.error(err);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
}
function resolvePath(path) {
  return _path.resolve(__vite_injected_original_dirname, path);
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxSZW5nYXJUYW5nXFxcXEtpbmdzd2FyZVxcXFxjb2RlX2RlbW9cXFxcc3Rvcnlib29rOFxcXFxrc3d1eFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUmVuZ2FyVGFuZ1xcXFxLaW5nc3dhcmVcXFxcY29kZV9kZW1vXFxcXHN0b3J5Ym9vazhcXFxca3N3dXhcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1JlbmdhclRhbmcvS2luZ3N3YXJlL2NvZGVfZGVtby9zdG9yeWJvb2s4L2tzd3V4L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCBfcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnO1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XHJcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmNvbnN0IG5hbWUgPSAna2luZ3N3YXJlLXVpJztcclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICB2dWUoKSxcclxuICAgIHZ1ZUpzeCgpLFxyXG4gICAgZHRzKHtcclxuICAgICAgdHNjb25maWdQYXRoOiBcInRzY29uZmlnLmpzb25cIixcclxuICAgICAgaW5jbHVkZTogWydwYWNrYWdlcyddXHJcbiAgICB9KSxcclxuICAgIGNvcHlGaWxlcygpXHJcbiAgXSxcclxuICBlc2J1aWxkOiB7XHJcbiAgICBwdXJlOiBbJ2NvbnNvbGUubG9nJywgJ2FsZXJ0JywgJ2RlYnVnZ2VyJ10sXHJcbiAgICBqc3hGYWN0b3J5OiAnaCcsXHJcbiAgICBqc3hGcmFnbWVudDogJ0ZyYWdtZW50JyxcclxuICAgIGpzeEluamVjdDogYGltcG9ydCB7IGgsIEZyYWdtZW50IH0gZnJvbSAndnVlJztgXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiBuYW1lLFxyXG5cdFx0bGliOiB7XHJcblx0XHRcdGVudHJ5OiAncGFja2FnZXMvaW5kZXgudHMnLFxyXG4gICAgICBuYW1lLFxyXG4gICAgICBmaWxlTmFtZTogJ2luZGV4J1xyXG5cdFx0fSxcclxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0ZXh0ZXJuYWw6IFtcclxuICAgICAgICBcInZ1ZVwiLFxyXG4gICAgICAgIFwiZWxlbWVudC1wbHVzXCIsXHJcbiAgICAgICAgXCJ2eGUtdGFibGVcIixcclxuICAgICAgICBcInZ4ZS1wYy11aVwiLFxyXG4gICAgICAgIFwidnVlLWkxOG5cIixcclxuICAgICAgICBcImNoaW5lc2UtbHVuYXItY2FsZW5kYXJcIixcclxuICAgICAgICBcInNvcnRhYmxlanNcIlxyXG4gICAgICBdLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuXHRcdFx0XHRnbG9iYWxzOiB7XHJcblx0XHRcdFx0XHR2dWU6IFwiVnVlXCIsXHJcbiAgICAgICAgICBcImVsZW1lbnQtcGx1c1wiOiBcIkVsZW1lbnRQbHVzXCIsXHJcbiAgICAgICAgICBcInZ4ZS10YWJsZVwiOiBcIlZ4ZVRhYmxlXCIsXHJcbiAgICAgICAgICBcInZ4ZS1wYy11aVwiOiBcIlZ4ZVVJXCIsXHJcbiAgICAgICAgICBcInZ1ZS1pMThuXCI6IFwiVnVlSTE4blwiLFxyXG4gICAgICAgICAgXCJjaGluZXNlLWx1bmFyLWNhbGVuZGFyXCI6IFwiQ2hpbmVzZUx1bmFyQ2FsZW5kYXJcIixcclxuICAgICAgICAgIHNvcnRhYmxlanM6IFwiU29ydGFibGVcIlxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0fSxcclxuICByZXNvbHZlOiB7XHJcbiAgICAvLyBcdTkxNERcdTdGNkVcdThERUZcdTVGODRcdTUyMkJcdTU0MERcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAa3N3LXV4LyonOiBfcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3BhY2thZ2VzLyonKSxcclxuICAgICAgJ2tzdy11eCc6IF9wYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZXMnKVxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcG9zdGNzczoge1xyXG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmRjc3MsIGF1dG9wcmVmaXhlcl1cclxuICAgIH1cclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgcG9ydDogMTI1ODBcclxuICB9XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY29weUZpbGVzKCkge1xyXG4gIGNvbnN0IHBhdGhzID0gW1xyXG4gICAge1xyXG4gICAgICBmcm9tOiByZXNvbHZlUGF0aCgncGFja2FnZXMvc3RhdGljL3RhaWx3aW5kJyksXHJcbiAgICAgIHRvOiByZXNvbHZlUGF0aChgJHtuYW1lfS90YWlsd2luZGApLFxyXG4gICAgICBpc0RpcjogdHJ1ZVxyXG4gICAgfSxcclxuICAgIC8vIHtcclxuICAgIC8vICAgZnJvbTogcmVzb2x2ZVBhdGgoJ3R5cGluZ3MvZ2xvYmFsLmQudHMnKSxcclxuICAgIC8vICAgdG86IHJlc29sdmVQYXRoKGAke25hbWV9L2dsb2JhbC5kLnRzYClcclxuICAgIC8vIH1cclxuICBdO1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAnY29weS1maWxlLXBsdWdpbicsXHJcbiAgICBjbG9zZUJ1bmRsZSgpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBmb3IgKGNvbnN0IHsgZnJvbSwgdG8sIGlzRGlyID0gZmFsc2UgfSBvZiBwYXRocykge1xyXG4gICAgICAgICAgZnMuY3AoZnJvbSwgdG8sIHtyZWN1cnNpdmU6IGlzRGlyfSwgKGVycikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVzb2x2ZVBhdGgocGF0aDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIF9wYXRoLnJlc29sdmUoX19kaXJuYW1lLCBwYXRoKTtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1YsU0FBUyxvQkFBb0I7QUFDalgsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sUUFBUTtBQUNmLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8saUJBQWlCO0FBUHhCLElBQU0sbUNBQW1DO0FBVXpDLElBQU0sT0FBTztBQUNiLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLElBQUk7QUFBQSxNQUNGLGNBQWM7QUFBQSxNQUNkLFNBQVMsQ0FBQyxVQUFVO0FBQUEsSUFDdEIsQ0FBQztBQUFBLElBQ0QsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU0sQ0FBQyxlQUFlLFNBQVMsVUFBVTtBQUFBLElBQ3pDLFlBQVk7QUFBQSxJQUNaLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDVixLQUFLO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDSjtBQUFBLE1BQ0EsVUFBVTtBQUFBLElBQ2Q7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNkLFVBQVU7QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ1YsU0FBUztBQUFBLFVBQ1IsS0FBSztBQUFBLFVBQ0EsZ0JBQWdCO0FBQUEsVUFDaEIsYUFBYTtBQUFBLFVBQ2IsYUFBYTtBQUFBLFVBQ2IsWUFBWTtBQUFBLFVBQ1osMEJBQTBCO0FBQUEsVUFDMUIsWUFBWTtBQUFBLFFBQ2xCO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQyxTQUFTO0FBQUE7QUFBQSxJQUVQLE9BQU87QUFBQSxNQUNMLGFBQWEsTUFBTSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxNQUNsRCxVQUFVLE1BQU0sUUFBUSxrQ0FBVyxVQUFVO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsYUFBYSxZQUFZO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUNGLENBQUM7QUFFRCxTQUFTLFlBQVk7QUFDbkIsUUFBTSxRQUFRO0FBQUEsSUFDWjtBQUFBLE1BQ0UsTUFBTSxZQUFZLDBCQUEwQjtBQUFBLE1BQzVDLElBQUksWUFBWSxHQUFHLElBQUksV0FBVztBQUFBLE1BQ2xDLE9BQU87QUFBQSxJQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtGO0FBQ0EsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sY0FBYztBQUNaLFVBQUk7QUFDRixtQkFBVyxFQUFFLE1BQU0sSUFBSSxRQUFRLE1BQU0sS0FBSyxPQUFPO0FBQy9DLGFBQUcsR0FBRyxNQUFNLElBQUksRUFBQyxXQUFXLE1BQUssR0FBRyxDQUFDLFFBQVE7QUFDM0MsZ0JBQUksS0FBSztBQUNQLHNCQUFRLE1BQU0sR0FBRztBQUFBLFlBQ25CO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0YsU0FBUyxPQUFPO0FBQ2QsZ0JBQVEsTUFBTSxLQUFLO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyxZQUFZLE1BQWM7QUFDakMsU0FBTyxNQUFNLFFBQVEsa0NBQVcsSUFBSTtBQUN0QzsiLAogICJuYW1lcyI6IFtdCn0K
