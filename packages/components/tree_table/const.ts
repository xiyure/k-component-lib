// 默认分页配置
export const DEFAULT_PAGES = [25, 50, 80, 100, 150];
export const DEFAULT_PAGE_CONFIG = {
  pagerCount: 7,
  currentPage: 1,
  pageSizes: DEFAULT_PAGES,
  pageSize: DEFAULT_PAGES[0],
  total: 0
};

// 默认表头工具栏配置
export const DEFAULT_WIDGETS = new Map([
  ['search', 'search'],
  ['refresh', 'refresh'],
  ['filter', 'filter'],
  ['sizeControl', 'sizeControl'],
  ['transfer', 'transfer']
]);

// 默认行配置
export const DEFAULT_ROW_CONFIG = {
  isHover: true,
  isCurrent: true,
  useKey: true,
  keyField: 'id'
};

// 默认树配置
export const DEFAULT_TREE_CONFIG = {
  transform: true,
  rowField: 'id',
  parentField: 'pid',
  childrenField: 'children',
  trigger: 'cell',
  hasChildField: 'hasChild'
};

// 默认滚动条配置
export const DEFAULT_SCROLL_Y = { enabled: true };

// 默认列配置
export const DEFAULT_COLUMN_CONFIG = { resizable: true };

// 默认排序配置
export const DEFAULT_SORT_CONFIG = {};

// 默认Edit配置
export const DEFAULT_EDIT_CONFIG = {
  key: 'id',
  trigger: 'click',
  mode: 'cell'
};

export const SIZE_OPTIONS = [
  { label: '默认', value: '' },
  { label: '中等', value: 'medium' },
  { label: '小号', value: 'small' },
  { label: '紧凑', value: 'mini' }
];

export const TABLE_SIZE_KEY = Symbol('tableSize');