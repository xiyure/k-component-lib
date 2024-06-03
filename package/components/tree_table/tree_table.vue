<template>
  <div class="k-tree-table">
    <div class="search-input">
      <k-input
        v-model="query"
        :suffix-icon="IconSearch"
        clearable
        @change="filterTableData"
      />
    </div>
    <div class="table-box">
      <k-table
        v-bind="props"
        :data="showTableData"
        ref="xTree"
        :row-config="rowConfig"
        :sort-config="sortConfig"
        :tree-config="treeConfig"
        :checkbox-config="checkboxConfig"
        :edit-config="editConfig"
        :column-config="columnConfig"
        :empty-text="emptyText || $t('noData')"
        :scroll-y="scrollY"
        :row-style="getRowStyle"
    >
       <template v-for="item in column">
          <k-table-column
            v-if="item.visible"
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
          >
          <template
            v-if="
              !item.render &&
              !item.editRender &&
              item.type === 'checkbox'
            "
            #default="{ row }"
            >
              {{ checkboxConfig.labelField || row[item.field] }}
            </template>
          </k-table-column>
        </template>
          
    </k-table>
    </div>
    <div class="pagination-box">
      <k-pagination
        v-if="showPage"
        :total="tableData.length"
        :page-size="paginationConfig.pageSize"
        :pager-count="paginationConfig.pagerCount"
        :page-sizes="paginationConfig.pageSizes"
        :current-page="paginationConfig.currentPage"
        @current-change="changeCurrentPage"
        @size-change="changePageSize"
      />
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue';
import { IconSearch } from 'ksw-vue-icon';
import { KInput } from '../input';
import { TreeTableProps } from './type';
import { KTable, KTableColumn } from '../table';
import { KPagination } from '../pagination';

defineOptions({
  name: 'KTreeTable'
});

const props = withDefaults(defineProps<TreeTableProps>(), {
  remote: false,
  useTree: false,
  exactMatch: false,
  showPage: true,
  border: true,
  stripe: false,
  size: 'mini',
  height: '100%',
  showOverflow: true,
  showHeader: true,
  autoResize: true,
  fit: true
});

const DEFAULT_PAGES = [25, 50, 80, 100, 150]
// 表格默认配置
const defaultRowConfig = {
  isHover: true,
  isCurrent: true,
  useKey: true,
  keyField: 'id'
}
const defaultTreeConfig = {
  transform: true,
  rowField: 'id',
  parentField: 'pid',
  childrenField: 'nodes',
  trigger: 'cell',
  hasChild: 'hasChild'
}
const defaultPaginationConfig = {
  pagerCount: 7,
  currentPage: 1,
  pageSizes: DEFAULT_PAGES,
  pageSize: DEFAULT_PAGES[0],
  total: 0
}
const defaultSortConfig = {}
const defaultCheckboxConfig = {}
const defaultEditConfig = {
  key: 'id',
  trigger: 'click',
  mode: 'cell'
}
const defaultScrollY = { enabled: true }
const defaultColumnConfig = { resizable: true }

const emits = defineEmits([]);
const slots = defineSlots();
const query = ref('');
const paginationConfig = ref(Object.assign(defaultPaginationConfig, props.paginationConfig || {}));
const tableData = ref<any>(props.data);
const showTableData = ref<any>([]);

onMounted(() => {
  getShowTableData()
})

// 合并用户与表格默认配置
const treeConfig = computed(() => {
  if (props.useTree) {
    return Object.assign(defaultTreeConfig, props.treeConfig || {});
  } else {
    return undefined;
  }
});
const sortConfig = computed(() => {
  return Object.assign(defaultSortConfig, props.sortConfig || {});
});
const rowConfig = computed(() => {
  return Object.assign(defaultRowConfig, props.rowConfig || {});
});
const editConfig = computed(() => {
  return Object.assign(defaultEditConfig, props.editConfig || {});
});
const scrollY = computed(() => {
  return Object.assign(defaultScrollY, props.scrollY || {});
});
const columnConfig = computed(() => {
  return Object.assign(defaultColumnConfig, props.columnConfig || {});
});
const checkboxConfig = computed(() => {
  return Object.assign(defaultCheckboxConfig, props.checkboxConfig || {});
});
// 表格内容搜索
let groupId = 0;
const count = 1000;
let handler:any = null;
function filterTableData() {
  if (props.remote || !query.value) {
    tableData.value = props.data;
    getShowTableData();
    return;
  }
  groupId = 0;
  tableData.value = [];
  const fieldList = props.column.map(col => col.field || '')
  const total = props.data?.length || 0;
  getFilterData(props.data, fieldList, total);
}
function getFilterData(data: any, fieldList: string[], total: number) {
  const startIndex = groupId * count;
  const newData = data?.filter((dataItem:any) => {
    return fieldList.some(field => {
      if (props.exactMatch) {
        return dataItem[field] === query.value;
      } else {
        return String(dataItem[field]).search(query.value) !== -1;
      }
    })
  })
  tableData.value = [...tableData.value, ...newData];
  // if ((groupId + 1) * count > total) {
  //   cancelAnimationFrame(handler)
  // } else {
  //   groupId++;
  //   handler = requestAnimationFrame(getFilterData.bind(null, data, fieldList, total))
  // }
  getShowTableData();
  if (props.showPage) {
    paginationConfig.value.currentPage = 1;
  }
}
function changePageSize(pageSize: number) {
  paginationConfig.value.pageSize = pageSize
  getShowTableData()
}
function changeCurrentPage(pageNum: number) {
  paginationConfig.value.currentPage = pageNum
  getShowTableData()
}
function getShowTableData() {
  if (!props.showPage) {
    showTableData.value = tableData.value;
    return;
  }
  const { currentPage, pageSize } = paginationConfig.value;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  showTableData.value = tableData.value.slice(startIndex, endIndex);
}
function getRowStyle(rowInfo:any) {
  if (!props.rowStyle) {
    const { row } = rowInfo;
    return row.style || {}
  }
  if (typeof props.rowStyle === 'function') {
    return props.rowStyle(rowInfo);
  }
  return props.rowStyle;
}
</script>

<style lang="less">
@import './style.less';
</style>