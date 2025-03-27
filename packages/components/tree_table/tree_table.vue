<template>
  <div
    :class="[
      'k-tree-table flex flex-col h-full',
      props.class,
      { 'tree-table-use-ant-style': useAntStyle, 'has-space-between': hasSpace }
    ]"
    :style="{ height: adaptive ? 'fit-content' : height, ...style }"
  >
    <div v-if="simple && showSearchInput" class="k-tree-table__header-pure">
      <k-input
        v-model="searchStr"
        :suffix-icon="IconSearch"
        :placeholder="t?.('searchTable')"
        clearable
        @change="filter"
      />
    </div>
    <div
      v-else-if="showHeaderTools && !simple"
      ref="RefTableHeader"
      class="k-tree-table__header"
      :style="{
        justifyContent: showDescription ? 'space-between' : 'flex-end'
      }"
    >
      <div v-if="showDescription" class="k-table-info">
        <slot name="description" :total="dataLength" :condition-info="filterConditionInfo">
          <span v-if="!useTree">
            {{ t?.('total') }}
            {{ dataLength }}
            {{ t?.('data') }}
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
            · {{ t?.('reset') }}
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
              :placeholder="t?.('searchTable')"
              clearable
              @change="filter"
            />
          </template>
          <template v-else-if="widget.id === 'refresh'">
            <k-button
              v-ksw_tooltip="t?.('refresh')"
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
              children-field="group"
              filter-key="field"
              :remote="advancedFilterConfig?.remote ?? false"
              :ignore-case="advancedFilterConfig?.ignoreCase"
              :formatter="advancedFilterConfig?.dateFormat ?? 'YYYY-MM-DD HH:mm:ss'"
              :default-condition="advancedFilterConfig?.defaultCondition ?? filterConditionInfo"
              :search-method="advancedFilterConfig?.searchMethod"
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
                <div v-ksw_tooltip="t?.('advancedFilter_c')">
                  <component
                    :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
                    v-if="widget.widget"
                  />
                  <slot
                    v-else
                    :name="compatibleSlots($slots, ['filter-trigger', 'filterTrigger'])"
                    :is-filter="hasConfigCondition"
                  >
                    <k-button>
                      <IconFilter v-if="!hasConfigCondition" />
                      <IconFilterFill v-else color="#2882FF" />
                    </k-button>
                  </slot>
                </div>
              </template>
            </k-filter>
          </template>
          <template v-else-if="widget.id === 'sizeControl'">
            <!-- 表格尺寸控制 -->
            <k-dropdown
              trigger="click"
              @command="
                (command) => {
                  _size = command || undefined;
                }
              "
            >
              <template #title>
                <div v-ksw_tooltip="t?.('sizeControlTrigger')" class="text-sm">
                  <component
                    :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
                    v-if="widget.widget"
                  />
                  <slot
                    v-else
                    :name="compatibleSlots($slots, ['size-control-trigger', 'sizeControlTrigger'])"
                  >
                    <k-button><IconSizeControls /></k-button>
                  </slot>
                </div>
              </template>
              <k-dropdown-item
                v-for="item in SIZE_OPTIONS"
                :key="item.value"
                :style="{
                  color: _size === (item.value || undefined) ? '#2882FF' : ''
                }"
                :command="item.value"
              >
                {{ item.label }}
              </k-dropdown-item>
            </k-dropdown>
          </template>
          <template v-else-if="widget.id === 'transfer'">
            <!-- 穿梭框 -->
            <k-popover
              trigger="click"
              width="auto"
              :teleported="false"
              @show="transferShow"
              @hide="
                () => {
                  transferHide();
                  transferChange();
                }
              "
            >
              <template #reference>
                <div v-ksw_tooltip="t?.('columnHeaderController')" class="text-sm">
                  <component
                    :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
                    v-if="widget.widget"
                  />
                  <slot
                    v-else
                    :name="compatibleSlots($slots, ['transfer-trigger', 'transferTrigger'])"
                  >
                    <k-button><IconSetting /></k-button>
                  </slot>
                </div>
              </template>
              <k-transfer
                ref="tableTransferRef"
                v-model="selectData"
                :data="originData"
                :default-keys="defaultHeader"
                :format="{
                  noChecked: ' ',
                  hasChecked: ' '
                }"
                :titles="[t?.('unselectedFields'), t?.('selectedFields')]"
                :drag="true"
                @change="updateColVisible"
                @reset="updateColVisible"
                @drag="sortTableHeader"
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
    <div ref="RefTableBox" class="table-box flex-1 overflow-hidden">
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
        :empty-text="emptyText || t?.('noData')"
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
      <div v-if="showBatchOperation && checkedDataSize > 0" v-ksw_drag class="batch-operate">
        <k-operate :total="checkedDataSize" :data="batchOperations" @close="closeBatchOperation" />
      </div>
    </div>
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
import { ref, computed, watch, nextTick, provide } from 'vue';
import VXETable from 'vxe-table';
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
import type { ConditionInfo } from '../filter';
import {
  useMethods,
  useCheckbox,
  useData,
  useConfig,
  useHeaderControl,
  useAdvancedFilter
} from './hooks';
import { SIZE_KEY, useLocale } from '../../hooks';
import { genRandomStr, sortFunc, compatibleSlots, getExposeProxy } from '../../utils';
import { SIZE_OPTIONS } from './const';
import type { TreeTableProps, Column, RowData, Row } from './type';

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
  hasSpace: false
});

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
const tableTransferRef = ref();
// 列配置
const columns = ref<Column[]>([]);
// 表格数据
const xeTableData = ref<RowData[]>([]);
// 搜索框关键词
const query = ref('');
const searchStr = ref('');

// 高级筛选
const tableFilterRef = ref(); // 高级筛选后的数据

// 当前需要展示的数据（区分当前数据是基于高级筛选还是原始数据）
const currentData = computed(() => {
  return filterConditionInfo.value?.conditionList?.length ? newFilterData.value : xeTableData.value;
});

// 表格实例
const tableInstance = computed(() => {
  const tableInstance = xTree.value?.tableInstance;
  return tableInstance;
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
} = useHeaderControl(tableInstance, tableTransferRef, props, columns, handleCustomRender);

// advanced filter
const {
  newFilterData,
  filterColumns,
  filterConditionInfo,
  headerText,
  advancedFilterShow,
  advancedFilterHide,
  getAdvancedCondition
} = useAdvancedFilter(tableFilterRef, props, columns);

// table data
const {
  showTableData,
  isPaging,
  dataLength,
  paginationConfig,
  tableCacheData,
  changePageSize,
  changeCurrentPage,
  handleTreeData
} = useData(tableInstance, props, emits, flatColumns, xeTableData, currentData, query);

// config
const { widgets, treeConfig, sortConfig, rowConfig, editConfig, scrollY, columnConfig, seqConfig } =
  useConfig(props, { isPaging, paginationConfig });

// checkbox
const {
  checkedDataSize,
  checkboxConfig,
  closeBatchOperation,
  checkBoxChange,
  checkboxAllChange,
  clearCheckedData,
  resetCheckboxStatus,
  _checkboxMethods
} = useCheckbox(tableInstance, props, xeTableData, showTableData, tableCacheData);

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
function refreshAdvancedFilter(
  conditionInfo: ConditionInfo,
  newTableData: RowData[],
  isEmit = true
) {
  let isReturn = false;
  conditionInfo.conditionList?.forEach((item) => {
    isReturn = Array.isArray(item.showValue) && typeof props.searchFunction === 'function';
    if (isReturn && props.searchFunction) {
      props.searchFunction(item.showValue);
    }
  });
  resetCheckboxStatus();
  if (isReturn) {
    return;
  }
  filterConditionInfo.value = conditionInfo;
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
  if (!tableFilterRef.value) {
    return;
  }
  await nextTick();
  const advancedFilterObj = tableFilterRef.value?.[0]?.filter?.(data);
  const { conditionInfo, tableData } = advancedFilterObj ?? {};
  refreshAdvancedFilter(conditionInfo, tableData, false);
  return { conditionInfo, tableData };
}

// 清空高级筛选状态
async function clearAdvancedFilter() {
  if (!tableFilterRef.value) {
    return;
  }
  await nextTick();
  resetCheckboxStatus();
  const advancedFilterObj = tableFilterRef.value?.[0]?.clearFilter?.();
  const { conditionInfo, tableData } = advancedFilterObj ?? {};
  refreshAdvancedFilter(conditionInfo, tableData, false);
  return { conditionInfo, tableData };
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

// export
function getVisibleData() {
  return showTableData.value;
}
function loadData(data: RowData[]) {
  if (!Array.isArray(data)) {
    return;
  }
  xeTableData.value = setTableData(data);
  advancedFilter(data);
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
  loadData,
  clearSearch,
  ..._methods,
  ..._checkboxMethods,
  ..._transferMethods
};

defineExpose(getExposeProxy(customMethods, tableInstance));
</script>

<style lang="less">
@import './style.less';
</style>
