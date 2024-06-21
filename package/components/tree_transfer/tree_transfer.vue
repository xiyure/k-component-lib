<template>
  <div class="k-tree-transfer">
    <div v-if="showFilter" class="k-transfer__filter">
      <k-input
        v-model="query"
        placeholder="按回车键搜索列表"
        :suffix-icon="IconSearch"
        @change="filterData"
        @keyup.enter="filterData"
      />
    </div>
    <div class="k-transfer__body">
      <div class="k-transfer-content k-transfer-content__left">
        <div class="k-transfer__list">
          <k-tree-table
            ref="treeLeftRef"
            size="mini"
            :column="column"
            :data="leftData"
            :tree-config="{ parentField: 'pid' }"
            :show-header-tools="false"
            :show-page="false"
            use-tree
            @checkbox-change="updateSelectData"
          >
          </k-tree-table>
        </div>
      </div>
      <div class="k-transfer-content k-transfer-content__right">
        <div class="k-transfer__list">
          <k-table
            ref="treeRightRef"
            size="mini"
            :data="showRightData"
          >
            <k-table-column
              field="name"
              :title="props.rightTitle"
              :show-column-menu="false"
            >
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

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { IconSearch, IconDrag, IconClose } from 'ksw-vue-icon';
import { TreeTransferProps } from './type.d';
import { KTable, KTableColumn } from '../table';
import { KInput } from '../input';
import { KTreeTable } from '../tree_table';

const props = withDefaults(defineProps<TreeTransferProps>(), {
  showFilter: true,
  usetree: true
});

// 定义emit
const column = ref([{
  type: 'checkbox',
  title: props.leftTitle,
  field: 'name',
  treeNode: true,
  showColumnMenu: false
}]);
const query = ref('');
const treeLeftRef = ref();
const treeRightRef = ref();
const leftData = ref<any>(treeToArray(props.data || []));
const rightData = ref<any>([]);
const showRightData = ref<any>([]);
 
// 右侧数据
const selectData = ref<any>([]);
 
onMounted(() => initData());
function initData() {
  if (!props.data || !props.modelValue) {
    return;
  }
  nextTick(() => {
    if (Array.isArray(props.defaultData)) {
      for (const row of props.defaultData) {
        const selectLeafData = getLeafNodes(leftData.value);
        const targetRow = selectLeafData.find(item => item.id === row.id);
        treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, true);
      }
      updateSelectData();
    }
  });
}

function updateSelectData() {
  const checkNodes = treeLeftRef.value.tableInstance.getCheckboxRecords(true);
  const obj = {};
  selectData.value = checkNodes.reduce((cur, next) => {
    obj[next[props.nodeKey]] ? '' : obj[next[props.nodeKey]] = true && cur.push(next);
    return cur;
  }, []);
  const originalRight = JSON.parse(JSON.stringify(props.data));
  // 抽离出选中数据中的id
  const ids = extractId(selectData.value);
  // 重新整理两侧树中数据
  const rightTree = sortData(originalRight, ids);
  const selectLeafData = getLeafNodes(rightTree);
  rightData.value = selectLeafData.filter(item => !item.children || !item.children.length);
  filterRightData();
}

function getLeafNodes(treeData: any[]) {
  const leafNodes:any[] = [];
  const traverse = (nodes) => {
    nodes.forEach((node) => {
      if (node.children && node.children.length) {
        traverse(node.children);
      } else {
        leafNodes.push(node);
      }
    });
  };
  traverse(treeData);
  return leafNodes;
}
function removeRightData(row) {
  const selectLeafData = getLeafNodes(leftData.value);
  const targetRow = selectLeafData.find(item => item.id === row.id);
  treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, false);
  const removeIndex = rightData.value.findIndex(item => item.id === row.id);
  if (removeIndex >= 0) {
    rightData.value.splice(removeIndex, 1);
    filterRightData();
  }
}
function clearData() {
  const selectLeafData = getLeafNodes(leftData.value);
  for (const dataItem of rightData.value) {
    const targetRow = selectLeafData.find(item => item.id === dataItem.id);
    treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, false);
  }
  rightData.value = [];
  showRightData.value = [];
}

const sortData = (data: any, condition: Array<string>) => {
  const result:any[] = [];
  for (const item of data) {
    // 如果item的id在condition中，说明该数据需要保留
    if (condition.includes(item.id)) {
      result.push(item);
    } else {
      // 否则，判断item是否有children属性
      if (item.children) {
        const subResult = sortData(item.children, condition);
        // 如果返回的结果数组不为空，说明有符合条件的子数据
        if (subResult.length > 0) {
          // 将item的children属性更新为返回的结果数组
          item.children = subResult;
          result.push(item);
        }
      }
    }
  }
  return result;
};

/**
 * 将id从备选中的数据取出
 * @param arr tree中被选中的数据
 */
const extractId = (arr: any) => {
  const newArr: any[] = [];
  for (const i in arr) {
    newArr.push(arr[i].id);
  }
  return newArr;
};

// 筛选
function filterData() {
  filterLeftData();
  filterRightData();
}
async function filterLeftData() {
  const searchKey = query.value.trim();
  if (!searchKey) {
    return;
  }
  treeLeftRef.value.filter(searchKey);
}
function filterRightData() {
  const searchKey = query.value.trim();
  if (!searchKey) {
    showRightData.value = rightData.value;
    return;
  }
  showRightData.value = rightData.value.filter(item => item.name.includes(searchKey));
}
// 拖拽排序
let dragTarget = null; // 拖拽项
let dragIndex = -1; // 拖拽项在源数据中的索引
let targetOption: any = null;// 拖动过程中停放目标
const handleDragStart = (row) => {
  dragTarget = row;
  dragIndex = rightData.value.findIndex(item => item.name === row.name);
};

const handleDragenter = (event, row) => {
  event.preventDefault();
  if (!dragTarget || !row) return;
  targetOption = row;
};

const handleDrop = () => {
  const targetIndex = rightData.value.findIndex(item => item.name === targetOption.name);
  const newIndex = targetIndex;
  const [removedIndex] = rightData.value.splice(dragIndex, 1);
  rightData.value.splice(newIndex, 0, removedIndex);
  treeRightRef.value.tableInstance.reloadData(rightData.value);
  dragTarget = null;
  targetOption = null;
  dragIndex = -1;
};
// 树形数据->一维数组
function treeToArray(data: any[], resultData:any[] = [], pid: any = null) {
  // 防止源数据污染
  const childrenField = 'children';
  const rowField = 'id';
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const parentField = 'pid';
    if (!node[parentField]) {
      node[parentField] = pid;
    }
    resultData.push(node);
    if (node[childrenField] && node[childrenField].length) {
      treeToArray(node.children, resultData, node[rowField]);
      delete node[childrenField];
    }
  }
  return resultData;
}

defineExpose({
  clearData,
});
</script>

<style lang="less">
@import './style.less';
</style>