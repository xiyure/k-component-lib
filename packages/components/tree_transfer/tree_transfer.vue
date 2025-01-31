<template>
  <div :class="['k-tree-transfer', _styleModule]">
    <div v-if="showSearchInput" class="k-transfer__filter">
      <k-input
        ref="KTransferInputRef"
        v-model="query"
        :placeholder="$t('enterInputSearch')"
        :suffix-icon="IconSearch"
        @keyup.enter="filterData"
      />
    </div>
    <div class="k-transfer__body">
      <div class="k-transfer-content k-transfer-content__left">
        <div class="k-transfer__list" :class="useTree ? 'transfer-tree-table' : ''">
          <k-table
            ref="treeLeftRef"
            size="mini"
            :border="false"
            height="100%"
            :data="leftData"
            :tree-config="treeConfig"
            :row-config="{ keyField: 'id' }"
            :scroll-y="scrollY"
            :checkbox-config="{
              checkRowKeys: defaultData,
              trigger: 'cell',
              checkMethod,
            }"
            @checkbox-change="({ row, checked }: Row) => {
              checkboxChange(row, checked)
            }"
            @checkbox-all="({ row, checked }: Row) => {
              checkboxChange(row, checked, true)
            }"
          >
            <template v-if="$slots.empty && query" #empty>
              <slot name="empty" :query="query"></slot>
            </template>
            <k-table-column
              type="checkbox"
              :field="label"
              :title="titles?.[0] ?? ''"
              :tree-node="props.useTree"
            >
              <template #default="{ row }">
                <span
                  class="tree-transfer__cell"
                  :style="{
                    marginLeft: `${rowLevel(row) * (props.treeConfig?.indent ?? 12)}px`,
                  }"
                  :class="{ 'list-item-disabled': row.disabled }"
                  @click="toggleTreeExpand(row, $event)"
                >
                  <component
                    :is="columnIcon(row)?.icon"
                    class="column-icon"
                    :color="columnIcon(row)?.color"
                  />
                  <span class="tree-transfer__cell-label" :title="row[props.label]">
                    {{ row[props.label] }}
                  </span>
                </span>
              </template>
            </k-table-column>
          </k-table>
        </div>
      </div>
      <div class="k-transfer-content k-transfer-content__right">
        <div class="k-transfer__list">
          <k-table
            ref="tableRightRef"
            size="mini"
            :border="false"
            height="100%"
            :data="rightData"
            :row-config="{ useKey: true, drag: showDrag }"
            :scroll-y="scrollY"
            @row-dragend="dragSort"
          >
            <template v-if="$slots.empty && query" #empty>
              <slot name="empty" :query="query"></slot>
            </template>
            <k-table-column :field="label" drag-sort>
              <template #header="data">
                <slot name="rightHeader" v-bind="data">
                  <div class="right-data-header">
                    <span class="right-data-title">{{ props.titles?.[1] ?? '' }}</span>
                    <span class="clear-data" @click="clearData">{{ $t('clearData') }}</span>
                  </div>
                </slot>
              </template>
              <template #default="{ row }">
                <div class="column-body">
                  <span class="column-content">
                    <slot name="right-cell">
                      <component
                        :is="getIcon(props.icon, row)"
                        v-if="props.icon"
                        class="column-icon"
                      />
                      <span class="tree-transfer__cell-label" :title="row[props.label]">
                        <slot name="right-label" :parent-data="parentData(row)">
                          {{ row[props.label] }}
                        </slot>
                      </span>
                    </slot>
                  </span>
                  <div class="column-operate">
                    <IconClose class="column-close" @click="removeRightData(row)" />
                  </div>
                </div>
              </template>
            </k-table-column>
          </k-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, computed, watch, nextTick, inject, onMounted } from 'vue';
import { IconSearch, IconClose } from 'ksw-vue-icon';
import { VxeTablePropTypes } from 'vxe-table';
import { TreeTransferProps, TreeTransferData } from './type';
import { KTable, KTableColumn } from '../table';
import { KInput } from '../input';
import { sortBySmallerList } from '../../utils';
import { RowData } from '../tree_table';

defineOptions({
  name: 'KTreeTransfer'
});

type Row = VxeTablePropTypes.Row;

const props = withDefaults(defineProps<TreeTransferProps>(), {
  showSearchInput: true,
  useTree: false,
  label: 'label',
  showDrag: false,
  defaultData: () => []
});

const _styleModule = inject('_styleModule', '');
// 定义emit
const emits = defineEmits(['change', 'sort']);
const defaultTreeConfig = {
  transform: true,
  rowField: 'id',
  parentField: 'pid',
  childrenField: 'children',
  trigger: 'cell',
  hasChildField: 'hasChild',
  indent: 0,
  showIcon: false
};
const fullData = ref<TreeTransferData[]>([]);
const leftData = ref<TreeTransferData[]>([]);
const rightData = ref<TreeTransferData[]>([]);
const query = ref('');
const treeLeftRef = ref();
const tableRightRef = ref();
const KTransferInputRef = ref();
const treeDataMap: Map<string | number, TreeTransferData> = new Map();
const checkDataMap: Map<string | number, { row: Row; checked: boolean }> = new Map();

onMounted(() => {
  addEvent();
});

const columnIcon = computed(
  () => function (row: Row) {
    const expand = treeLeftRef.value?.tableInstance.isTreeExpandByRow(row);
    const isLeafNode = !(row.children && row.children.length);
    if (isLeafNode && row.nodeType === 1) {
      return { icon: getIcon(props.collapseIcon, row), color: props.collapseIconColor };
    }
    if (props.icon && isLeafNode) {
      return { icon: getIcon(props.icon, row), color: props.iconColor };
    }
    if (props.expandIcon && expand && !isLeafNode) {
      return { icon: getIcon(props.expandIcon, row), color: props.expandIconColor };
    }
    if (props.collapseIcon && !expand && !isLeafNode) {
      return { icon: getIcon(props.collapseIcon, row), color: props.collapseIconColor };
    }
  }
);
const treeConfig = computed(() => {
  if (props.useTree) {
    const newTreeConfig = Object.assign(defaultTreeConfig, props.treeConfig || {});
    newTreeConfig.indent = 0;
    return newTreeConfig;
  }
  return undefined;
});
const scrollY = computed(() => ({ enabled: true, ...(props.scrollY || {}) }));
const rowLevel = computed(() => (row: Row) => getTreeNodeLevel(row));
const parentData = computed(
  () => function (row: Row) {
    let data = row;
    while (data.pid) {
      const parent = leftData.value.find((item) => item.id === data.pid);
      if (parent) {
        data = parent;
      } else {
        break;
      }
    }
    const name = data.name;
    const labelData = row[props.label];

    return { data: labelData, name };
  }
);

watch(
  () => props.data,
  () => {
    fullData.value = Array.isArray(props.data) ? [...props.data] : [];
    leftData.value = [...fullData.value];
    setTimeout(() => {
      initCheckDataMap();
    });
  },
  { immediate: true }
);

function initCheckDataMap() {
  for (const dataItem of props.data) {
    if (!props.useTree) {
      checkDataMap.set(dataItem.id, { row: dataItem, checked: false });
      continue;
    }
    if (dataItem.disabled) {
      continue;
    }
    const hasChild = props.data.find((item: TreeTransferData) => item.pid === dataItem.id);
    if (hasChild) {
      continue;
    }
    checkDataMap.set(dataItem.id, { row: { ...dataItem }, checked: false });
  }
  // 添加空值检查
  const tableInstance = treeLeftRef?.value?.tableInstance;
  if (tableInstance) {
    const checkedRows = tableInstance.getCheckboxRecords();
    for (const row of checkedRows) {
      updateCheckedMap(row, true);
    }
  }
  updateSelectData();
}

function checkboxChange(row: Row | Row[], checked: boolean, isAll: boolean = false) {
  handleSelectData(row, checked, isAll);
  updateSelectData();
  emits('change', getSelectedData());
}
function updateSelectData() {
  const newData = leftData.value.filter(
    (item: TreeTransferData) => checkDataMap.get(item.id)?.checked ?? false
  );
  rightData.value = newData.filter((item: TreeTransferData) => {
    if (props.defaultData?.includes(item.id) && !checkMethod({ row: item })) {
      return false;
    }
    return true;
  });
  rightData.value = sortFunc(rightData.value, fullData.value);
}
function handleSelectData(row: Row, checked: boolean, isAll: boolean) {
  if (isAll) {
    const $table = treeLeftRef.value.tableInstance;
    const checkedNodes = checked
      ?  $table.getCheckboxRecords()
        .filter((item: Row) => !item.children || !item.children.length)
      : rightData.value;
    for (const node of checkedNodes) {
      updateCheckedMap(node, checked);
    }
    return;
  }
  const rows = Array.isArray(row) ? row : [row];
  for (const rowItem of rows) {
    updateCheckedMap(rowItem, checked);
    if (rowItem.children && rowItem.children.length) {
      for (const childRow of rowItem.children) {
        handleSelectData(childRow, checked, isAll);
      }
    }
  }
}
function updateCheckedMap(row: Row | RowData, checked: boolean) {
  const mapItem = checkDataMap.get(row.id);
  if (mapItem) {
    mapItem.checked = checked;
  }
}
function removeRightData(row: Row) {
  if (!row) {
    return;
  }
  const targetRow = checkDataMap.get(row.id);
  if (targetRow) {
    targetRow.checked = false;
  }
  const _row = treeLeftRef.value.tableInstance.getRowById(row.id);
  treeLeftRef.value.tableInstance.setCheckboxRow(_row, false);
  const removeIndex = rightData.value.findIndex((item) => item.id === row.id);
  if (removeIndex >= 0) {
    rightData.value.splice(removeIndex, 1);
  }
  emits('change', getSelectedData());
}
function clearData() {
  for (const dataItem of rightData.value) {
    const targetRow = checkDataMap.get(dataItem.id);
    if (targetRow) {
      targetRow.checked = false;
      const row = treeLeftRef.value.tableInstance.getRowById(dataItem.id);
      treeLeftRef.value.tableInstance.setCheckboxRow(row, false);
    }
  }
  rightData.value = [];
  emits('change', getSelectedData());
}
// 筛选
async function filterData() {
  await filterLeftData();
  updateSelectData();
}

function getQuery() {
  return query.value;
}

async function filterLeftData() {
  const $table = treeLeftRef.value.tableInstance;
  const searchKey = query.value.trim();
  let tableData = [];
  if (typeof props.searchMethod === 'function') {
    tableData = await props.searchMethod(searchKey, props.data);
  } else {
    tableData = props.data.filter(
      (dataItem: TreeTransferData) => dataItem[props.label].toString().indexOf(searchKey) !== -1
    );
    // 当表格数据为树时，筛选后的数据应展示完整的子树
    if (props.useTree) {
      handleTreeData(tableData);
      const { rowField } = getTreeConfigField();
      tableData = sortTreeData([...treeDataMap.values()], props.data, rowField);
      if (tableData.length < 500 && searchKey) {
        nextTick(() => {
          $table.setAllTreeExpand(true);
        });
      }
      if (!searchKey) {
        nextTick(() => {
          $table.setAllTreeExpand(false);
        });
      }
    }
  }
  await $table.clearCheckboxRow();
  leftData.value = tableData;
  await nextTick();
  resetCheckedData();
}
// 处理树形数据
function handleTreeData(leafData: TreeTransferData[]) {
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
function addChildNodes(leafData: TreeTransferData[]) {
  const { parentField, rowField } = getTreeConfigField();

  // 创建一个 Map，用于存储父节点和其直接子节点的映射关系
  const parentToChildrenMap = new Map<string, TreeTransferData[]>();

  // 遍历所有数据，构建父节点 -> 子节点列表的映射
  for (const dataItem of props.data) {
    const parentKey = dataItem[parentField];
    if (!parentToChildrenMap.has(parentKey)) {
      parentToChildrenMap.set(parentKey, []);
    }
    parentToChildrenMap.get(parentKey)!.push(dataItem);
  }

  // 使用队列而非递归实现遍历，减少调用栈深度
  const queue: TreeTransferData[] = [...leafData];

  while (queue.length > 0) {
    const currentItem = queue.shift()!; // 取出队列中的第一个元素
    const currentKey = currentItem[rowField];

    // 将当前节点存储到 treeDataMap 中
    treeDataMap.set(currentKey, currentItem);

    // 获取当前节点的子节点，如果存在，加入队列
    const children = parentToChildrenMap.get(currentKey);
    if (children) {
      queue.push(...children);
    }
  }
}
// 根据叶子节点递归遍历获取祖先节点
function getParentNode(dataItem: TreeTransferData, parentField: string, rowField: string) {
  const parentKey = dataItem[parentField];
  const parentItem = props.data?.find((item) => item[rowField] === parentKey);
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
async function resetCheckedData() {
  for (const { row, checked } of checkDataMap.values()) {
    const _row = treeLeftRef.value.tableInstance.getRowById(row.id);
    if (_row) {
      await treeLeftRef.value.tableInstance.setCheckboxRow(_row, checked);
    }
  }
}
function getTreeNodeLevel(row: Row): number {
  if (!props.useTree) {
    return 0;
  }
  const { parentField, rowField } = getTreeConfigField();
  if (!row[parentField]) {
    return 0;
  }
  const targetItem = props.data.find((item) => item[rowField] === row[parentField]);
  if (targetItem) {
    return 1 + getTreeNodeLevel(targetItem);
  }
  return 0;
}
// 筛选后的数据与用户输入数据的顺序保持一致
function sortTreeData(
  targetData: TreeTransferData[],
  sortData: TreeTransferData,
  key: string | number
) {
  const sortKeyList = sortData.map((item: TreeTransferData) => item[key]);
  return targetData.sort((a, b) => (sortKeyList.indexOf(a[key]) < sortKeyList.indexOf(b[key]) ? -1 : 1));
}

function getTreeConfigField() {
  const parentField = treeConfig.value?.parentField || 'pid';
  const rowField = treeConfig.value?.rowField || 'id';
  return { parentField, rowField };
}
function toggleTreeExpand(row: Row, e: Event) {
  if (props.useTree && !isLeafNode(row)) {
    e.stopPropagation();
    const $table = treeLeftRef.value.tableInstance;
    $table.toggleTreeExpand(row);
  }
}
// 拖拽排序
function dragSort() {
  const fullTableData = tableRightRef.value.tableInstance.getTableData().fullData;
  const ids = fullTableData.map((item: Row) => item.id);
  fullData.value = sortBySmallerList(fullData.value, ids);
  const selectedData = getSelectedData();
  emits('change', selectedData);
  emits('sort', selectedData);
  updateSelectData();
}
function sortFunc(targetData: TreeTransferData[], sortData: TreeTransferData) {
  const sortKeyList = sortData.map((item: TreeTransferData) => item.id);
  return targetData.sort((a, b) => (sortKeyList.indexOf(a.id) < sortKeyList.indexOf(b.id) ? -1 : 1));
}
function getSelectedData() {
  return fullData.value.filter(
    (item: TreeTransferData) => checkDataMap.get(item.id)?.checked ?? false
  );
}
function getIcon(icon: any, row: Row) {
  if (typeof icon === 'function') {
    return icon?.(row);
  }
  return icon;
}
function checkMethod(data: any) {
  const { row } = data;
  return props.checkMethod?.(data) ?? !row.disabled ?? true;
}
function isLeafNode(row: Row) {
  return !row.children || row.children.length === 0;
}
async function setCheckboxRow(id: number | string | (number | string)[], checked: boolean) {
  const ids = Array.isArray(id) ? id : [id];
  const rows = ids
  .map((id: number | string) => {
    const row = treeLeftRef.value.tableInstance.getRowById(id);
    if (row && checkMethod({ row }) && !row.disabled) {
      return row;
    }
    return null;
  })
  .filter((item: Row | null) => item !== null);
  await treeLeftRef.value.tableInstance.setCheckboxRow(rows, checked);
  checkboxChange(rows, checked);
}
function isCheckedRow(id: number | string) {
  const row = treeLeftRef.value.tableInstance.getRowById(id);
  return treeLeftRef.value.tableInstance.isCheckedByCheckboxRow(row);
}
function addEvent() {
  const InputRef = KTransferInputRef.value?.$el.querySelector('.el-input__suffix');
  if (InputRef) {
    InputRef.addEventListener('click', filterData);
  } else {
    console.error('Element with class .el-input__suffix not found');
  }
}
async function clearQuery() {
  query.value = '';
  await filterData();
  clearData();
}

defineExpose({
  clearData,
  setCheckboxRow,
  isCheckedRow,
  clearQuery,
  getQuery
});
</script>

<style lang="less">
@import './style.less';
.tree-transfer__cell,
.column-content {
  display: flex;
  align-items: center;
  .column-icon {
    margin-right: 3px;
  }
  svg {
    width: 1.5em;
    height: 1.5em;
  }
}
.list-item-disabled {
  filter: grayscale(1);
  opacity: 0.8;
}
</style>
