import { generateSidebar } from 'vitepress-sidebar';

const baseSidebarOptions = {
  documentRootPath: 'docs',
  useTitleFromFileHeading: true, // 启用后，会从文件头部的 title 标签获取标题
  useTitleFromFrontmatter: true, // 启用后，会从 frontmatter 中获取标题
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: false, // 启用后，会将文件夹的名称作为链接，而不是文件夹下面的 index.md 文件
  convertSameNameSubFileToGroupIndexPage: true,
  // folderLinkNotIncludesFileName: true,
  underscoreToSpace: true, // _转为空格
  capitalizeFirst: true, //首字母强制大写
  sortMenusByFrontmatterDate: true, // 启用日期排序
  // sortMenusOrderByDescending: true, // 升序
  collapsed: false, // 文件夹折叠
  // debugPrint: true,
};

const KnowledgeSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: 'knowledge',
  resolvePath: '/knowledge/',
  sortMenusByFrontmatterDate: true, // 启用日期排序
  sortMenusOrderByDescending: true, // 升序
};

// const apiSidebarOptions = {
//   ...baseSidebarOptions,
//   scanStartPath: 'api',
//   resolvePath: '/api/',
// };

const componentsGeneralSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: 'components',
  resolvePath: '/components/',
  manualSortFileNameByPriority: ['General', 'Navigation'], // 手动排序
};

const templatesGeneralSidebarOptions = {
  ...baseSidebarOptions,
  scanStartPath: 'templates',
  resolvePath: '/templates/',
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
  // '/knowledge/': {
  //   base: '/',
  //   items: [
  //     {
  //       text: '知识库',
  //       items: generateSidebar(KnowledgeSidebarOptions),
  //     },
  //   ],
  // },
  // '/docs/components/': {
  //   base: '/',
  //   items: [
  //     {
  //       text: '组件文档',
  //       items: generateSidebar(componentsGeneralSidebarOptions),
  //     },
  //   ],
  // },
  '/docs/knowledge/': {
    base: '/docs/knowledge/',
    items: generateSidebar(KnowledgeSidebarOptions),
  },
  '/docs/components/': {
    base: '/docs/components/',
    items: generateSidebar(componentsGeneralSidebarOptions),
  },
  '/docs/templates/': {
    base: '/docs/templates/',
    items: generateSidebar(templatesGeneralSidebarOptions),
  },
  // '/docs/templates/': {
  //   base: '/docs/templates/',
  //   items: [
  //     {
  //       text: '模板文档',
  //       items: generateSidebar(templatesGeneralSidebarOptions),
  //     },
  //   ],
  // },
  // '/docs/templates/': {
  //   base: '/',
  //   items: [
  //     {
  //       text: '模板文档',
  //       items: generateSidebar(templatesGeneralSidebarOptions),
  //     },
  //   ],
  // },
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
