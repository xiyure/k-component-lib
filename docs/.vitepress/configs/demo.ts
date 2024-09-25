import { generateSidebar } from 'vitepress-sidebar';

const baseSidebarOptions = {
  documentRootPath: 'docs',
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  folderLinkNotIncludesFileName: true,
  debugPrint: true,
};

// const apiSidebarOptions = {
//   ...baseSidebarOptions,
//   scanStartPath: 'api',
//   resolvePath: '/api/',
// };

// const componentsSidebarOptions = {
//   ...baseSidebarOptions,
//   scanStartPath: 'components',
//   resolvePath: '/components/',
// };

const docsSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: 'components',
  resolvePath: '/components/',
  // manualSortFileNameByPriority: [
  //   "introduce.md",
  // ]
};

export default {
  // '/api/': {
  //   base: '/api/',
  //   items: [
  //     {
  //       text: 'Api',
  //       items: generateSidebar(apiSidebarOptions),
  //     },
  //   ],
  // },
  '/components/': {
    base: '/components/',
    items: generateSidebar(docsSidebarOptions),
  },
  // '/components/': {
  //   base: '/components/',
  //   items: [
  //     {
  //       text: '通用',
  //       collapsed: false,
  //       items: [
  //         { text: '按扭', link: 'button' },
  //       ],
  //     },
  //     {
  //       text: '数据展示',
  //       collapsed: false,
  //       items: [
  //         { text: '表格', link: 'filter' },
  //       ],
  //     },
  //   ],
  // },
};
