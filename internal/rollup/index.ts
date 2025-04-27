import type{ RollupOptions } from 'rollup';

const name = 'dist';
const external = ['vue', 'element-plus', 'vxe-table', 'vxe-pc-ui', 'sortablejs', 'vue-i18n', 'ksw-vue-icon'];
const globals = {
  vue: 'Vue',
  'element-plus': 'ElementPlus',
  'vxe-table': 'VxeTable',
  'vue-i18n': 'VueI18n',
  sortablejs: 'Sortable',
  'ksw-vue-icon': 'KswVueIcon'
};

export const rollupOptions: RollupOptions = {
  input: 'packages/index.ts',
  output: [
    {
      format: "umd",
      name: '$ksw',
      dir: `${name}/kingsware-ui`,
      globals
    },
    {
      format: "es",
      entryFileNames: "[name].mjs",
      preserveModules: true,
      preserveModulesRoot: "packages",
      exports: 'named',
      dir: `${name}/es`,
      globals
    },
    {
      format: "cjs",
      entryFileNames: "[name].cjs",
      preserveModules: true,
      preserveModulesRoot: "packages",
      exports: 'named',
      dir: `${name}/lib`,
      globals
    }
  ],
  external
}