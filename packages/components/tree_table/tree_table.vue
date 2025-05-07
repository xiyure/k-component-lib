<template>
  <div
    :class="[
      'k-tree-table flex h-full flex-col',
      props.class,
      { 'tree-table-use-ant-style': useAntStyle, 'has-space-between': hasSpace }
    ]"
    :style="{ height: adaptive ? 'fit-content' : height, ...style }"
  >
    <!-- head -->
    <table-header
      ref="headerRef"
      v-model:current-mode="currentMode"
      :simple
      :show-search-input
      :show-description
      :show-header-tools
      :widgets="widgets"
      :data-length
      :show-total="!useTree"
      :filter-config
      :transfer-config
      @input-change="filter"
      @filter-confirm="refreshAdvancedFilter"
      @filter-clear="resetAdvancedFilter"
      @filter-show="advancedFilterShow"
      @filter-hide="advancedFilterHide"
      @transfer-change="updateColVisible"
      @transfer-show="transferShow"
      @transfer-hide="() => {
        transferHide();
        transferChange();
      }"
      @size-change="(size) => {
        _size = size || undefined;
      }"
      @transfer-drag="sortTableHeader"
      @refresh=" () => {
        emits('refresh');
      }"
      @switch-change="restoreTable"
    >
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </table-header>
    <!-- table -->
    <div v-if="isListMode" ref="RefTableBox" class="table-box flex-1 overflow-hidden">
      <k-table
        ref="xTree"
        :border="useAntStyle ? 'inner' : border"
        :size="tableSize"
        :data="showTableData"
        :row-config="rowConfig"
        :sort-config="sortConfig"
        :tree-config="treeConfig"
        :seq-config="seqConfig"
        :checkbox-config="checkboxConfig"
        :edit-config="editConfig"
        :column-config="columnConfig"
        :empty-text="emptyText || t?.('table.noData')"
        :scroll-y="scrollY"
        :row-style="getRowStyle"
        :show-overflow="showOverflow"
        :auto-resize="autoResize"
        :show-column-menu="showColumnMenu"
        :align="align"
        :round="useAntStyle || round"
        :height="adaptive ? undefined : '100%'"
        v-bind="$attrs"
        @checkbox-change="
          (data: any) => {
            checkBoxChange(data);
            emits('checkbox-change', data);
          }
        "
        @checkbox-all="
          (data: any) => {
            checkboxAllChange(data);
            emits('checkbox-all', data);
          }
        "
        @hide-column="hideColumn"
        @cell-click="
          (data: any) => {
            cellClick(data);
            emits('cell-click', data);
          }
        "
        @resizable-change="
          (data: any) => {
            transferChange();
            emits('resizable-change', data);
          }
        "
        @sort-change="onSortChange"
        @row-dragend="rowDragEnd"
      >
        <template v-for="(item, index) in columns" :key="index">
          <KColumnGroup :column="item" :size="size" :align="align">
            <template v-for="(_, name) in $slots" :key="name" #[name]="data">
              <slot :name="name" v-bind="data"></slot>
            </template>
          </KColumnGroup>
        </template>
        <template v-for="(_, name) in $slots" :key="name" #[name]="data">
          <slot :name="name" v-bind="data"></slot>
        </template>
      </k-table>
      <!-- 批量操作 -->
      <div
        v-if="(batchOperateConfig || showBatchOperation) && batchOpConfig.total > 0"
        v-ksw_drag
        class="batch-operate"
      >
        <k-operate v-bind="batchOpConfig" @close="closeBatchOperation" />
      </div>
    </div>
    <table-card
      v-else
      :data="showTableData"
      :key-field="rowConfig.keyField"
      :card-attrs="cardOptions"
    >
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </table-card>
    <!-- pagination -->
    <div v-if="isPaging" ref="RefTablePagination" class="pagination-box">
      <k-pagination
        v-bind="paginationConfig"
        :total="dataLength"
        @current-change="changeCurrentPage"
        @size-change="changePageSize"
        @change="
          (currentPage: number, pageSize: number) => {
            resetCheckboxStatus();
            emits('page-change', currentPage, pageSize);
          }
        "
        @prev-click="
          (value: number) => {
            emits('prev-click', value);
          }
        "
        @next-click="
          (value: number) => {
            emits('next-click', value);
          }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, provide, onBeforeMount } from 'vue';
import VXETable from 'vxe-table';
import { cloneDeep } from 'lodash-es';
import KColumnGroup from './column_group';
import { KOperate } from '../operate';
import { KTable } from '../table';
import { KPagination } from '../pagination';
import TableHeader from './table_header.vue';
import TableCard from './table_card.vue';
import type { ConditionInfo } from '../filter';
import {
  useMethods,
  useCheckbox,
  useData,
  useConfig,
  useHeaderControl,
  useAdvancedFilter
} from './hooks';
import { SIZE_KEY, useLocale, useDeprecated } from '../../hooks';
import { genRandomStr, sortFunc, getExposeProxy } from '../../utils';
import type { TreeTableProps, Column, RowData, Row, TableMode } from './type';
import { TABLE_SIZE_KEY } from './const';

defineOptions({
  name: 'KTreeTable'
});

const props = withDefaults(defineProps<TreeTableProps>(), {
  showPage: true,
  border: 'default',
  height: '100%',
  showOverflow: true,
  showHeader: true,
  showFilter: true,
  showRefresh: true,
  showSearchInput: true,
  showTransfer: false,
  showDescription: true,
  showHeaderTools: true,
  autoResize: true,
  showColumnMenu: false,
  cellClickToggleHighlight: true,
  round: false,
  hasSpace: false,
  defaultMode: 'list'
});

useDeprecated(
  {
    scope: 'k-tree-table',
    from: 'isRemoteQuery',
    replacement: 'searchConfig.isRemoteQuery',
    version: '2.0.0'
  },
  computed(() => !!props.isRemoteQuery)
);

useDeprecated(
  {
    scope: 'k-tree-table',
    from: 'isServerPaging',
    replacement: 'paginationConfig.isRemotePaging',
    version: '2.0.0'
  },
  computed(() => !!props.isServerPaging)
);

const { t } = useLocale();

const emits = defineEmits([
  'remote-query',
  'server-paging',
  'refresh',
  'highlight-clear',
  'highlight-change',
  'cell-click',
  'resizable-change',
  'hide-column',
  'checkbox-change',
  'checkbox-all',
  'row-dragend',
  'sort-change',
  'advanced-filter-confirm',
  'advanced-filter-clear',
  'page-current-change',
  'page-size-change',
  'page-change',
  'prev-click',
  'next-click'
]);

const xTree = ref();
const _size = ref(props.size);
const currentMode = ref<TableMode>(props.defaultMode === 'card' ? 'card' : 'list');
const headerRef = ref();
// 列配置
const columns = ref<Column[]>([]);
// 表格数据
const xeTableData = ref<RowData[]>([]);
// 搜索框关键词
const query = ref('');
const searchStr = ref('');

// 当前需要展示的数据（区分当前数据是基于高级筛选还是原始数据）
const currentData = computed(() => {
  const isUseFilter = Boolean(filterConditionInfo.value?.conditionList?.length);
  const isRemoteFilter = props.advancedFilterConfig?.remote === true;
  return isUseFilter && !isRemoteFilter ? newFilterData.value : xeTableData.value;
});

// 表格实例
const tableInstance = computed(() => {
  return xTree.value?.tableInstance ?? null;
});

// size
const tableSize = computed(() => _size.value ?? undefined);

// 表头控制器可见状态
const __showTransfer = computed(() => {
  const toolbarNames = widgets.value.map((item) => item.id);
  if (props.showHeaderTools && toolbarNames.includes('transfer')) {
    return true;
  }
  return false;
});

// 表头筛选相关
const filterConfig = computed(() => {
  const { remote, ignoreCase, dateFormat, defaultCondition } = props.advancedFilterConfig ?? {};
  return {
  conditionInfo: filterConditionInfo.value,
  data: xeTableData.value,
  columns: filterColumns.value,
  text: headerText.value,
  remote,
  ignoreCase,
  dateFormat,
  defaultCondition
}
});

// 表头控制器相关
const transferConfig = computed(() => ({
  selectData: selectData.value,
  originData: originData.value,
  defaultHeader: defaultHeader.value
}));

const isListMode = computed(() => currentMode.value === 'list');

// methods
const { setTableData, sortChange, dragSort, _methods } = useMethods(props, tableInstance);

// header control
const {
  flatColumns,
  selectData,
  originData,
  defaultHeader,
  updateTransfer,
  transferChange,
  transferHide,
  transferShow,
  sortTableHeader,
  updateColVisible,
  _transferMethods
} = useHeaderControl(tableInstance, headerRef, props, columns, handleCustomRender);

// advanced filter
const {
  newFilterData,
  filterColumns,
  filterConditionInfo,
  headerText,
  advancedFilterShow,
  advancedFilterHide,
  getAdvancedCondition
} = useAdvancedFilter(headerRef, props, columns);

// table data
const {
  showTableData,
  isPaging,
  dataLength,
  paginationConfig,
  tableCacheData,
  changePageSize,
  changeCurrentPage,
  handleTreeData,
  handleRemoteData
} = useData(
  tableInstance,
  props,
  emits,
  flatColumns,
  xeTableData,
  currentData,
  query,
  filterConditionInfo,
  setData
);

// config
const { widgets, treeConfig, sortConfig, rowConfig, editConfig, scrollY, columnConfig, seqConfig } =
  useConfig(props, { isPaging, paginationConfig });

// checkbox
const {
  checkboxConfig,
  batchOpConfig,
  closeBatchOperation,
  checkBoxChange,
  checkboxAllChange,
  initCheckedData,
  clearCheckedData,
  resetCheckboxStatus,
  _checkboxMethods
} = useCheckbox(tableInstance, props, xeTableData, showTableData, tableCacheData);

onBeforeMount(() => {
  refreshTableData();
});

watch(
  [() => props.data, () => props.data?.length],
  () => {
    clearCheckedData();
    setData(props.data ?? []);
    advancedFilter();
    initCheckedData();
  },
  { immediate: true }
);

watch(
  () => props.column,
  () => {
    columns.value = props.column.map((col) => {
      const visible = col.visible !== false;
      const field = col.field ?? `_table_column_${col.type ?? ''}`;
      return { ...cloneDeep(col), visible, field };
    });
    // 列配置更新时需要初始化表头控制器的数据
    updateTransfer();
    handleCustomRender();
  },
  { deep: true }
);

let isFilterStatus = false;
watch(
  () => showTableData.value?.length,
  () => {
    if (!props.useTree || !isListMode.value) {
      return;
    }
    nextTick(() => {
      if (query.value.trim() || isFilterStatus) {
        isFilterStatus = false;
        const maxLength = showTableData.value.length > 500 ? 500 : showTableData.value.length;
        const expandRows = showTableData.value.slice(0, maxLength);
        tableInstance.value?.setTreeExpand(expandRows, true);
      } else {
        tableInstance.value?.clearTreeExpand();
      }
    });
  },
  { immediate: true }
);

// 单元格样式
function getRowStyle(rowInfo: { row: Row; rowIndex: number; $rowIndex: number }) {
  if (!props.rowStyle) {
    const { row } = rowInfo;
    return row.style || {};
  }
  if (typeof props.rowStyle === 'function') {
    return props.rowStyle(rowInfo);
  }
  return props.rowStyle;
}

// 自定义单元格渲染
function handleCustomRender() {
  for (const col of flatColumns.value) {
    if (typeof col.render === 'function') {
      col.cellRender = {
        name: genRandomStr(16),
        ...(col.cellRender || {})
      };
      VXETable.renderer.add(col.cellRender.name as string, {
        renderDefault(_renderOpts, { row, column }) {
          return col.render?.({ row, column }) as any;
        }
      });
      VXETable.renderer.add(col.cellRender.name as string, {
        renderTableDefault(_renderOpts, { row, column }) {
          return col.render?.({ row, column }) as any;
        }
      });
    }
    if (typeof col.renderEdit === 'function') {
      col.editRender = {
        name: genRandomStr(16),
        ...(col.editRender || {})
      };
      VXETable.renderer.add(col.editRender.name as string, {
        renderTableEdit(_renderOpts, { row, column }) {
          return col.renderEdit?.({ row, column }) as any;
        }
      });
    }
  }
}

// 隐藏列
function hideColumn(column: Column) {
  if (!__showTransfer.value) {
    return;
  }
  const columnItem = flatColumns.value.find((item: Column) => item.field === column.field);
  if (!columnItem) {
    return;
  }
  columnItem.visible = false;
  selectData.value = flatColumns.value
    .filter((col: Column) => col.visible !== false)
    .map((item: Column) => {
      if (item.title && item.field) {
        return item.field;
      }
      return null;
    })
    .filter((item) => item !== null);
  emits('hide-column', column);
}

// 高级筛选相关方法
async function refreshAdvancedFilter(
  conditionInfo: ConditionInfo,
  newTableData: RowData[] = [],
  isEmit = true
) {
  filterConditionInfo.value = conditionInfo;
  const { remote } = props.advancedFilterConfig ?? {};
  if (remote === true) {
    await handleRemoteData();
    newFilterData.value = xeTableData.value;
    return;
  }
  resetCheckboxStatus();
  newFilterData.value = newTableData;
  if (props.useTree) {
    handleTreeData(newFilterData.value);
    const rowField = treeConfig.value?.rowField ?? 'id';
    newFilterData.value = sortFunc(
      [...tableCacheData.treeDataMap.values()],
      xeTableData.value,
      rowField
    );
  }
  if (conditionInfo?.conditionList?.length) {
    isFilterStatus = true;
  } else {
    isFilterStatus = false;
  }
  if (isEmit) {
    emits('advanced-filter-confirm', { conditionInfo, tableData: newTableData });
  }
}

function resetAdvancedFilter() {
  clearAdvancedFilter();
  emits('advanced-filter-clear')
}

// 行高亮
let isHighlight = false;
let preRowKey: string | number | null = null;
function cellClick({ row, rowid }: { row: Row; rowid: string | number }) {
  if (!props.cellClickToggleHighlight) {
    return;
  }
  if (!isHighlight) {
    isHighlight = true;
  } else if (isHighlight && preRowKey === rowid) {
    tableInstance.value?.setCurrentRow(null);
    isHighlight = false;
    preRowKey = null;
    emits('highlight-clear', row);
  }
  const currentHighlightRow = tableInstance.value?.getCurrentRecord();
  const currentRowId = tableInstance.value?.getRowid(currentHighlightRow);
  if (preRowKey !== rowid && currentRowId === rowid) {
    preRowKey = rowid;
  }
  emits('highlight-change', row, isHighlight);
}

// 刷新高级筛选的表格数据
async function advancedFilter(data?: RowData[] | undefined) {
  const $filter = getFilterInstance();
  if (!$filter) {
    return;
  }
  await nextTick();
  const advancedFilterObj = $filter?.filter?.(data);
  const { conditionInfo, data: tableData } = advancedFilterObj ?? {};
  await refreshAdvancedFilter(conditionInfo, tableData, false);
  return { conditionInfo, tableData };
}

// 清空高级筛选状态
async function clearAdvancedFilter() {
  const $filter = getFilterInstance();
  if (!$filter) {
    return;
  }
  await nextTick();
  resetCheckboxStatus();
  const advancedFilterObj = $filter?.clearFilter?.();
  const { conditionInfo, data: tableData } = advancedFilterObj ?? {};
  await refreshAdvancedFilter(conditionInfo, tableData, false);
  return { conditionInfo, tableData };
}

function getFilterInstance() {
  return headerRef.value?.filterRef?.[0];
}

// 搜索框搜索
function filter(searchStr: string) {
  query.value = searchStr ?? '';
  resetCheckboxStatus();
}

// 清空搜索框
function clearSearch() {
  searchStr.value = '';
  query.value = '';
}

// sort callback
function onSortChange(data: any) {
  const fieldRules = tableInstance.value.getSortColumns();
  sortChange(fieldRules);
  emits('sort-change', data);
}

// drag callback
function rowDragEnd(data: any) {
  dragSort();
  emits('row-dragend', data);
}

// 预留：card -> list 时可能会需要恢复表格切换card前的一些状态
async function restoreTable(mode: TableMode) {
  await nextTick();
  if (mode === 'list') {
    resetCheckboxStatus();
  }
}

// export
function getVisibleData() {
  return showTableData.value;
}
function getFullData() {
  return xeTableData.value;
}
function loadData(data: RowData[]) {
  if (!Array.isArray(data)) {
    return;
  }
  setData(data);
  advancedFilter(data);
}

function setData(data: RowData[]) {
  xeTableData.value = setTableData(data);
}

async function refreshTableData(isClearStatus = false) {
  const isRemoteSearch = props.searchConfig?.isRemoteQuery || props.isRemoteQuery;
  const isRemoteFilter = props.advancedFilterConfig?.remote === true;
  const isServerPaging =
    isPaging.value && (props.isServerPaging || props.paginationConfig?.isRemotePaging);
  if (isServerPaging || isRemoteSearch || isRemoteFilter) {
    if (isClearStatus) {
      clearCheckedData();
      resetCheckboxStatus();
    }
    handleRemoteData();
  }
}

provide('__showTransfer', __showTransfer);
provide(
  SIZE_KEY,
  computed(() => {
    if (_size.value === 'small' || _size.value === 'mini') {
      return 'sm';
    }
    return 'base';
  })
);
provide(TABLE_SIZE_KEY, _size);
provide(
  '__hasSpace__',
  computed(() => props.hasSpace)
);

const customMethods = {
  tableInstance,
  filter,
  advancedFilter,
  clearAdvancedFilter,
  getAdvancedCondition,
  getVisibleData,
  getFullData,
  loadData,
  clearSearch,
  refreshTableData,
  ..._methods,
  ..._checkboxMethods,
  ..._transferMethods
};

defineExpose(getExposeProxy(customMethods, tableInstance));
</script>

<style lang="less">
@import './style.less';
</style>
