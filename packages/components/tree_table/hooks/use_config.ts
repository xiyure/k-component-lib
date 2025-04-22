import { computed, Ref } from 'vue';
import { cloneDeep } from 'lodash-es';
import {
  DEFAULT_WIDGETS,
  DEFAULT_ROW_CONFIG,
  DEFAULT_TREE_CONFIG,
  DEFAULT_COLUMN_CONFIG,
  DEFAULT_SCROLL_Y,
  DEFAULT_EDIT_CONFIG,
  DEFAULT_SORT_CONFIG } from '../const';
import { TreeTableProps } from '../type';

type Options = {
  isPaging: Ref<boolean | undefined>
  paginationConfig: Ref<any>
}
export function useConfig(props: TreeTableProps, options: Options) {
  const { isPaging, paginationConfig } = options;

  const defaultSeqConfig = {
    seqMethod: ({ rowIndex }: { rowIndex: number }) => {
      const startIndex = props.seqConfig?.startIndex ?? 1;
      if (isPaging.value) {
        const { pageSize, currentPage } = paginationConfig.value;
        return (currentPage - 1) * pageSize + rowIndex + startIndex;
      }
      return rowIndex + startIndex;
    }
  };

  // 表头工具栏模型配置
  const widgets = computed(() => {
    const widgetsList: ({
      id: string;
      slot: string | null;
    } & any)[] = [];
    if (!Array.isArray(props.widgets)) {
      // 兼容老版本参数
      if (props.showSearchInput) {
        widgetsList.push({
          id: 'search',
          slot: null
        });
      }
      if (props.showRefresh) {
        widgetsList.push({
          id: 'refresh',
          slot: null
        });
      }
      if (props.showFilter) {
        widgetsList.push({
          id: 'filter',
          slot: null
        });
      }
      if (props.showSizeControl) {
        widgetsList.push({
          id: 'sizeControl',
          slot: null
        });
      }
      if (props.showTransfer) {
        widgetsList.push({
          id: 'transfer',
          slot: null
        });
      }
      return widgetsList;
    }
    for (const widget of props.widgets) {
      if (!widget) {
        continue;
      }
      const t = typeof widget;
      if (t === 'string') {
        if (DEFAULT_WIDGETS.get(widget as string)) {
          widgetsList.push({ id: widget, slot: null });
        } else {
          widgetsList.push({ id: widget, slot: widget });
        }
      } else if (t === 'object' || t === 'function') {
        widgetsList.push(widget);
      }
    }
    return widgetsList;
  });
  // 合并用户与表格默认配置
  const treeConfig = computed(() => {
    if (props.useTree) {
      return Object.assign(cloneDeep(DEFAULT_TREE_CONFIG), props.treeConfig || {});
    }
    return undefined;
  });
  const sortConfig = computed(() => Object.assign(cloneDeep(DEFAULT_SORT_CONFIG), props.sortConfig || {}));
  const rowConfig = computed(() => Object.assign(cloneDeep(DEFAULT_ROW_CONFIG), props.rowConfig));
  const editConfig = computed(() => Object.assign(cloneDeep(DEFAULT_EDIT_CONFIG), props.editConfig || {}));
  const scrollY = computed(() => {
    const scrollYConfig = Object.assign(cloneDeep(DEFAULT_SCROLL_Y), props.scrollY || {});
    if (props.adaptive) {
      scrollYConfig.enabled = false;
    }
    return scrollYConfig;
  });
  const columnConfig = computed(() => Object.assign(cloneDeep(DEFAULT_COLUMN_CONFIG), props.columnConfig || {}));
  const seqConfig = computed(() => Object.assign(cloneDeep(defaultSeqConfig), props.seqConfig || {}));

  return {
    widgets,
    treeConfig,
    sortConfig,
    rowConfig,
    editConfig,
    scrollY,
    columnConfig,
    seqConfig
  }
}