<template>
  <div :class="['k-tree-table', props.class, _styleModule]" :style="{ height: height, ...style }">
    <div v-if="simple && showSearchInput" class="k-tree-table__header-pure">
      <k-input
        v-model="searchStr"
        :suffix-icon="IconSearch"
        :placeholder="$t('searchTable')"
        clearable
        :size="compSize"
        @change="filter"
      />
    </div>
    <div
      v-else-if="showHeaderTools && !simple"
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
            @click="
              () => {
                clearAdvancedFilter();
                emits('advanced-filter-clear');
              }
            "
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
              :data="xeTableData"
              :options="filterColumns"
              :size="compSize"
              children-field="group"
              filter-key="field"
              :remote="advancedFilterConfig?.remote ?? false"
              :formatter="advancedFilterConfig?.dateFormat ?? 'YYYY-MM-DD HH:mm:ss'"
              :default-condition="advancedFilterConfig?.defaultCondition ?? filterConditionInfo"
              @confirm="refreshAdvancedFilter"
              @clear="
                () => {
                  clearAdvancedFilter();
                  emits('advanced-filter-clear');
                }
              "
              @show="advancedFilterShow"
              @hide="advancedFilterHide"
            >
              <template #reference="{ hasConfigCondition }">
                <div v-ksw_tooltip="$t('advancedFilter_c')">
                  <component
                    :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
                    v-if="widget.widget"
                  />
                  <slot v-else name="_filterTrigger" :is-filter="hasConfigCondition">
                    <k-button :size="compSize">
                      <IconFilter v-if="!hasConfigCondition" />
                      <IconFilterFill v-else color="#2882FF" />
                    </k-button>
                  </slot>
                </div>
              </template>
            </k-filter>
          </template>
          <template v-else-if="widget.id === 'transfer'">
            <!-- 穿梭框 -->
            <k-popover
              trigger="click"
              width="auto"
              :teleported="false"
              @show="transferShow"
              @hide="transferHide"
            >
              <template #reference>
                <div v-ksw_tooltip="$t('columnHeaderController')" class="text-sm">
                  <component
                    :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
                    v-if="widget.widget"
                  />
                  <slot v-else name="_transferTrigger">
                    <k-button :size="compSize">
                      <IconSetting />
                    </k-button>
                  </slot>
                </div>
              </template>
              <k-transfer
                ref="tableTransferRef"
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
          <template v-else-if="widget.widget">
            <component
              :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
            />
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
        :seq-config="seqConfig"
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
        @hide-column="hideColumn"
        @cell-click="
          (data) => {
            cellClick(data);
            emits('cell-click', data);
          }
        "
        @sort-change="onSortChange"
        @drag-end="dragEnd"
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
        <k-operate :total="checkedDataSize" :data="batchOperations" @close="closeBatchOperation" />
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
import { ref, computed, watch, onMounted, nextTick, inject, provide } from 'vue';
import VXETable from 'vxe-table';
import { VueI18nTranslation } from 'vue-i18n';
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
import { TreeTableProps, columnConfigType, TableHeaderControl } from './type';
import {
  genRandomStr,
  treeDataToArray,
  getValidTreeData,
  resetTreeData,
  getExposeProxy
} from '../../utils';
import { useMethods, useCheckbox } from './hooks';

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
  cellClickToggleHighlight: true
});

const _styleModule = inject('_styleModule', '');
const slots = defineSlots();
const t = inject<VueI18nTranslation>('$t');
const DEFAULT_PAGES = [25, 50, 80, 100, 150];
const DEFAULT_WIDGETS = new Map([
  ['search', 'search'],
  ['filter', 'filter'],
  ['refresh', 'refresh'],
  ['transfer', 'transfer']
]);
// 表格默认配置
const defaultRowConfig = {
  isHover: true,
  isCurrent: true,
  useKey: true,
  keyField: 'id'
};
const defaultTreeConfig = {
  transform: true,
  rowField: 'id',
  parentField: 'pid',
  childrenField: 'children',
  trigger: 'cell',
  hasChildField: 'hasChild'
};
const defaultPaginationConfig = {
  pagerCount: 7,
  currentPage: 1,
  pageSizes: DEFAULT_PAGES,
  pageSize: DEFAULT_PAGES[0]
};
const defaultSortConfig = {};
const defaultEditConfig = {
  key: 'id',
  trigger: 'click',
  mode: 'cell'
};
const defaultSeqConfig = {
  seqMethod: ({ rowIndex }) => {
    const startIndex = props.seqConfig?.startIndex ?? 1;
    if (isPaging.value) {
      const { pageSize, currentPage } = paginationConfig.value;
      return (currentPage - 1) * pageSize + rowIndex + startIndex;
    }
    return rowIndex + startIndex;
  }
};

const defaultScrollY = { enabled: true };
const defaultColumnConfig = { resizable: true };

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
  'sort-change',
  'advanced-filter-confirm',
  'advanced-filter-clear'
]);
const xTree = ref();
const tableTransferRef = ref();
// 列配置
const columns = ref<any>([]);
const flatColumns = ref<any>([]);
// 表格数据
const xeTableData = ref<any>([]);
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
// 高级筛选功能只处理非特殊、可见的有效数据
const filterColumns = computed(() => {
  const { filterColumns, filterAll, exclude = [] } = props.advancedFilterConfig ?? {};
  const validColumns = getValidTreeData(
    cloneDeep(columns.value),
    'group',
    (dataItem) => !dataItem.type &&
      dataItem.title &&
      dataItem.field &&
      (filterAll !== false || dataItem.visible !== false) &&
      !exclude.includes(dataItem.field)
  );
  if (filterColumns) {
    return resetTreeData(validColumns, 'group', filterColumns, 'field');
  }
  return validColumns;
});
// 表格实例
const tableInstance = computed(() => {
  const tableInstance = xTree.value?.tableInstance;
  return tableInstance;
});
const headerText = computed(() => {
  let text: string = '';
  if (filterConditionInfo.value?.conditionList?.length) {
    const { filterRule } = filterConditionInfo.value;
    text += filterRule === 0 ? (t?.('anyOne') as string) : (t?.('all') as string);
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
const __showTransfer = computed(() => {
  const toolbarNames = widgets.value.map((item) => item.id);
  if (props.showHeaderTools && toolbarNames.includes('transfer')) {
    return true;
  }
  return false;
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
const seqConfig = computed(() => Object.assign(defaultSeqConfig, props.seqConfig || {}));
// 是否分页
const isPaging = computed(() => props.showPage && !props.useTree && !props.simple);

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
const dataLength = computed(() => {
  const { isRemotePaging, total } = paginationConfig.value;
  if (isPaging.value && (isRemotePaging || props.isServerPaging)) {
    return total;
  }
  return visibleData.value.length;
});
// 表格size控制
const compSize = computed(() => (props.size === 'mini' ? 'sm' : undefined));

const { setTableData, sortChange, _methods } = useMethods(props);
const {
  checkedDataSize,
  checkboxConfig,
  closeBatchOperation,
  checkBoxChange,
  checkboxAll,
  clearCheckedData,
  _checkboxMethods
} = useCheckbox(tableInstance, showTableData, props);
watch(
  [() => props.data, () => props.data?.length],
  () => {
    clearCheckedData();
    xeTableData.value = setTableData(props.data);
    advancedFilter();
  },
  { immediate: true }
);
watch(
  () => props.paginationConfig,
  () => {
    paginationConfig.value = Object.assign(paginationConfig.value, props.paginationConfig || {});
  },
  { immediate: true, deep: true }
);
onMounted(() => {
  initTransfer();
});
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
  },
  { immediate: true }
);

// 表格内容搜索
let tableDataMap: Map<string | number, any> = new Map();
const treeDataMap: Map<string | number, any> = new Map();
function filterTableData() {
  const filterData = filterConditionInfo.value?.conditionList?.length ?
    newFilterData.value :
    xeTableData.value;
  const { strict, searchMethod } = props.searchConfig ?? {};
  const searchKey = query.value.trim().replace(/\\/g, '\\\\');
  if (props.isRemoteQuery || props.searchConfig?.isRemoteQuery) {
    emits('remote-query', searchKey);
    return filterData;
  }
  if (!searchKey) {
    return filterData;
  }
  if (typeof searchMethod === 'function') {
    return searchMethod(searchKey, filterData);
  }
  const visibleColumns = flatColumns.value.filter((col: columnConfigType) => col.visible !== false);
  const fieldList = visibleColumns.map((col: columnConfigType) => col.field || '');
  let tableData = filterData.filter((dataItem: any) => fieldList.some((field: string) => {
    const cellLabel = tableInstance.value.getCellLabel(dataItem, field);
    if (strict === true) {
      return cellLabel === searchKey;
    }
    return String(cellLabel).toLowerCase().indexOf(searchKey.toLowerCase()) !== -1;
  })) as any;
  // 当表格数据为树时，筛选后的数据应展示完整的子树
  if (props.useTree) {
    const { rowField } = getTreeConfigField();
    tableDataMap = new Map(xeTableData.value.map((item: any) => [item[rowField], item]));
    handleTreeData(tableData);
    tableData = sortFunc([...treeDataMap.values()], xeTableData.value, rowField);
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
  for (const dataItem of xeTableData.value) {
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
        ...(col.cellRender || {})
      };
      VXETable.renderer.add(col.cellRender.name, {
        renderDefault(_renderOpts, { row, column }) {
          return col.render({ row, column });
        }
      });
    }
    if (col.renderEdit) {
      col.editRender = {
        name: genRandomStr(16),
        ...(col.editRender || {})
      };
      VXETable.renderer.add(col.editRender.name, {
        renderEdit(_renderOpts, { row, column }) {
          return col.renderEdit({ row, column });
        }
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
    if (ids.includes(col.field as string)) {
      col.visible = true;
    } else {
      col.visible = false;
    }
  });
}
// 表头控制相关方法
async function initTransfer() {
  let transferData = props.defaultTransferData ?? [];
  if (typeof props.defaultTransferData === 'function') {
    transferData = await props.defaultTransferData?.();
  }
  transferData = Array.isArray(transferData) ? transferData : [];
  const transferDataMap = new Map<string | undefined, TableHeaderControl>(
    transferData.map((item: TableHeaderControl) => [item.key, item])
  );
  const fieldList = transferData.map((item: TableHeaderControl) => item.key);
  const cols = props.column.map((col) => {
    const visible = transferDataMap.get(col.field)?.visible ?? col.visible !== false;
    const field = col.field ?? `_table_column_${col.type ?? ''}`;
    return { ...cloneDeep(col), visible, field };
  });
  columns.value = cols.sort((a, b) => fieldList.indexOf(a.field) - fieldList.indexOf(b.field));
  updateTransfer();
  handleCustomRender();
}
function updateTransfer() {
  flatColumns.value = treeDataToArray(columns.value, 'group');
  originData.value = flatColumns.value
  .map((item: columnConfigType) => {
    if (item.title && item.field) {
      return {
        label: item.title,
        key: item.field
      };
    }
    return null;
  })
  .filter((item: columnConfigType) => item);
  selectData.value = flatColumns.value
  .filter((col: columnConfigType) => col.visible !== false)
  .map((item: columnConfigType) => ({
    label: item.title,
    key: item.field
  }));
  defaultHeader.value = selectData.value.map((item: columnConfigType) => item.key);
}
function hideColumn(column: columnConfigType) {
  if (!__showTransfer.value) {
    return;
  }
  const columnItem = flatColumns.value.find(
    (item: columnConfigType) => item.field === column.field
  );
  columnItem.visible = false;
  selectData.value = flatColumns.value
  .filter((col: columnConfigType) => col.visible !== false)
  .map((item: any) => ({
    label: item.title,
    key: item.field
  }));
  emits('hide-column', column);
}
function sortTableHeader(fieldList: { label: string; key: string }[]) {
  if (!Array.isArray(fieldList)) {
    return;
  }
  let keyIndex = 0;
  const map = new Map(flatColumns.value.map((v: columnConfigType) => [v.field, v]));
  const setData = (columns: columnConfigType[]) => {
    for (const [index, col] of columns.entries()) {
      if (Array.isArray(col.group) && col.group.length > 0) {
        setData(col.group);
      } else {
        const field = fieldList[keyIndex++]?.key;
        columns[index] = map.get(field) ?? {};
      }
    }
  };
  setData(columns.value);
  flatColumns.value = treeDataToArray(columns.value, 'group');
}
function transferShow() {
  if (typeof props.onTransferShow === 'function') {
    props.onTransferShow();
  }
}
function transferHide() {
  if (typeof props.onTransferHide === 'function') {
    const transferData = getHeaderControllerData();
    props.onTransferHide(transferData);
  }
}
// 高级筛选相关方法
function refreshAdvancedFilter(conditionInfo: any, newTableData: any[], isEmit = true) {
  filterConditionInfo.value = conditionInfo;
  newFilterData.value = newTableData;
  if (props.useTree) {
    handleTreeData(newFilterData.value);
    const { rowField } = getTreeConfigField();
    newFilterData.value = sortFunc([...treeDataMap.values()], xeTableData.value, rowField);
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
function filter(searchStr: string) {
  query.value = searchStr ?? '';
}
function advancedFilterShow() {
  if (typeof props.onAdvancedFilterShow === 'function') {
    props.onAdvancedFilterShow();
  }
}
function advancedFilterHide() {
  if (typeof props.onAdvancedFilterHide === 'function') {
    const conditionInfo = getAdvancedCondition();
    const filterData = newFilterData.value;
    props.onAdvancedFilterHide({ conditionInfo, filterData });
  }
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
function dragEnd(data: any[]) {
  emits('drag-end', {
    newData: data,
    oldData: xeTableData.value
  });
}

// 刷新高级筛选的表格数据
async function advancedFilter(data?: any[] | undefined) {
  if (!tableFilterRef.value) {
    return;
  }
  await nextTick();
  const advancedFilterObj = tableFilterRef.value?.[0]?.filter?.(data);
  const { conditionInfo, tableData } = advancedFilterObj ?? {};
  refreshAdvancedFilter(conditionInfo, tableData, false);
  return { conditionInfo, tableData };
}
async function clearAdvancedFilter() {
  if (!tableFilterRef.value) {
    return;
  }
  await nextTick();
  const advancedFilterObj = tableFilterRef.value?.[0]?.clearFilter?.();
  const { conditionInfo, tableData } = advancedFilterObj ?? {};
  refreshAdvancedFilter(conditionInfo, tableData, false);
  return { conditionInfo, tableData };
}
function loadData(data: any[]) {
  if (!Array.isArray(data)) {
    return;
  }
  xeTableData.value = setTableData(data);
  advancedFilter(data);
}
function getAdvancedCondition() {
  return tableFilterRef.value?.[0]?.getConditionInfo();
}
function onSortChange(data: any) {
  const fieldRules = tableInstance.value.getSortColumns();
  sortChange(fieldRules);
  emits('sort-change', data);
}
function getRowById(id: string | number) {
  const row = tableInstance.value?.getRowById(id);
  if (row) {
    return row;
  }
  const targetRow = xeTableData.value.find((item: any) => item[rowConfig.value.keyField] === id);
  if (targetRow) {
    return targetRow;
  }
  const tempRecords = tableInstance.value.getInsertRecords();
  const tempRow = tempRecords.find((item: any) => item[rowConfig.value.keyField] === id);
  return tempRow ?? null;
}
// vxe-table行数据中dom被销毁时会导致tooltip无法关闭，这里提供手动销毁tooltip方法给予外部调用
function disposeRowTooltip() {
  const tooltip = document.querySelector('.vxe-table--tooltip-wrapper');
  if (tooltip) {
    tooltip?.remove();
  }
}
function getHeaderControllerData(): TableHeaderControl[] {
  const { sourceData = [], selectData = [] } =
    tableTransferRef.value?.[0]?.getTransferData?.() ?? [];
  const selectSet = new Set(selectData.map((item: TableHeaderControl) => item.key));
  const newTransferData = sourceData.map((item: TableHeaderControl) => ({
    label: item.label,
    key: item.key,
    visible: selectSet.has(item.key),
    disabled: item.disabled ?? false
  }));
  return newTransferData;
}
function setHeaderControllerData(transferData: TableHeaderControl[]) {
  transferData.forEach?.((item: TableHeaderControl) => {
    const column = flatColumns.value.find((col: columnConfigType) => col.field === item.key);
    if (!column) {
      return;
    }
    if (item.visible) {
      column.visible = true;
    } else {
      column.visible = false;
    }
  });
  originData.value =
    transferData.map?.((item: TableHeaderControl) => ({
      label: item.label ?? '',
      key: item.key ?? `_${genRandomStr(8)}`,
      disabled: item.disabled ?? false,
      visible: item.visible !== false
    })) ?? [];
  selectData.value = originData.value.filter((item: TableHeaderControl) => item.visible !== false);
  sortTableHeader(transferData);
}

provide('__showTransfer', __showTransfer);
const customMethods = {
  tableInstance,
  filter,
  advancedFilter,
  clearAdvancedFilter,
  getAdvancedCondition,
  getRowById,
  loadData,
  disposeRowTooltip,
  getHeaderControllerData,
  setHeaderControllerData,
  ..._methods,
  ..._checkboxMethods
};

defineExpose(getExposeProxy(customMethods, tableInstance));
</script>

<style lang="less">
@import './style.less';
</style>
