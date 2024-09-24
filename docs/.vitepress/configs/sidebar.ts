import { generateSidebar } from 'vitepress-sidebar';

const baseSidebarOptions = {
  documentRootPath: '/docs',
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  folderLinkNotIncludesFileName: true,
  // debugPrint: true,
};

const apiSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: 'api',
  resolvePath: '/api/',
};

const componentsSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: 'components',
  resolvePath: '/components/',
};

const docsSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: 'components',
  resolvePath: '/components/',
  basePath: '/components/'
  // manualSortFileNameByPriority: [
  //   "introduce.md",
  // ]
};
console.log(generateSidebar(docsSidebarOptions));
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
  // '/components/': {
  //   base: '/components/',
  //   items: [
  //     {
  //       text: '通用',
  //       items: generateSidebar(componentsSidebarOptions),
  //     },
  //     {
  //       text: '通用3',
  //       items: generateSidebar(componentsSidebarOptions),
  //     },
  //   ],
  // },
  '/components/': {
    base: '/components/',
    items: [
      {
        text: '如何使用',
        items: generateSidebar(docsSidebarOptions),
      },
    ],
  },
};

