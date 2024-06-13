<template>
  <div class="k-tree-table">
    <div class="k-tree-table__header">
      <div class="k-table-info">1111</div>
      <div class="k-table-func">
        <k-input
          :suffix-icon="IconSearch"
          placeholder="搜索此列表"
          clearable
          @change="(value: string) => query = value"
        />
        <k-button @click="() => {
          emits('refresh')
          }"
        ><IconRefresh /></k-button>
        <!-- 高级筛选 -->
        <k-popover
          trigger="click"
          width="auto"
        >
        <template #reference>
          <k-button><IconFilter /></k-button>
        </template>
        <k-filter v-model="filterData" :data="[]"></k-filter>
        </k-popover>
        <!-- 穿梭框 -->
        <k-popover
          trigger="click"
          width="auto"
        >
        <template #reference>
          <k-button><IconSetting /></k-button>
        </template>
        <k-transfer
            v-model="selectData"
            :data="originData"
            :default-keys="defaultKeys"
            @change="updateColumn"
            @reset="updateColumn"
            ></k-transfer>
        </k-popover>
      </div>
    </div>
    <div class="table-box">
      <k-table
        v-bind="tableProps"
        ref="xTree"
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
        v-on="listeners"
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
        v-if="isPaging"
        :total="dataLength"
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
import { ref, computed, watch, nextTick, getCurrentInstance } from 'vue';
import VXETable, { VxeTableInstance } from 'vxe-table';
import { IconSearch } from 'ksw-vue-icon';
import { KInput } from '../input';
import { KButton } from '../button';
import { KFilter } from '../filter';
import { KTransfer } from '../transfer';
import { KPopover } from '../popover';
import { IconSetting, IconFilter, IconRefresh } from 'ksw-vue-icon';
import { TreeTableProps } from './type';
import { KTable, KTableColumn } from '../table';
import { KPagination } from '../pagination';
import { genRandomStr, getListeners } from '../../utils';

defineOptions({
  name: 'KTreeTable'
});

const props = withDefaults(defineProps<TreeTableProps>(), {
  showPage: true,
  border: true,
  size: 'mini',
  height: '100%',
  showOverflow: true,
  showHeader: true,
  autoResize: true,
  fit: true
});

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
  pageSize: DEFAULT_PAGES[0],
  total: 0
};
const defaultSortConfig = {};
const defaultCheckboxConfig = {};
const defaultEditConfig = {
  key: 'id',
  trigger: 'click',
  mode: 'cell'
};

const listeners = getListeners(getCurrentInstance()?.attrs);
const defaultScrollY = { enabled: true };
const defaultColumnConfig = { resizable: true };

const emits = defineEmits(['remote-query', 'server-paging', 'refresh']);
const xTree = ref();
const columns = ref<any>([]);
const query = ref('');
// 穿梭框
const selectData = ref<any>([]);
const originData = ref<any>([]);
const defaultKeys = ref<any>([]);
// 高级筛选
const filterData = ref([]);
// 分页相关变量
const paginationConfig = ref(Object.assign(defaultPaginationConfig, props.paginationConfig || {}));

// 抽取props中的table相关参数
const tableProps = computed(() => {
  const notTableAttrs = [
    'useTree',
    'exactMatch',
    'showPage',
    'column',
    'isRemoteQuery',
    'isServerPaging',
    'paginationConfig'
  ];
  const tableConfig = {};
  for (const key in props) {
    if (!notTableAttrs.includes(key)) {
      tableConfig[key] = props[key];
    }
  }
  return tableConfig;
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
watch(() => props.data?.length, (newValue) => {
  const length = newValue || 0;
  updatePageNum(length);
}, { immediate: true });
watch(() => props.column, () => {
  columns.value = props.column.map(col => {
    const visible = col.visible === false ? false : true;
    return { ...col, visible };
  })
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
  defaultKeys.value = selectData.value.map(item => item.key);
}, { immediate: true, deep: true });

// 表格内容搜索
const treeData = ref<any>([]);
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
    return props.data;
  }
  if (props.isRemoteQuery) {
    emits('remote-query', searchKey);
    return;
  }
  const visibleColums = columns.value.filter(col => col.visible);
  const fieldList = visibleColums.map(col => col.field || '');
  let tableData = props.data?.filter((dataItem:any) => fieldList.some(field => {
    if (props.exactMatch) {
      return dataItem[field] === searchKey;
    } 
    return (String(dataItem[field])).toLowerCase().search((searchKey).toLowerCase()) !== -1;
  })) as any;
  // 当表格数据为树时，筛选后的数据应展示完整的子树
  if (props.useTree) {
    handleTreeData(tableData);
    const { rowField } = getTreeConfigField();
    tableData = sortFunc(treeData.value, props.data, rowField);
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
  treeData.value = [];
  const { parentField, rowField } = getTreeConfigField();
  for (let index = 0; index < leafData.length; index++) {
    const dataItem = leafData[index];
    // 如果tableData中已存在该数据，则不再重复添加
    const targetItem = treeData.value.find((item: any) => item[rowField] === dataItem[rowField]
        && item[parentField] === dataItem[parentField]);
    if (targetItem) {
      continue;
    }
    treeData.value.push(dataItem);
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
    const targetItem = treeData.value.find(
      (treeDataItem: any) => treeDataItem[rowField] === node[rowField]
        && treeDataItem[parentField] === node[parentField]
    );
    if (!targetItem) {
      treeData.value.push(node);
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
    treeData.value.push(parentItem);
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
}
function changeCurrentPage(pageNum: number) {
  paginationConfig.value.currentPage = pageNum;
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
  while ((currentPage - 1) * pageSize + 1 > length) {
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
  for (const col of props.column) {
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
  })
}

const tableInstance = computed(() => xTree?.value.tableInstance);
defineExpose({
  tableInstance
});
</script>

<style lang="less">
@import './style.less';
</style>