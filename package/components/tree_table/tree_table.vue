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
            <span>{{ $t('total') }}
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
          size="sm"
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
            :column="filterColumn"
            :size="compSize"
            @confirm="advancedFilter"
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
            :default-keys="defaultKeys"
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
        v-bind="$attrs"
        @hide-column="hideColumn"
        @cell-click="cellClick"
      >
        <template v-for="item in columns">
          <k-table-column
            v-if="item.visible !== false"
            :key="item.key"
            :type="item.type"
            :field="item.field"
            :title="item.title"
            :fixed="item.fixed"
            :width="item.width || 'auto'"
            :filters="item.filters"
            :tree-node="item.treeNode"
            :align="item.align"
            :cell-render="item.cellRender"
            :sortable="item.sortable"
            :min-width="item.minWidth"
            :edit-render="item.editRender"
            :show-column-menu="item.showColumnMenu !== false"
          >
            <template v-if="$slots[item.field]" #default="data">
              <slot :name="item.field" v-bind="data"></slot>
            </template>
            <template
              v-else-if="
                !item.render &&
                  !item.editRender &&
                  ((item.type && checkboxConfig.labelField) || !item.type)
              "
              #default="{ row }"
            >
              <span>
                <component 
                  :is="row.icon"
                  v-if="item.showIcon && row.icon" 
                  :style="{
                    marginRight: '3px'
                  }"
                  :color="row.iconStyle?.empty ? '#cdcacf' : row.iconStyle?.color"
                  :size="row.iconStyle?.size ?? 13"
                />
              </span>
              <span v-if="!item.type">
                {{ row[item.field] === '' ? '-' : row[item.field] ?? '-' }}
              </span>
            </template>
          </k-table-column>
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
import { ref, computed, watch, nextTick, getCurrentInstance } from 'vue';
import VXETable, { VxeTableInstance } from 'vxe-table';
import { IconSearch, IconSetting, IconRefresh } from 'ksw-vue-icon';
import { isNumber } from 'lodash';
import { KInput } from '../input';
import { KButton } from '../button';
import { KTransfer } from '../transfer';
import { KPopover } from '../popover';
import { TreeTableProps } from './type';
import { KTable, KTableColumn } from '../table';
import { KPagination } from '../pagination';
import { KFilter } from '../filter';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KTreeTable'
});

const props = withDefaults(defineProps<TreeTableProps>(), {
  showPage: true,
  border: true,
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
  autoResize: true
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
  hasChild: 'hasChild'
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

const emits = defineEmits(['remote-query', 'server-paging', 'refresh']);
const xTree = ref();
const columns = ref<any>([]);
const query = ref('');
const searchStr = ref('');
// 穿梭框
const selectData = ref<any>([]);
const originData = ref<any>([]);
const defaultKeys = ref<any>([]);
// 高级筛选
const tableFilterRef = ref();
const filterData = ref(props.data || []);
const filterConditionInfo:any = ref(null);
const headerText = computed(() => {
  let text = '';
  if (filterConditionInfo.value?.conditionList?.length) {
    filterConditionInfo.value.conditionList.forEach(item => {
      text += ` . ${ item.title } ${ item.logic } ${ item.value }`;
    });
  } else {
    text += ` . ${ t?.('showAll') }`;
  }
  return text;
});
// 分页相关变量
const paginationConfig = ref(Object.assign(defaultPaginationConfig, props.paginationConfig || {}));

// 表格高度计算
const tableHeight = computed(() => {
  const headerHeight = props.showHeaderTools ? props.size === 'mini' ? 34 : 42 : 0;
  const pageHeight = props.showPage ? props.size === 'mini' ? 34 : 42 : 0;
  return `calc(100% - ${ headerHeight }px - ${ pageHeight }px)`;
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
const dataLength = computed(() => filterTableData().length);
// 是否分页
const isPaging = computed(() => props.showPage && !props.useTree);

// 页面展示的表格数据
const showTableData = computed(() => {
  const tableData = filterTableData();
  if (!isPaging.value || props.isServerPaging) {
    return tableData;
  }
  return getShowTableData(tableData);
});
const filterColumn = computed(() => props.column.filter(item => item.dataType).map(item => ({
  title: item.title,
  field: item.field,
  dataType: item.dataType
})));
const compSize = computed(() => (props.size === 'mini' ? 'sm' : undefined));
watch(() => props.data, (newValue) => {
  filterData.value = newValue || [];
  nextTick(() => {
    tableFilterRef.value?.filter();
  });
}, { deep: true, immediate: true });
watch(() => filterData.value.length, (newValue) => {
  const length = newValue || 0;
  updatePageNum(length);
}, { immediate: true });
watch(() => props.column, () => {
  columns.value = props.column.map(col => {
    const visible = col.visible !== false;
    return { ...col, visible };
  });
  handleCustomRender();
}, { immediate: true, deep: true });
watch(() => props.column.length, () => {
  originData.value = props.column.map((item) => ({
    label: item.title,
    key: item.field
  }));
  selectData.value = props.column.filter(col => col.visible !== false)
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
        const VxeInstance:VxeTableInstance = xTree.value.tableInstance;
        VxeInstance.setAllTreeExpand(false);
      });
    }
    return filterData.value;
  }
  if (props.isRemoteQuery) {
    emits('remote-query', searchKey);
    return;
  }
  const visibleColumns = columns.value.filter(col => col.visible);
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
        const VxeInstance:VxeTableInstance = xTree.value.tableInstance;
        VxeInstance.setAllTreeExpand(true);
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
  for (const col of columns.value) {
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
  columns.value.forEach(col => {
    if (ids.includes(col.field)) {
      col.visible = true;
    } else {
      col.visible = false;
    }
  });
}
function sortTableHeader(ids: string[]) {
  const tempSortData = ids.map((id: string) => ({ field: id }));
  columns.value = sortFunc(columns.value, tempSortData, 'field');
}
function advancedFilter(conditionInfo, newTableData) {
  filterConditionInfo.value = conditionInfo;
  filterData.value = newTableData;
}
function filter(searchStr: string) {
  query.value = searchStr;
}
function hideColumn(column) {
  if (!props.showHeaderTools || !props.showTransfer) {
    return;
  }
  const columnItem = columns.value.find(item => item.field === column.field);
  columnItem.visible = false;
  selectData.value = columns.value.filter(col => col.visible !== false)
  .map((item) => ({
    label: item.title,
    key: item.field
  }));
}
// 行高亮
let isHighlight = false;
let preRowKey = null;
function cellClick({ _rowIndex }) {
  if (!isHighlight) {
    isHighlight = true;
  } else if (isHighlight && preRowKey === _rowIndex) {
    xTree.value.tableInstance.setCurrentRow(null);
    isHighlight = false;
  }
  if (preRowKey !== _rowIndex) {
    preRowKey = _rowIndex;
  }
}
const tableInstance = computed(() => xTree?.value.tableInstance);
defineExpose({
  tableInstance,
  filter
});
</script>

<style lang="less">
@import './style.less';
</style>