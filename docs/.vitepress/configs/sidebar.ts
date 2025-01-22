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
  // sortMenusByFrontmatterDate: true, // 启用日期排序
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
  sortMenusByFrontmatterOrder: true,
  sortMenusOrderByDescending : true,
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
  '/knowledge/': {
    base: '/knowledge/',
    items: generateSidebar(KnowledgeSidebarOptions),
  },
  '/components/': {
    base: '/components/',
    items: generateSidebar(componentsGeneralSidebarOptions),
  },
  '/templates/': {
    base: '/templates/',
    items: generateSidebar(templatesGeneralSidebarOptions),
  },
};
