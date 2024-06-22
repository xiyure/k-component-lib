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
        <div class="k-transfer__list">
          <k-table
            ref="treeLeftRef"
            size="mini"
            height="300px"
            :data="leftData"
            :tree-config="treeConfig"
            :row-config="{ keyField: 'id' }"
            :checkbox-config="{ reserve: true, trigger: null }"
            @checkbox-change="updateSelectData"
          >
            <k-table-column
              type="checkbox"
              field="name"
              width="auto"
              :title="leftTitle"
              :show-column-menu="false"
              :tree-node="true"
            >
              <template #default="{ row }">
                <span class="tree-transfer__cell">
                  <props.icon v-if="isExpand(row) === 0" />
                  <props.expandIcon v-if="isExpand(row) === 1" />
                  <props.collapseIcon v-if="isExpand(row) === 2" />
                  {{ row.name }}
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
            height="300px"
            :data="showRightData"
          >
            <k-table-column
              field="name"
              :title="props.rightTitle"
              :show-column-menu="false"
            >
              <template #header>
                <div class="right-data-header">
                  <span class="right-data-title">{{ props.rightTitle }}</span>
                  <span class="clear-data" @click="clearData">{{ $t('clearData') }}</span>
                </div>
              </template>
              <template #default="{ row }">
                <div
                  class="column-body"
                  :draggable="true"
                  @dragstart="handleDragStart(row)"
                  @dragenter="handleDragenter($event, row)"
                  @dragend="handleDrop()"
                >
                  <span class="column-content">{{ row['name'] }}</span>
                  <div class="column-operate">
                    <IconDrag />
                    <IconClose @click="removeRightData(row)" />
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
import { ref, onMounted, computed, nextTick } from 'vue';
import { IconSearch, IconDrag, IconClose } from 'ksw-vue-icon';
import { TreeTransferProps } from './type.d';
import { KTable, KTableColumn } from '../table';
import { KInput } from '../input';

const props = withDefaults(defineProps<TreeTransferProps>(), {
  showFilter: true,
  usetree: true
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
  indent: 0
};
const leftData = ref<any>(props.data || []);
const query = ref('');
const treeLeftRef = ref();
const treeRightRef = ref();
const rightData = ref<any>([]);
const showRightData = ref<any>([]);
 
onMounted(() => initData());

const isExpand = computed(() => function (row) {
  const expand = treeLeftRef.value?.tableInstance.isTreeExpandByRow(row);
  const isLeafNode = !(row.children && row.children.length);
  if (props.icon && isLeafNode) {
    return 0;
  } if (props.expandIcon && expand && !isLeafNode) {
    return 1;
  } if (props.collapseIcon && !expand && !isLeafNode) {
    return 2;
  }
});
const treeConfig = computed(() => {
  if (props.useTree) {
    return Object.assign(defaultTreeConfig, props.treeConfig || {});
  }
  return undefined;
});
function initData() {
  if (!props.data || !props.modelValue) {
    return;
  }
  nextTick(() => {
    if (Array.isArray(props.defaultData)) {
      for (const id of props.defaultData) {
        const targetRow = leftData.value.find(item => item.id === id);
        if (!targetRow) {
          continue;
        }
        targetRow.checked = true;
        treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, true);
      }
      updateSelectData(false);
    }
  });
}

function updateSelectData(isEmit: boolean = true) {
  const checkNodes = treeLeftRef.value.tableInstance.getCheckboxRecords(true);
  const newData = checkNodes.filter(item => !item.children?.length);
  rightData.value = sortFunc(newData, leftData.value);
  filterRightData();
  if (isEmit) {
    emits('change', rightData.value);
  }
}
function removeRightData(row) {
  const targetRow = leftData.value.find(item => item.id === row.id);
  treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, false);
  const removeIndex = rightData.value.findIndex(item => item.id === row.id);
  if (removeIndex >= 0) {
    rightData.value.splice(removeIndex, 1);
  }
}
function clearData() {
  for (const dataItem of rightData.value) {
    const targetRow = leftData.value.find(item => item.id === dataItem.id);
    treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, false);
  }
  rightData.value = [];
  showRightData.value = [];
}
// 筛选
let treeData:any[] = [];
const nodeSet = new Set();
function filterData() {
  filterLeftData();
  updateSelectData();
}
function filterLeftData() {
  const searchKey = query.value.trim();
  let tableData = props.data.filter((dataItem:any) => dataItem.name.indexOf(searchKey) !== -1) as any;
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
  showRightData.value = rightData.value.filter(item => item.name.includes(searchKey));
}
function getTreeConfigField() {
  const parentField = treeConfig.value?.parentField || 'pid';
  const rowField = treeConfig.value?.rowField || 'id';
  return { parentField, rowField };
}
// 拖拽排序
let dragTarget = null; // 拖拽项
let dragIndex = -1; // 拖拽项在源数据中的索引
let targetOption: any = null;// 拖动过程中停放目标
const handleDragStart = (row) => {
  dragTarget = row;
  dragIndex = leftData.value.findIndex(item => item.name === row.name);
};

const handleDragenter = (event, row) => {
  event.preventDefault();
  if (!dragTarget || !row) return;
  targetOption = row;
};

const handleDrop = () => {
  const targetIndex = leftData.value.findIndex(item => item.name === targetOption.name);
  const newIndex = targetIndex;
  const [removedIndex] = leftData.value.splice(dragIndex, 1);
  leftData.value.splice(newIndex, 0, removedIndex);
  updateSelectData();
  dragTarget = null;
  targetOption = null;
  dragIndex = -1;
};
function sortFunc(targetData:any[], sortData: any) {
  const sortKeyList = sortData.map((item:any) => item.id);
  return targetData.sort((a, b) => (sortKeyList.indexOf(a.id) < sortKeyList.indexOf(b.id) ? -1 : 1));
}

defineExpose({
  clearData,
});
</script>

<style lang="less">
@import './style.less';
.tree-transfer__cell {
  display: inline-flex;
  align-items: center;
  svg {
    width: 2vw;
    height: 2vh;
  }
}
</style>