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
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import VXETable, { VxeTableInstance, VxeTableDataRow, VxeTable} from 'vxe-table';
import { IconSearch } from 'ksw-vue-icon';
import { KInput } from '../input';
import { TreeTableProps } from './type';
import { KTable, KTableColumn } from '../table';
import { KPagination } from '../pagination';
import { genRandomStr } from '../../utils';

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
  childrenField: 'children',
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
const xTree = ref();
const slots = defineSlots();
const query = ref('');
const paginationConfig = ref(Object.assign(defaultPaginationConfig, props.paginationConfig || {}));

onMounted(() => {
  getShowTableData()
})

// 合并用户与表格默认配置
const treeConfig = computed(() => {
  if (props.useTree) {
    return Object.assign(defaultTreeConfig, props.treeConfig || {});
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

const fullTableData = ref<Array<any>>((treeToArray(props.data || [])))
const tableData = ref<Array<any>>(fullTableData.value);
const showTableData = ref<Array<any>>([]);

watch(() => props.column, () => {
  handleCustomRender()
}, { immediate: true, deep: true })

// 表格内容搜索
const treeData = ref<any>([]);
const nodeSet = new Set();
function filterTableData() {
  const VxeInstance:VxeTableInstance = xTree.value.getVxeInstance();
  const searchKey = query.value.trim();
  if (props.remote || !searchKey) {
    tableData.value = fullTableData.value;
    getShowTableData();
    VxeInstance.clearTreeExpand()
    return;
  }
  const fieldList = props.column.map(col => col.field || '')
  tableData.value = fullTableData.value?.filter((dataItem:any) => {
    return fieldList.some(field => {
      if (props.exactMatch) {
        return dataItem[field] === searchKey;
      } else {
        return (String(dataItem[field])).toLowerCase().search((searchKey).toLowerCase()) !== -1;
      }
    })
  })
  // 当表格数据为树时，筛选后的数据应展示完整的子树
  if (props.useTree) {
    handleTreeData([...tableData.value]);
    const rowField = treeConfig.value?.rowField || 'id';
    tableData.value = sortFunc(treeData.value, fullTableData.value, rowField);
    VxeInstance.setAllTreeExpand(true)
  }
  getShowTableData();
  if (props.showPage) {
    paginationConfig.value.currentPage = 1;
  }
}
// 处理树形数据
function handleTreeData(leafData:any[]) {
  nodeSet.clear()
  treeData.value = [];
  const parentField = treeConfig.value?.parentField || 'pid';
  const rowField = treeConfig.value?.rowField || 'id';
  for (let index = 0; index <  leafData.length; index++) {
    const dataItem = leafData[index];
    treeData.value.push(dataItem);
    nodeSet.add(dataItem[rowField])
    getParentNode(dataItem, parentField, rowField);
  }
}
// 根据叶子节点递归遍历获取祖先节点
function getParentNode(dataItem: any, parentField: string, rowField: string) {
  const parentKey = dataItem[parentField];
  const parentItem = fullTableData.value?.find(item => item[rowField] === parentKey);
  if (!parentItem) {
    return;
  }
  if (!nodeSet.has(parentKey)) {
    treeData.value.push(parentItem);
    nodeSet.add(parentKey);
  }
  if (parentItem[parentField] !== null) {
    getParentNode(parentItem, parentField, rowField);
  }
}
// 筛选后的数据与用户输入数据的顺序保持一致
function sortFunc(targetData:any[], sortData: any, key: string | number){
  const sortKeyList = sortData.map((item:any) => item[key])
  return targetData.sort((a, b) => {
    return sortKeyList.indexOf(a[key]) < sortKeyList.indexOf(b[key]) ? -1 : 1;
  });
}
// 树形数据->一维数组
function treeToArray(data: VxeTableDataRow[], resultData:any[] = [], pid: any = null) {
  const childrenField = treeConfig.value?.childrenField || 'children';
  const rowField = treeConfig.value?.rowField || 'id';
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const parentField = treeConfig.value?.parentField || 'pid';
    if (!node[parentField]) {
      node[parentField] = pid;
    }
    resultData.push(node);
    if (node[childrenField] &&node[childrenField].length) {
      treeToArray(node.children, resultData, node[rowField]);
      delete node[childrenField];
    }
  }
  return resultData;
}
// 分页相关
let topNodeMap = {};
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
  if (!props.useTree) {
    showTableData.value = tableData.value.slice(startIndex, endIndex);
  } else {
    handleShowTreeData(startIndex, endIndex)
  }
}
// 处理树形结构数据的分页
function handleShowTreeData(startIndex: number, endIndex: number) {
  const parentField = treeConfig.value?.parentField || 'pid';
    const rowField = treeConfig.value?.rowField || 'id';
    const currentParentNodes = tableData.value
      .filter((item: any) => !item[parentField])
      .slice(startIndex, endIndex);
    topNodeMap = {};
    for (let index = 0; index < tableData.value.length; index++) {
      const dataItem = tableData.value[index];
      if (!dataItem[parentField]) {
        continue;
      }
      const topId = getTopNodeId(dataItem[parentField]);
      if (!topId) {
        continue;
      }
      if (topNodeMap[topId]) {
        topNodeMap[topId].push(dataItem);
      } else {
        topNodeMap[topId] = [dataItem];
      }
    }
    let currentPageData = [];
    while (currentParentNodes.length) {
      const nodeItem = currentParentNodes.shift();
      const children = topNodeMap[nodeItem[rowField]] || []
      currentPageData = currentPageData.concat(nodeItem, ...children);
    }
    showTableData.value = sortFunc(currentPageData, fullTableData.value, rowField);
}
// 获取目标节点的祖先节点id
function getTopNodeId(pid: string | number) {
  const parentField = treeConfig.value?.parentField || 'pid';
    const rowField = treeConfig.value?.rowField || 'id';
  const targetNode = fullTableData.value.find(node => node[rowField] === pid);
  if (!targetNode) {
    return;
  }
  if (!targetNode[parentField]) {
    return targetNode[rowField];
  } else {
    return getTopNodeId(targetNode[parentField]);
  }
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
// 自定义单元格渲染
function handleCustomRender() {
  for (const col of props.column) {
    if (col.render) {
      col.cellRender = { name: genRandomStr(16) }
      VXETable.renderer.add(col.cellRender.name, {
        renderDefault(_renderOpts, { row, column}) {
          return col.render({ row, column })
        }
      })
    }
  }
}

defineExpose({
  getVxeInstance: () => xTree?.value
});
</script>

<style lang="less">
@import './style.less';
</style>