// 树形数据默认配置
export const DEFAULT_TREE_CONFIG = {
  transform: true,
  rowField: 'id',
  parentField: 'pid',
  childrenField: 'children',
  trigger: 'cell',
  hasChildField: 'hasChild',
  indent: 0,
  showIcon: false
};

// 垂直方向滚动条配置
export const DEFAULT_SCROLL_Y = { enabled: true }

// 默认分页配置
export const DEFAULT_PAGES = [5, 10, 20, 50];
export const DEFAULT_PAGE_CONFIG = {
  pagerCount: 7,
  currentPage: 1,
  pageSizes: DEFAULT_PAGES,
  pageSize: DEFAULT_PAGES[0],
  layout: 'total, prev, pager, next, sizes',
  size: 'sm'
};