<template>
  <div :class="['k-tree-table', props.class]" :style="{ height: height, ...style }">
    <div
      v-if="showHeaderTools"
      class="k-tree-table__header"
      :style="{
        justifyContent: showDescription ? 'space-between' : 'flex-end',
        height: compSize === 'sm' ? '24px' : '32px',
      }"
    >
      <div v-if="showDescription" class="k-table-info">
        <slot name="description" :total="dataLength" :condition-info="filterConditionInfo">
          <span v-if="!useTree">
            {{ $t('total') }}
            {{ dataLength }}
            {{ $t('data') }}
          </span>
          <span :title="headerText" class="condition-info">
            {{ headerText }}
          </span>
          <span
            v-if="filterConditionInfo?.conditionList?.length && tableFilterRef?.[0]?.clearFilter"
            class="filter-reset"
            @click="clearAdvancedFilter"
          >
            · {{ $t('reset') }}
          </span>
        </slot>
      </div>
      <div class="k-table-func">
        <template v-for="widget in widgets" :key="widget.id">
          <template v-if="widget.slot && $slots[widget.slot]">
            <slot :name="widget.slot"></slot>
          </template>
          <template v-else-if="widget.widget">
            <component
              :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
            />
          </template>
          <template v-else-if="widget.id === 'search'">
            <k-input
              v-model="searchStr"
              :suffix-icon="IconSearch"
              :placeholder="$t('searchTable')"
              clearable
              :size="compSize"
              @change="filter"
            />
          </template>
          <template v-else-if="widget.id === 'refresh'">
            <k-button
              v-ksw_tooltip="$t('refresh')"
              :size="compSize"
              @click="
                () => {
                  emits('refresh');
                }
              "
            >
              <IconRefresh />
            </k-button>
          </template>
          <template v-else-if="widget.id === 'filter'">
            <!-- 高级筛选 -->
            <k-filter
              ref="tableFilterRef"
              :data="fullData"
              :column="filterColumns"
              :size="compSize"
              children-field="group"
              filter-key="field"
              :default-condition="
                advancedFilterConfig?.defaultCondition ?? filterConditionInfo"
              @confirm="refreshAdvancedFilter"
            >
              <template #reference="{ hasConfigCondition }">
                <k-button v-ksw_tooltip="$t('advancedFilter_c')" :size="compSize">
                  <IconFilter v-if="!hasConfigCondition" />
                  <IconFilterFill v-else color="#2882FF" />
                </k-button>
              </template>
            </k-filter>
          </template>
          <template v-else-if="widget.id === 'transfer'">
            <!-- 穿梭框 -->
            <k-popover trigger="click" width="auto" :teleported="false">
              <template #reference>
                <k-button v-ksw_tooltip="$t('columnHeaderController')" :size="compSize">
                  <IconSetting />
                </k-button>
              </template>
              <k-transfer
                v-model="selectData"
                :data="originData"
                :default-keys="defaultHeader"
                :titles="[$t('unselectedFields'), $t('selectedFields')]"
                @change="updateColumn"
                @reset="updateColumn"
                @sort="sortTableHeader"
              ></k-transfer>
            </k-popover>
          </template>
        </template>
      </div>
    </div>
    <div class="table-box" :style="{ height: tableHeight }">
      <k-table
        ref="xTree"
        :border="border"
        :size="size"
        height="100%"
        :data="showTableData"
        :row-config="rowConfig"
        :sort-config="sortConfig"
        :tree-config="treeConfig"
        :checkbox-config="checkboxConfig"
        :edit-config="editConfig"
        :column-config="columnConfig"
        :empty-text="emptyText || $t('noData')"
        :scroll-y="scrollY"
        :row-style="getRowStyle"
        :show-overflow="showOverflow"
        :auto-resize="autoResize"
        :show-column-menu="showColumnMenu"
        :show-drag-column="showDragColumn"
        :align="align"
        v-bind="$attrs"
        @checkbox-change="
          (data) => {
            checkBoxChange(data);
            emits('checkbox-change', data);
          }
        "
        @checkbox-all="
          (data) => {
            checkboxAll(data);
            emits('checkbox-all', data);
          }
        "
        @hide-column="
          (data) => {
            hideColumn(data);
            emits('hide-column', data);
          }
        "
        @cell-click="
          (data) => {
            cellClick(data);
            emits('cell-click', data);
          }
        "
        @drag-end="
          (data) => {
            dragEnd(data);
          }
        "
      >
        <template v-for="(item, index) in columns" :key="index">
          <KColumnGroup :column="item" :size="size" :align="align">
            <template v-for="(_, name) in $slots" :key="name" #[name]="data">
              <slot :name="name" v-bind="data"></slot>
            </template>
          </KColumnGroup>
        </template>
        <template v-if="slots.empty" #empty>
          <slot name="empty"></slot>
        </template>
        <template v-if="slots.dragIcon" #dragIcon>
          <slot name="dragIcon"></slot>
        </template>
        <template v-if="slots.loading" #loading>
          <slot name="loading"></slot>
        </template>
      </k-table>
      <!-- 批量操作 -->
      <div v-if="showBatchOperation && checkedDataSize > 0" v-ksw_drag class="batch-operate">
        <k-operate
          :data-size="checkedDataSize"
          :data="batchOperations"
          @close="closeBatchOperation"
        />
      </div>
    </div>
    <div v-if="isPaging" class="pagination-box">
      <k-pagination
        :total="dataLength"
        :page-size="paginationConfig.pageSize"
        :pager-count="paginationConfig.pagerCount"
        :page-sizes="paginationConfig.pageSizes"
        :current-page="paginationConfig.currentPage"
        :layout="paginationConfig.layout"
        :size="compSize"
        @current-change="changeCurrentPage"
        @size-change="changePageSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, getCurrentInstance } from 'vue';
import VXETable from 'vxe-table';
import { IconSearch, IconSetting, IconRefresh, IconFilter, IconFilterFill } from 'ksw-vue-icon';
import { cloneDeep } from 'lodash-es';
import KColumnGroup from './column_group';
import { KInput } from '../input';
import { KButton } from '../button';
import { KTransfer } from '../transfer';
import { KPopover } from '../popover';
import { KOperate } from '../operate';
import { KTable } from '../table';
import { KPagination } from '../pagination';
import { KFilter } from '../filter';
import { TreeTableProps, columnConfigType } from './type';
import { genRandomStr, treeDataToArray, getValidTreeData, resetTreeData } from '../../utils';

defineOptions({
  name: 'KTreeTable',
});

const props = withDefaults(defineProps<TreeTableProps>(), {
  showPage: true,
  border: 'default',
  height: '100%',
  showOverflow: true,
  showHeader: true,
  showFilter: true,
  showRefresh: false,
  showSearchInput: true,
  showTransfer: false,
  showDescription: true,
  showHeaderTools: true,
  autoResize: true,
  showColumnMenu: false,
  cellClickToggleHighlight: true,
});

const slots = defineSlots();
const _global = getCurrentInstance()?.appContext.app.config.globalProperties;
const t = _global?.$t;
const DEFAULT_PAGES = [25, 50, 80, 100, 150];
const DEFAULT_WIDGETS = new Map([
  ['search', 'search'],
  ['filter', 'filter'],
  ['refresh', 'refresh'],
  ['transfer', 'transfer'],
]);
// 表格默认配置
const defaultRowConfig = {
  isHover: true,
  isCurrent: true,
  useKey: true,
  keyField: 'id',
};
const defaultTreeConfig = {
  transform: true,
  rowField: 'id',
  parentField: 'pid',
  childrenField: 'children',
  trigger: 'cell',
  hasChildField: 'hasChild',
};
const defaultPaginationConfig = {
  pagerCount: 7,
  currentPage: 1,
  pageSizes: DEFAULT_PAGES,
  pageSize: DEFAULT_PAGES[0],
};
const defaultSortConfig = {};
const defaultCheckboxConfig = {};
const defaultEditConfig = {
  key: 'id',
  trigger: 'click',
  mode: 'cell',
};

const defaultScrollY = { enabled: true };
const defaultColumnConfig = { resizable: true };

onMounted(() => {
  const { checkRowKeys } = checkboxConfig.value;
  if (Array.isArray(checkRowKeys)) {
    for (const id of checkRowKeys) {
      checkedData.add(id);
    }
    checkedDataSize.value = checkedData.size;
  }
});
const emits = defineEmits([
  'remote-query',
  'server-paging',
  'refresh',
  'highlight-clear',
  'highlight-change',
  'cell-click',
  'hide-column',
  'checkbox-change',
  'checkbox-all',
  'drag-end',
]);
const xTree = ref();
// 列配置
const columns = ref<any>([]);
const flatColumns = ref<any>([]);
// 表格数据
const xeData = ref<any>(null);
// 搜索框关键词
const query = ref('');
const searchStr = ref('');
// 穿梭框
const selectData = ref<any>([]);
const originData = ref<any>([]);
const defaultHeader = ref<string[]>([]);
// 高级筛选
const tableFilterRef = ref(); // 高级筛选后的数据
const newFilterData = ref<any>([]);
const filterConditionInfo: any = ref(null);
// 分页配置
const paginationConfig = ref<any>(defaultPaginationConfig);

const widgets = computed(() => {
  const widgetsList: any[] = [];
  if (!Array.isArray(props.widgets)) {
    // 兼容老版本参数
    if (props.showSearchInput) {
      widgetsList.push({
        id: 'search',
        slot: null,
      });
    }
    if (props.showRefresh) {
      widgetsList.push({
        id: 'refresh',
        slot: null,
      });
    }
    if (props.showFilter) {
      widgetsList.push({
        id: 'filter',
        slot: null,
      });
    }
    if (props.showTransfer) {
      widgetsList.push({
        id: 'transfer',
        slot: null,
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
// 表格数据
const fullData = computed(() => {
  const _tableData = Array.isArray(xeData.value) ? xeData.value : props.data ?? [];
  return _tableData;
});
// 高级筛选功能只处理非特殊、可见的有效数据
const filterColumns = computed(() => {
  const { filterColumns, filterAll, exclude = [] } = props.advancedFilterConfig ?? {};
  const validColumns = getValidTreeData(
    cloneDeep(columns.value),
    'group',
    (dataItem) => !dataItem.type &&
      dataItem.title && dataItem.field &&
      (filterAll !== false || dataItem.visible !== false) &&
      !exclude.includes(dataItem.field)
  );
  if (filterColumns) {
    return resetTreeData(validColumns, 'group', filterColumns, 'field');
  }
  return validColumns;
});
// 表格实例
const $tableMethods = new Map();
const tableInstance = computed(() => {
  const tableInstance = xTree.value?.tableInstance;
  rewriteTableMethods(tableInstance);
  return tableInstance;
});
const headerText = computed(() => {
  let text = '';
  if (filterConditionInfo.value?.conditionList?.length) {
    filterConditionInfo.value.conditionList.forEach((item: any, index: number) => {
      const point = props.useTree && index === 0 ? '' : '·';
      text += `  ${point} ${item.title} ${item.logic} ${item.showValue}`;
    });
  } else {
    const point = props.useTree ? '' : '· ';
    text += `${point}${t?.('showAll')}`;
  }
  return text;
});

// 表格高度计算
const tableHeight = computed(() => {
  const isShowHeader = (props.showDescription || widgets.value?.length) && props.showHeaderTools;
  const headerHeight = isShowHeader ? (props.size === 'mini' ? 34 : 42) : 0;
  const pageHeight = isPaging.value ? (props.size === 'mini' ? 34 : 42) : 0;
  return `calc(100% - ${headerHeight}px - ${pageHeight}px)`;
});
// 合并用户与表格默认配置
const treeConfig = computed(() => {
  if (props.useTree) {
    return Object.assign(defaultTreeConfig, props.treeConfig || {});
  }
  return undefined;
});
const sortConfig = computed(() => Object.assign(defaultSortConfig, props.sortConfig || {}));
const rowConfig = computed(() => Object.assign(defaultRowConfig, props.rowConfig || {}));
const editConfig = computed(() => Object.assign(defaultEditConfig, props.editConfig || {}));
const scrollY = computed(() => Object.assign(defaultScrollY, props.scrollY || {}));
const columnConfig = computed(() => Object.assign(defaultColumnConfig, props.columnConfig || {}));
const checkboxConfig = computed(() => Object.assign(defaultCheckboxConfig, props.checkboxConfig || {}));
// 是否分页
const isPaging = computed(() => props.showPage && !props.useTree);

// 页面展示的表格数据
const visibleData = computed(() => filterTableData());
const showTableData = computed(() => {
  const { isRemotePaging } = paginationConfig.value;
  if (!isPaging.value || props.isServerPaging || isRemotePaging) {
    return visibleData.value;
  }
  return getShowTableData(visibleData.value);
});
// 表格数据量
const dataLength = computed(() => visibleData.value.length ?? 0);
// 表格size控制
const compSize = computed(() => (props.size === 'mini' ? 'sm' : undefined));

watch(
  () => props.paginationConfig,
  () => {
    paginationConfig.value = Object.assign(paginationConfig.value, props.paginationConfig || {});
  },
  { immediate: true, deep: true },
);
watch(
  () => props.column,
  () => {
    columns.value = props.column.map((col) => {
      const visible = col.visible !== false;
      return { ...(cloneDeep(col)), visible };
    });
    // 列配置更新时需要初始化表头控制器的数据
    initTransfer();
    handleCustomRender();
  },
  { immediate: true, deep: true },
);

let isFilterStatus = false;
watch(() => showTableData.value?.length, () => {
  if (!props.useTree) {
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
}, { immediate: true });

// 表格内容搜索
let tableDataMap: Map<string | number, any> = new Map();
const treeDataMap: Map<string | number, any> = new Map();
function filterTableData() {
  const filterData = filterConditionInfo.value?.conditionList?.length ?
    newFilterData.value :
    fullData.value;
  const { strict, searchMethod } = props.searchConfig ?? {};
  const searchKey = query.value.trim().replace(/\\/g, '\\\\');
  if (!searchKey) {
    return filterData;
  }
  if (props.isRemoteQuery || props.searchConfig?.isRemoteQuery) {
    emits('remote-query', searchKey);
    return filterData;
  }
  if (typeof searchMethod === 'function') {
    return searchMethod(searchKey, filterData);
  }
  const visibleColumns = flatColumns.value.filter((col: columnConfigType) => col.visible !== false);
  const fieldList = visibleColumns.map((col: columnConfigType) => col.field || '');
  let tableData = filterData.filter((dataItem: any) => fieldList.some((field: string) => {
    const cellLabel = xTree.value?.tableInstance.getCellLabel(dataItem, field);
    if (strict === true) {
      return cellLabel === searchKey;
    }
    return String(cellLabel).toLowerCase().search(searchKey.toLowerCase()) !== -1;
  })) as any;
  // 当表格数据为树时，筛选后的数据应展示完整的子树
  if (props.useTree) {
    const { rowField } = getTreeConfigField();
    tableDataMap = new Map(fullData.value.map((item) => [item[rowField], item]));
    handleTreeData(tableData);
    tableData = sortFunc([...treeDataMap.values()], fullData.value, rowField);
  } else {
    updatePageNum(tableData.length);
  }
  return tableData;
}
// 处理树形数据
function handleTreeData(leafData: any[]) {
  const { parentField, rowField } = getTreeConfigField();
  treeDataMap.clear();
  for (let index = 0; index < leafData.length; index++) {
    const dataItem = leafData[index];
    // 如果tableData中已存在该数据，则不再重复添加
    const targetItem = treeDataMap.get(dataItem[rowField]);
    if (targetItem) {
      continue;
    }
    treeDataMap.set(dataItem[rowField], dataItem);
    getParentNode(dataItem, parentField, rowField);
  }
  addChildNodes(leafData);
}
function addChildNodes(leafData: any[]) {
  const { parentField, rowField } = getTreeConfigField();
  const childrenMap = new Map(leafData.map((item) => [item[rowField], item]));
  for (const dataItem of fullData.value) {
    const parentKey = dataItem[parentField];
    if (childrenMap.get(parentKey)) {
      treeDataMap.set(dataItem[rowField], dataItem);
    }
  }
}
// 根据叶子节点递归遍历获取祖先节点
function getParentNode(dataItem: any, parentField: string, rowField: string) {
  const parentKey = dataItem[parentField];
  const parentItem = tableDataMap.get(parentKey);
  if (!parentItem) {
    return;
  }
  if (!treeDataMap.get(parentKey)) {
    treeDataMap.set(parentKey, parentItem);
  }
  if (parentItem[parentField] !== null) {
    getParentNode(parentItem, parentField, rowField);
  }
}
// 筛选后的数据与用户输入数据的顺序保持一致
function sortFunc(targetData: any[], sortData: any, key: string | number) {
  const sortKeyList = sortData.map((item: any) => item[key]);
  return targetData.sort((a, b) => (sortKeyList.indexOf(a[key]) < sortKeyList.indexOf(b[key]) ? -1 : 1));
}
// 分页相关
function changePageSize(pageSize: number) {
  paginationConfig.value.pageSize = pageSize;
  const { isRemotePaging } = paginationConfig.value;
  if (props.isServerPaging || isRemotePaging) {
    emits('server-paging', paginationConfig.value);
  }
}
function changeCurrentPage(pageNum: number) {
  paginationConfig.value.currentPage = pageNum;
  const { isRemotePaging } = paginationConfig.value;
  if (props.isServerPaging || isRemotePaging) {
    emits('server-paging', paginationConfig.value);
  }
}
function getShowTableData(data: any[]) {
  const { isRemotePaging } = paginationConfig.value;
  if (props.isServerPaging || isRemotePaging) {
    emits('server-paging', paginationConfig.value);
    return data;
  }
  const { currentPage, pageSize } = paginationConfig.value;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
}
// 数据最大页码小于当前页码时，需要修改当前页码
function updatePageNum(length: number) {
  let { currentPage } = paginationConfig.value;
  const pageSize = paginationConfig.value.pageSize;
  while ((currentPage - 1) * pageSize + 1 > length && currentPage > 1) {
    currentPage--;
  }
  paginationConfig.value.currentPage = currentPage;
}
function getRowStyle(rowInfo: any) {
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
    if (col.render) {
      col.cellRender = {
        name: genRandomStr(16),
        ...(col.cellRender || {}),
      };
      VXETable.renderer.add(col.cellRender.name, {
        renderDefault(_renderOpts, { row, column }) {
          return col.render({ row, column });
        },
      });
    }
    if (col.renderEdit) {
      col.editRender = {
        name: genRandomStr(16),
        ...(col.editRender || {}),
      };
      VXETable.renderer.add(col.editRender.name, {
        renderEdit(_renderOpts, { row, column }) {
          return col.renderEdit({ row, column });
        },
      });
    }
  }
}
function getTreeConfigField() {
  const parentField = treeConfig.value?.parentField || 'pid';
  const rowField = treeConfig.value?.rowField || 'id';
  return { parentField, rowField };
}
function updateColumn(ids: string[]) {
  flatColumns.value.forEach((col: columnConfigType) => {
    if (!col.type) {
      if (ids.includes(col.field as string)) {
        col.visible = true;
      } else {
        col.visible = false;
      }
    }
  });
}
// 表头控制相关方法
function initTransfer() {
  flatColumns.value = treeDataToArray(columns.value, 'group');
  originData.value = flatColumns.value
  .map((item: columnConfigType) => {
    if (item.title && item.field) {
      return {
        label: item.title,
        key: item.field,
      };
    }
    return null;
  })
  .filter((item: columnConfigType) => item);
  selectData.value = flatColumns.value
  .filter((col: columnConfigType) => col.visible !== false)
  .map((item: columnConfigType) => ({
    label: item.title,
    key: item.field,
  }));
  defaultHeader.value = selectData.value.map((item: columnConfigType) => item.key);
}
function hideColumn(column: columnConfigType) {
  if (!props.showHeaderTools || !widgets.value?.includes('transfer')) {
    return;
  }
  const columnItem = flatColumns.value.find((item) => item.field === column.field);
  columnItem.visible = false;
  selectData.value = flatColumns.value
  .filter((col) => col.visible !== false)
  .map((item: any) => ({
    label: item.title,
    key: item.field,
  }));
}
function sortTableHeader(fieldList: string[]) {
  const map = new Map(flatColumns.value.map((v: columnConfigType) => [v.field, v]));
  const setData = (columns: columnConfigType) => {
    for (const key in columns) {
      const col = columns[key];
      if (Array.isArray(col.group) && col.group.length > 0) {
        setData(col.group);
      } else {
        const field = fieldList.shift();
        columns[key] = map.get(field);
      }
    }
  };
  setData(columns.value);
  flatColumns.value = treeDataToArray(columns.value, 'group');
}
function refreshAdvancedFilter(conditionInfo: any, newTableData: any[]) {
  filterConditionInfo.value = conditionInfo;
  newFilterData.value = newTableData;
  if (props.useTree) {
    handleTreeData(newFilterData.value);
    const { rowField } = getTreeConfigField();
    newFilterData.value = sortFunc([...treeDataMap.values()], fullData.value, rowField);
  }
  if (conditionInfo?.conditionList?.length) {
    isFilterStatus = true;
  } else {
    isFilterStatus = false;
  }
}
function filter(searchStr: string) {
  query.value = searchStr ?? '';
}
// 行高亮
let isHighlight = false;
let preRowKey = null;
function cellClick({ row, rowid }) {
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
// 批量操作
const checkedData = new Set();
const checkedDataSize = ref(0);
function checkBoxChange({ row, checked }) {
  if (!props.showBatchOperation) {
    return;
  }
  const keyField = rowConfig.value.keyField;
  if (checked) {
    checkedData.add(row[keyField]);
  } else {
    checkedData.delete(row[keyField]);
  }
  checkedDataSize.value = checkedData.size;
}
function checkboxAll({ checked }) {
  if (!props.showBatchOperation) {
    return;
  }
  for (const row of showTableData.value) {
    if (isCheckboxDisabled(row)) {
      continue;
    }
    const keyField = rowConfig.value.keyField;
    if (checked) {
      checkedData.add(row[keyField]);
    } else {
      checkedData.delete(row[keyField]);
    }
  }
  checkedDataSize.value = checkedData.size;
}
function closeBatchOperation() {
  checkedData.clear();
  checkedDataSize.value = 0;
  tableInstance.value?.clearCheckboxRow?.();
  tableInstance.value?.clearCheckboxReserve?.();
}
function isCheckboxDisabled(row: any) {
  const { visibleMethod, checkMethod } = checkboxConfig.value;
  if (typeof visibleMethod === 'function' && !visibleMethod({ row })) {
    return true;
  }
  if (typeof checkMethod === 'function' && !checkMethod({ row })) {
    return true;
  }
  return false;
}
function dragEnd(data: any[]) {
  emits('drag-end', {
    data,
    originData: fullData.value,
  });
}

// 刷新高级筛选的表格数据
function advancedFilter(data: any[] | undefined) {
  tableFilterRef.value?.[0]?.filter(data);
}
function clearAdvancedFilter() {
  tableFilterRef.value?.[0]?.clearFilter();
}
// 重写部分vxe的原生方法满足业务需求
const methods = {
  setAllCheckboxRow,
  setCheckboxRow,
  loadData,
  getRowById
};
function rewriteTableMethods(instance: any) {
  if (typeof instance !== 'object') {
    return;
  }
  for (const methodName in methods) {
    if (typeof instance[methodName] === 'function' && !$tableMethods.get(methodName)) {
      $tableMethods.set(methodName, instance[methodName].bind(instance));
    }
    instance[methodName] = methods[methodName];
  }
}
function setCheckboxRow(rows: any[], checked: boolean) {
  const newRows = Array.isArray(rows) ? rows : [rows];
  const keyField = rowConfig.value.keyField ?? 'id';
  for (const row of newRows) {
    if (checked) {
      checkedData.add(row[keyField]);
    } else {
      checkedData.delete(row[keyField]);
    }
  }
  checkedDataSize.value = checkedData.size;
  $tableMethods.get('setCheckboxRow')(rows, checked);
}
function setAllCheckboxRow(checked: boolean) {
  const keyField = rowConfig.value.keyField ?? 'id';
  if (checked) {
    for (const row of showTableData.value) {
      checkedData.add(row[keyField]);
    }
  } else {
    checkedData.clear();
  }
  checkedDataSize.value = checkedData.size;
  $tableMethods.get('setAllCheckboxRow')(checked);
}
function loadData(data: any[]) {
  if (!Array.isArray(data)) {
    return;
  }
  xeData.value = data;
  advancedFilter(data);
}
function getRowById(id: string | number) {
  const row = $tableMethods.get('getRowById')(id);
  if (row) {
    return row;
  }
  const tempRows = tableInstance.value?.getInsertRecords();
  const targetRow = tempRows.find((item: any) => item[rowConfig.value.keyField] === id);
  return targetRow;
}

defineExpose({
  tableInstance,
  filter,
  advancedFilter,
  clearAdvancedFilter,
});
</script>

<style lang="less">
@import './style.less';
</style>
