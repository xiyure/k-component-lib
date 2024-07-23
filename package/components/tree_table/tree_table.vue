<template>
  <div class="k-tree-table" :style="{ height: height}">
    <div
      v-if="showHeaderTools"
      class="k-tree-table__header"
      :style="{ justifyContent: showDescription ? 'space-between' : 'flex-end'}"
    >
      <div v-if="showDescription" class="k-table-info">
        <slot name="description" :total="dataLength" :condition-info="filterConditionInfo">
          <div class="k-table-header-text">
            <span v-if="!useTree">{{ $t('total') }}
              {{ isNumber(paginationConfig.total) ? paginationConfig.total : dataLength }} 
              {{ $t('data') }}
            </span>
            <span :title="headerText" class="condition-info">{{ headerText }}</span>
            <span class="filter-reset" @click="() => tableFilterRef?.clearFilter?.()">{{ $t('reset') }}</span>
          </div>
        </slot>
      </div>
      <div class="k-table-func">
        <k-input
          v-if="showSearchInput"
          v-model="searchStr"
          :suffix-icon="IconSearch"
          :placeholder="$t('searchTable')"
          clearable
          :size="compSize"
          @change="(value: string) => query = value"
        />
        <k-button
          v-if="showRefresh"
          :size="compSize"
          @click="() => {
            emits('refresh')
          }"
        >
          <IconRefresh />
        </k-button>
        <!-- 高级筛选 -->
        <span v-if="showFilter">
          <k-filter
            ref="tableFilterRef"
            :data="data"
            :column="filterColumns"
            :size="compSize"
            children-field="group"
            filter-key="field"
            @confirm="refreshAdvancedFilter"
          ><IconRefresh /></k-filter>
        </span>
        <!-- 穿梭框 -->
        <k-popover
          v-if="showTransfer"
          trigger="click"
          width="auto"
        >
          <template #reference>
            <k-button :size="compSize"><IconSetting /></k-button>
          </template>
          <k-transfer
            v-model="selectData"
            :data="originData"
            @change="updateColumn"
            @reset="updateColumn"
            @sort="sortTableHeader"
          ></k-transfer>
        </k-popover>
      </div>
    </div>
    <div class="table-box" :style="{ height: tableHeight}">
      <k-table
        ref="xTree"
        :border="border"
        :fit="fit"
        :size="size"
        height="100%"
        :data="showTableData"
        :full-data="fullData"
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
        @checkbox-change="(data) => {
          checkBoxChange(data);
          emits('checkbox-change', data);
        }"
        @checkbox-all="(data) => {
          checkboxAll(data);
          emits('checkbox-all', data);
        }"
        @hide-column="(data) => {
          hideColumn(data);
          emits('hide-column', data);
        }"
        @cell-click="(data) => {
          cellClick(data);
          emits('cell-click', data);
        }"
        @drag-end="(data) => {
          dragEnd(data);
        }"
      >
        <template v-for="item, index in columns" :key="index">
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
        :total="isNumber(paginationConfig.total) ? paginationConfig.total : dataLength"
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
import { IconSearch, IconSetting, IconRefresh } from 'ksw-vue-icon';
import { cloneDeep, isNumber } from 'lodash-es';
import KColumnGroup from './column_group';
import { KInput } from '../input';
import { KButton } from '../button';
import { KTransfer } from '../transfer';
import { KPopover } from '../popover';
import { KOperate } from '../operate';
import { TreeTableProps, columnConfigType } from './type';
import { KTable } from '../table';
import { KPagination } from '../pagination';
import { KFilter } from '../filter';
import { genRandomStr, treeDataToArray } from '../../utils';

defineOptions({
  name: 'KTreeTable'
});

const props = withDefaults(defineProps<TreeTableProps>(), {
  showPage: true,
  border: 'default',
  height: '100%',
  showOverflow: true,
  showHeader: true,
  fit: true,
  showDescription: true,
  showFilter: true,
  showRefresh: false,
  showSearchInput: true,
  showTransfer: false,
  showHeaderTools: true,
  autoResize: true,
  showColumnMenu: false,
  cellClickToggleHighlight: true
});

const slots = defineSlots();
const _global = getCurrentInstance()?.appContext.app.config.globalProperties;
const t = _global?.$t;
const DEFAULT_PAGES = [25, 50, 80, 100, 150];
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
const defaultCheckboxConfig = {};
const defaultEditConfig = {
  key: 'id',
  trigger: 'click',
  mode: 'cell'
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
  'drag-end'
]);
const xTree = ref();
const columns = ref<any>([]);
const fullData = ref<any[]>([]);
const flatColumns = ref<any>([]);
const query = ref('');
const searchStr = ref('');
// 穿梭框
const selectData = ref<any>([]);
const originData = ref<any>([]);
// 高级筛选
const tableFilterRef = ref();
const filterData = ref<any>([]);
const filterConditionInfo:any = ref(null);

// 高级筛选功能只处理非特殊、可见的有效数据
const filterColumns = computed(() => columns.value.filter((item: any) => !item.type && item.visible !== false && item.field));
// 表格实例
const tableInstance = computed(() => xTree.value?.tableInstance);
const headerText = computed(() => {
  let text = '';
  if (filterConditionInfo.value?.conditionList?.length) {
    filterConditionInfo.value.conditionList.forEach((item: any, index: number) => {
      const point = (props.useTree && index === 0) ? '' : '. ';
      text += ` ${point} ${item.title} ${item.logic} ${item.value}`;
    });
  } else {
    const point = (props.useTree) ? '' : '. ';
    text += ` ${point} ${t?.('showAll')}`;
  }
  return text;
});
// 分页相关变量
const paginationConfig = ref(Object.assign(defaultPaginationConfig, props.paginationConfig || {}));

// 表格高度计算
const tableHeight = computed(() => {
  const isShowHeader = (props.showDescription
    || props.showSearchInput
    || props.showFilter
    || props.showRefresh
    || props.showTransfer
  ) && props.showHeaderTools;
  const headerHeight = isShowHeader ? props.size === 'mini' ? 34 : 42 : 0;
  const pageHeight = isPaging.value ? props.size === 'mini' ? 34 : 42 : 0;
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

// 表格数据量
const dataLength = computed(() => {
  if (props.useTree) {
    return 0;
  } 
  return filterTableData().length;
});
// 是否分页
const isPaging = computed(() => props.showPage && !props.useTree);

// 页面展示的表格数据
const showTableData = computed(() => {
  if (!Array.isArray(props.data)) {
    return [];
  }
  const tableData = filterTableData();
  if (!isPaging.value || props.isServerPaging) {
    return tableData;
  }
  return getShowTableData(tableData);
});
const compSize = computed(() => (props.size === 'mini' ? 'sm' : undefined));
watch(() => props.data, (newValue) => {
  if (props.showFilter) {
    nextTick(() => {
      tableFilterRef.value?.filter();
    });
  } else {
    filterData.value = newValue ?? [];
  }
  setTimeout(() => {
    if (props.showDragColumn && Array.isArray(newValue)) {
      fullData.value = cloneDeep(props.data);
    } else {
      fullData.value = [];
    }
  });
}, { immediate: true});
watch(() => filterData.value.length, (newValue) => {
  const length = newValue || 0;
  updatePageNum(length);
}, { immediate: true });
watch(() => props.column, () => {
  columns.value = props.column.map(col => {
    const visible = col.visible !== false;
    return { ...col, visible };
  });
  flatColumns.value = treeDataToArray(columns.value, 'group');
  handleCustomRender();
}, { immediate: true, deep: true });
watch(() => flatColumns.value.length, () => {
  originData.value = flatColumns.value.map((item) => {
    if (item.title && item.field) {
      return {
        label: item.title,
        key: item.field
      };
    } 
    return null;
  }).filter((item) => item);
  selectData.value = flatColumns.value.filter(col => col.visible !== false)
  .map((item) => ({
    label: item.title,
    key: item.field
  }));
}, { immediate: true, deep: true });

// 表格内容搜索
let treeData:any[] = [];
const nodeSet = new Set();
function filterTableData() {
  const searchKey = query.value.trim();
  if (!searchKey) {
    if (props.useTree) {
      nextTick(() => {
        tableInstance.value?.setAllTreeExpand(false);
      });
    }
    return filterData.value;
  }
  if (props.isRemoteQuery) {
    emits('remote-query', searchKey);
    return;
  }
  const visibleColumns = flatColumns.value.filter(col => col.visible);
  const fieldList = visibleColumns.map(col => col.field || '');
  let tableData = filterData.value.filter((dataItem:any) => fieldList.some(field => {
    if (props.exactMatch) {
      return dataItem[field] === searchKey;
    } 
    return (String(dataItem[field])).toLowerCase().search((searchKey).toLowerCase()) !== -1;
  })) as any;
  // 当表格数据为树时，筛选后的数据应展示完整的子树
  if (props.useTree) {
    handleTreeData(tableData);
    const { rowField } = getTreeConfigField();
    tableData = sortFunc(treeData, props.data, rowField);
    if (tableData.length < 500) {
      nextTick(() => {
        tableInstance.value?.setAllTreeExpand(true);
      });
    }
  }
  return tableData;
}
// 处理树形数据
function handleTreeData(leafData:any[]) {
  nodeSet.clear();
  treeData = [];
  const { parentField, rowField } = getTreeConfigField();
  for (let index = 0; index < leafData.length; index++) {
    const dataItem = leafData[index];
    // 如果tableData中已存在该数据，则不再重复添加
    const targetItem = treeData.find((item: any) => item[rowField] === dataItem[rowField]
        && item[parentField] === dataItem[parentField]);
    if (targetItem) {
      continue;
    }
    treeData.push(dataItem);
    addChildNodes(dataItem);
    nodeSet.add(dataItem[rowField]);
    getParentNode(dataItem, parentField, rowField);
  }
}
function addChildNodes(currentNode: any) {
  const { parentField, rowField } = getTreeConfigField();
  const childNodes = props.data?.filter(
    (node: any) => node[parentField] === currentNode[rowField]
  );
  if (!childNodes) {
    return;
  }
  childNodes.forEach((node: any) => {
    const targetItem = treeData.find(
      (treeDataItem: any) => treeDataItem[rowField] === node[rowField]
        && treeDataItem[parentField] === node[parentField]
    );
    if (!targetItem) {
      treeData.push(node);
    }
    addChildNodes(node);
  });
}
// 根据叶子节点递归遍历获取祖先节点
function getParentNode(dataItem: any, parentField: string, rowField: string) {
  const parentKey = dataItem[parentField];
  const parentItem = props.data?.find(item => item[rowField] === parentKey);
  if (!parentItem) {
    return;
  }
  if (!nodeSet.has(parentKey)) {
    treeData.push(parentItem);
    nodeSet.add(parentKey);
  }
  if (parentItem[parentField] !== null) {
    getParentNode(parentItem, parentField, rowField);
  }
}
// 筛选后的数据与用户输入数据的顺序保持一致
function sortFunc(targetData:any[], sortData: any, key: string | number) {
  const sortKeyList = sortData.map((item:any) => item[key]);
  return targetData.sort((a, b) => (sortKeyList.indexOf(a[key]) < sortKeyList.indexOf(b[key]) ? -1 : 1));
}
// 分页相关
function changePageSize(pageSize: number) {
  paginationConfig.value.pageSize = pageSize;
  if (props.isServerPaging) {
    emits('server-paging', paginationConfig.value);
  }
}
function changeCurrentPage(pageNum: number) {
  paginationConfig.value.currentPage = pageNum;
  if (props.isServerPaging) {
    emits('server-paging', paginationConfig.value);
  }
}
function getShowTableData(data) {
  if (props.isServerPaging) {
    emits('server-paging', paginationConfig.value);
    return;
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
function getRowStyle(rowInfo:any) {
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
        ...col.cellRender || {}
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
        ...col.editRender || {}
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
  flatColumns.value.forEach(col => {
    if (!col.type) {
      if (ids.includes(col.field)) {
        col.visible = true;
      } else {
        col.visible = false;
      }
    }
  });
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
function refreshAdvancedFilter(conditionInfo, newTableData) {
  filterConditionInfo.value = conditionInfo;
  filterData.value = newTableData;
  if (props.useTree) {
    handleTreeData(filterData.value);
    const { rowField } = getTreeConfigField();
    filterData.value = sortFunc(treeData, props.data, rowField);
    if (filterData.value.length < 500 && filterData.value.length !== props.data?.length) {
      setTimeout(() => {
        tableInstance.value?.setAllTreeExpand(true);
      });
    }
  }
}
function filter(searchStr: string) {
  query.value = searchStr;
}
function hideColumn(column) {
  if (!props.showHeaderTools || !props.showTransfer) {
    return;
  }
  const columnItem = flatColumns.value.find(item => item.field === column.field);
  columnItem.visible = false;
  selectData.value = flatColumns.value.filter(col => col.visible !== false)
  .map((item) => ({
    label: item.title,
    key: item.field
  }));
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
  if (checked) {
    checkedData.add(row.id);
  } else {
    checkedData.delete(row.id);
  }
  checkedDataSize.value = checkedData.size;
}
function checkboxAll({ checked }) {
  if (!props.showBatchOperation) {
    return;
  }
  if (checked) {
    for (const row of showTableData.value) {
      checkedData.add(row.id);
    }
  } else {
    for (const row of showTableData.value) {
      checkedData.delete(row.id);
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
function setCheckboxRow(rows, checked) {
  const newRows = Array.isArray(rows) ? rows : [rows];
  for (const row of newRows) {
    if (checked) {
      checkedData.add(row.id);
    } else {
      checkedData.delete(row.id);
    }
  }
  checkedDataSize.value = checkedData.size;
  xTree.value?.tableInstance?.setCheckboxRow(newRows, checked);
}
function setAllCheckboxRow(checked) {
  if (checked) {
    for (const row of showTableData.value) {
      checkedData.add(row.id);
    }
  } else {
    checkedData.clear();
  }
  checkedDataSize.value = checkedData.size;
  xTree.value?.tableInstance?.setAllCheckboxRow(checked);
}
function dragEnd(data: any[]) {
  emits('drag-end', {
    data,
    originData: props.data
  });
}

// 刷新高级筛选的表格数据
function advancedFilter() {
  tableFilterRef.value?.filter();
}

defineExpose({
  tableInstance,
  filter,
  advancedFilter,
  setCheckboxRow,
  setAllCheckboxRow
});
</script>

<style lang="less">
@import './style.less';
</style>