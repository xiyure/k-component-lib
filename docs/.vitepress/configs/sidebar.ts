import { generateSidebar } from 'vitepress-sidebar';

const baseSidebarOptions = {
  documentRootPath: '/',
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  folderLinkNotIncludesFileName: true,
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
  scanStartPath: 'docs',
  resolvePath: '/docs/',
  manualSortFileNameByPriority: [
    "introduce.md",
  ]
};

export default {
  '/api/': {
    base: '/api/',
    items: [
      {
        text: 'Api',
        items: generateSidebar(apiSidebarOptions),
      },
    ],
  },
  '/components/': {
    base: '/components/',
    items: [
      {
        text: '通用',
        items: generateSidebar(componentsSidebarOptions),
      },
    ],
  },
  '/docs/': {
    base: '/docs/',
    items: [
      {
        text: '文档',
        items: generateSidebar(docsSidebarOptions),
      },
    ],
  },
};