<template>
  <div class="k-tree-transfer">
    <div v-if="showFilter" class="k-transfer__filter">
      <k-input
        v-model="query"
        :placeholder="$t('enterInputSearch')"
        :suffix-icon="IconSearch"
        @change="filterData"
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
            :checkbox-config="{ checkRowKeys: selectData, trigger: 'null' }"
            @checkbox-change="checkboxChange"
            @checkbox-all="checkboxChange"
          >
            <k-table-column
              type="checkbox"
              :field="label"
              width="auto"
              :title="leftTitle"
              :tree-node="props.useTree"
            >
              <template #default="{ row }">
                <span
                  class="tree-transfer__cell"
                  :style="{
                    marginLeft: `${ rowLevel(row) * (props.treeConfig?.indent ?? 12) }px`
                  }"
                  @click="toggleTreeExpand(row, $event)"
                >
                  <component :is="columnIcon(row)?.icon" class="column-icon" :color="columnIcon(row)?.color" />
                  <span
                    class="tree-transfer__cell-label"
                    :title="row[props.label]"
                  >{{ row[props.label] }}</span>
                </span>
              </template>
            </k-table-column>
          </k-table>
        </div>
      </div>
      <div class="k-transfer-content k-transfer-content__right">
        <div class="k-transfer__list">
          <k-table
            ref="treeRightRef"
            size="mini"
            :border="false"
            height="100%"
            :data="showRightData"
            :row-config="{ useKey: true }"
            :scroll-y="scrollY"
            :full-data="fullData"
            @drag-end="dragSort"
          >
            <k-table-column
              :field="label"
              :title="props.rightTitle"
            >
              <template #header="data">
                <slot name="rightHeader" v-bind="data">
                  <div class="right-data-header">
                    <span class="right-data-title">{{ props.rightTitle }}</span>
                    <span class="clear-data" @click="clearData">{{ $t('clearData') }}</span>
                  </div>
                </slot>
              </template>
              <template #default="{ row }">
                <div
                  class="column-body"
                >
                  <span class="column-content">
                    <component :is="getIcon(props.icon, row)" v-if="props.icon" class="column-icon" />
                    <span class="tree-transfer__cell-label" :title="row[props.label]">{{ row[props.label] }}</span>
                  </span>
                  <div class="column-operate">
                    <IconDrag class="__column-drag-icon" />
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
import { ref, computed, watch, nextTick } from 'vue';
import { IconSearch, IconDrag, IconClose } from 'ksw-vue-icon';
import { TreeTransferProps } from './type.d';
import { KTable, KTableColumn } from '../table';
import { KInput } from '../input';
import { sortBySmallerList } from '../../utils';

const props = withDefaults(defineProps<TreeTransferProps>(), {
  showFilter: true,
  useTree: false,
  label: 'label'
});

// 定义emit
const emits = defineEmits(['change', 'sort']);
const defaultTreeConfig = {
  transform: true,
  rowField: 'id',
  parentField: 'pid',
  childrenField: 'children',
  trigger: 'cell',
  hasChild: 'hasChild',
  indent: 0,
  showIcon: false
};
const leftData = ref<any>([]);
const query = ref('');
const treeLeftRef = ref();
const treeRightRef = ref();
const rightData = ref<any>([]);
const showRightData = ref<any>([]);
const fullData = ref<any>([]);
const selectData = ref<any>([]);

const columnIcon = computed(() => function (row) {
  const expand = treeLeftRef.value?.tableInstance.isTreeExpandByRow(row);
  const isLeafNode = !(row.children && row.children.length);
  if (isLeafNode && row.nodeType === 1) {
    return { icon: getIcon(props.collapseIcon, row), color: props.collapseIconColor };
  } if (props.icon && isLeafNode) {
    return { icon: getIcon(props.icon, row), color: props.iconColor };
  } if (props.expandIcon && expand && !isLeafNode) {
    return { icon: getIcon(props.expandIcon, row), color: props.expandIconColor };
  } if (props.collapseIcon && !expand && !isLeafNode) {
    return { icon: getIcon(props.collapseIcon, row), color: props.collapseIconColor };
  }
});
const treeConfig = computed(() => {
  if (props.useTree) {
    const newTreeConfig = Object.assign(defaultTreeConfig, props.treeConfig || {});
    newTreeConfig.indent = 0;
    return newTreeConfig;
  }
  return undefined;
});
const scrollY = computed(() => ({ enabled: true, ...props.scrollY || {} }));
const rowLevel = computed(() => (row) => getTreeNodeLevel(row));

watch(() => props.data, (newValue) => {
  if (!newValue) {
    return;
  }
  fullData.value = JSON.parse(JSON.stringify(newValue));
  leftData.value = fullData.value;
}, { immediate: true, deep: true });
watch(() => props.defaultData, (newValue) => {
  if (!Array.isArray(newValue)) {
    return;
  }
  selectData.value = [...newValue];
  fullData.value = sortBySmallerList(props.data, props.defaultData ?? []);
  rightData.value = fullData.value.filter(item => newValue.includes(item.id));
  showRightData.value = rightData.value;
  treeLeftRef.value?.tableInstance.reloadData(leftData.value);
}, { immediate: true, deep: true });

function checkboxChange() {
  handleSelectData();
  updateSelectData();
  emits('change', getSelectedData());
}
function updateSelectData() {
  const checkNodes = treeLeftRef.value.tableInstance.getCheckboxRecords(true);
  const newData = checkNodes.filter(item => !item.children?.length);
  rightData.value = sortFunc(newData, fullData.value);
  filterRightData();
}
function handleSelectData() {
  const checkNodes = treeLeftRef.value.tableInstance.getCheckboxRecords(true);
  const data = checkNodes.filter(item => !item.children?.length);
  // 处理新增的数据
  const addList:any[] = [];
  for (const dataItem of data) {
    const targetItem = selectData.value.find(item => item.id === dataItem.id);
    if (!targetItem) {
      addList.push(dataItem.id);
    }
  }
  const ids = leftData.value.map(item => item.id);
  for (let i = 0; i < selectData.value.length; i++) {
    const isSelected = data.find(item => item.id === selectData.value[i]);
    const isLeftData = ids.includes(selectData.value[i]);
    if (!isSelected && isLeftData) {
      selectData.value.splice(i, 1);
      i--;
    }
  }
  selectData.value = selectData.value.concat(...selectData.value, ...addList);
  selectData.value = Array.from(new Set(selectData.value));
}
function removeRightData(row) {
  const targetIndex = selectData.value.findIndex(id => id === row.id);
  if (targetIndex >= 0) {
    selectData.value.splice(targetIndex, 1);
  }
  const targetRow = leftData.value.find(item => item.id === row.id);
  treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, false);
  const removeIndex = showRightData.value.findIndex(item => item.id === row.id);
  if (removeIndex >= 0) {
    showRightData.value.splice(removeIndex, 1);
  }
  emits('change', getSelectedData());
}
function clearData() {
  for (const dataItem of showRightData.value) {
    const targetIndex = selectData.value.findIndex(id => id === dataItem.id);
    if (targetIndex >= 0) {
      selectData.value.splice(targetIndex, 1);
    }
    const targetRow = leftData.value.find(item => item.id === dataItem.id);
    treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, false);
  }
  showRightData.value = [];
  emits('change', getSelectedData());
}
// 筛选
let treeData:any[] = [];
const nodeSet = new Set();
async function filterData() {
  await filterLeftData();
  updateSelectData();
}
async function filterLeftData() {
  const searchKey = query.value.trim();
  let tableData = props.data.filter((dataItem:any) => dataItem[props.label].toString().indexOf(searchKey) !== -1);
  // 当表格数据为树时，筛选后的数据应展示完整的子树
  if (props.useTree) {
    handleTreeData(tableData);
    const { rowField } = getTreeConfigField();
    tableData = sortTreeData(treeData, props.data, rowField);
    if (tableData.length < 500 && searchKey) {
      nextTick(() => {
        const VxeInstance = treeLeftRef.value.tableInstance;
        VxeInstance.setAllTreeExpand(true);
      });
    }
    if (!searchKey) {
      nextTick(() => {
        const VxeInstance = treeLeftRef.value.tableInstance;
        VxeInstance.setAllTreeExpand(false);
      });
    }
  }
  leftData.value = tableData;
  await treeLeftRef.value.tableInstance.reloadData(leftData.value);
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
function getTreeNodeLevel(row) {
  if (!props.useTree) {
    return 0;
  }
  const { parentField, rowField } = getTreeConfigField();
  if (!row[parentField]) {
    return 0;
  }
  const targetItem = props.data.find(item => item[rowField] === row[parentField]);
  if (targetItem) {
    return 1 + getTreeNodeLevel(targetItem);
  } 
  return 0;
}
// 筛选后的数据与用户输入数据的顺序保持一致
function sortTreeData(targetData:any[], sortData: any, key: string | number) {
  const sortKeyList = sortData.map((item:any) => item[key]);
  return targetData.sort((a, b) => (sortKeyList.indexOf(a[key]) < sortKeyList.indexOf(b[key]) ? -1 : 1));
}
function filterRightData() {
  const searchKey = query.value.trim();
  if (!searchKey) {
    showRightData.value = rightData.value;
    return;
  }
  showRightData.value = rightData.value.filter(item => item[props.label].toString().includes(searchKey));
}
function getTreeConfigField() {
  const parentField = treeConfig.value?.parentField || 'pid';
  const rowField = treeConfig.value?.rowField || 'id';
  return { parentField, rowField };
}
function toggleTreeExpand(row, e) {
  e.stopPropagation();
  treeLeftRef.value.tableInstance.toggleTreeExpand(row);
}
// 拖拽排序
function dragSort() {
  const selectedData = getSelectedData();
  emits('change', selectedData);
  emits('sort', selectedData);
}
function sortFunc(targetData:any[], sortData: any) {
  const sortKeyList = sortData.map((item:any) => item.id);
  return targetData.sort((a, b) => (sortKeyList.indexOf(a.id) < sortKeyList.indexOf(b.id) ? -1 : 1));
}
function getSelectedData() {
  return fullData.value.filter(item => selectData.value.includes(item.id));
}
function getIcon(icon: any, row: any) {
  if (typeof icon === 'function') {
    return icon?.(row);
  }
  return icon;
}

defineExpose({
  clearData,
});
</script>

<style lang="less">
@import './style.less';
.tree-transfer__cell, .column-content {
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
</style>