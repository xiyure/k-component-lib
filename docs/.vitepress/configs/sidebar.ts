import { generateSidebar } from 'vitepress-sidebar';

const baseSidebarOptions = {
  documentRootPath: '/',
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  folderLinkNotIncludesFileName: true,
  sortMenusByFrontmatterDate: true, // 启用日期排序
  sortMenusOrderByDescending: true, // 升序
  // debugPrint: true,
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

const templatesGeneralSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: '/docs/templates',
  resolvePath: '/docs/templates',
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
  '/知识库/': {
    base: '/',
    items: [
      {
        text: '知识库',
        items: generateSidebar(KnowledgeSidebarOptions),
      },
    ],
  },
  '/components/': {
    base: '/',
    items: [
      {
        text: '组件文档',
        items: generateSidebar(componentsGeneralSidebarOptions),
      },
    ],
  },
  '/templates/': {
    base: '/',
    items: [
      {
        text: '模板文档',
        items: generateSidebar(templatesGeneralSidebarOptions),
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
