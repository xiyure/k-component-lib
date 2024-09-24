import { generateSidebar } from 'vitepress-sidebar';

const baseSidebarOptions = {
  documentRootPath: '/docs',
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  folderLinkNotIncludesFileName: true,
  sortMenusByFrontmatterDate: true, // 启用日期排序
  sortMenusOrderByDescending: true, // 升序
};

const KnowledgeSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: '/docs/知识库/',
  resolvePath: '/docs/知识库/',
};

// const apiSidebarOptions = {
//   ...baseSidebarOptions,
//   scanStartPath: 'api',
//   resolvePath: '/api/',
// };

const componentsGeneralSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: '/docs/components',
  resolvePath: '/docs/components',
};

// const docsSidebarOptions = {
//   ...baseSidebarOptions,
//   scanStartPath: 'docs',
//   resolvePath: '/docs/',
//   manualSortFileNameByPriority: [
//     "introduce.md",
//   ]
// };

export default {
  '/docs/知识库/': {
    base: '/',
    items: [
      {
        text: '知识库',
        items: generateSidebar(KnowledgeSidebarOptions),
      },
    ],
  },
  '/docs/components/': {
    base: '/',
    items: [
      {
        text: '组件文档',
        items: generateSidebar(componentsGeneralSidebarOptions),
      },
    ],
  },

  // '/api/': {
  //   base: '/api/',
  //   items: [
  //     {
  //       text: 'Api',
  //       items: generateSidebar(apiSidebarOptions),
  //     },
  //   ],
  // },
  // '/docs/': {
  //   base: '/docs/',
  //   items: [
  //     {
  //       text: '如何使用',
  //       items: generateSidebar(docsSidebarOptions),
  //     },
  //   ],
  // },
};
