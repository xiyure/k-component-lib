<template>
  <div :class="['k-tree-transfer', _styleModule]">
    <div v-if="showFilter" class="k-transfer__filter">
      <k-input
        v-model="query"
        :placeholder="$t('enterInputSearch')"
        :suffix-icon="IconSearch"
        @blur="filterData"
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
            :checkbox-config="{ checkRowKeys, trigger: 'null', checkMethod }"
            @checkbox-change="checkboxChange"
            @checkbox-all="checkboxChange"
          >
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
                  <span
                    class="tree-transfer__cell-label"
                    :title="row[props.label]"
                    @click="addRightData(row)"
                  >
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
            ref="treeRightRef"
            size="mini"
            :border="false"
            height="100%"
            :data="showRightData"
            :row-config="{ useKey: true }"
            :scroll-y="scrollY"
            @drag-end="dragSort"
          >
            <k-table-column :field="label">
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
                      <slot name="right-label" :parentData="parentData(row)">
                        <span class="tree-transfer__cell-label" :title="row[props.label]">
                          {{ row[props.label] }}
                        </span>
                      </slot>
                    </slot>
                  </span>
                  <div class="column-operate">
                    <IconDrag v-if="props.showDrag" class="__column-drag-icon" />
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
import { ref, computed, watch, nextTick, inject } from 'vue';
import { IconSearch, IconDrag, IconClose } from 'ksw-vue-icon';
import { VxeTablePropTypes } from 'vxe-table';
import { TreeTransferProps, TreeTransferData } from './type';
import { KTable, KTableColumn } from '../table';
import { KInput } from '../input';
import { sortBySmallerList } from '../../utils';
import { add } from 'lodash-es';

defineOptions({
  name: 'KTreeTransfer',
});

type Row = VxeTablePropTypes.Row;

const props = withDefaults(defineProps<TreeTransferProps>(), {
  showFilter: true,
  useTree: false,
  label: 'label',
  showDrag: false,
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
  showIcon: false,
};
const fullData = ref<TreeTransferData[]>(props.data ?? []);
const leftData = ref<TreeTransferData[]>(fullData.value);
const rightData = ref<TreeTransferData[]>([]);
const showRightData = ref<TreeTransferData[]>([]);
const query = ref('');
const treeLeftRef = ref();
const treeRightRef = ref();
const selectData = ref<Set<number | string>>(new Set());
const treeDataMap: Map<string | number, TreeTransferData> = new Map();

const columnIcon = computed(
  () =>
    function (row: Row) {
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
    },
);
const checkRowKeys = computed(() => Array.from(selectData.value));
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

watch(
  () => props.defaultData,
  (newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    newValue.forEach((id: string | number) => {
      selectData.value.add(id);
    });
    fullData.value = sortBySmallerList(props.data, props.defaultData ?? []);
    rightData.value = fullData.value.filter((item: TreeTransferData) => {
      if (newValue.includes(item.id) && checkMethod({ row: item })) {
        return true;
      }
      return false;
    });
    showRightData.value = rightData.value;
    treeLeftRef.value?.tableInstance.reloadData(leftData.value);
  },
  { immediate: true, deep: true },
);

function checkboxChange() {
  handleSelectData();
  updateSelectData();
  emits('change', getSelectedData());
}
function updateSelectData() {
  const newData = fullData.value.filter((item: TreeTransferData) => selectData.value.has(item.id));
  rightData.value = newData.filter((item: TreeTransferData) => {
    if (props.defaultData?.includes(item.id) && !checkMethod({ row: item })) {
      return false;
    }
    return true;
  });
  rightData.value = sortFunc(rightData.value, fullData.value);
  filterRightData();
}
function handleSelectData() {
  const checkNodes = treeLeftRef.value.tableInstance.getCheckboxRecords(true);
  const data = checkNodes.filter((item: any) => !item.children?.length);
  selectData.value.clear();
  for (const dataItem of data) {
    selectData.value.add(dataItem.id);
  }
}
function removeRightData(row: Row) {
  const isSelect = selectData.value.has(row.id);
  if (isSelect) {
    selectData.value.delete(row.id);
  }
  const targetRow = leftData.value.find((item) => item.id === row.id);
  treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, false);
  const removeIndex = showRightData.value.findIndex((item) => item.id === row.id);
  if (removeIndex >= 0) {
    showRightData.value.splice(removeIndex, 1);
  }
  emits('change', getSelectedData());
}
function clearData() {
  for (const dataItem of showRightData.value) {
    const hasSelect = selectData.value.has(dataItem.id);
    if (hasSelect) {
      selectData.value.delete(dataItem.id);
    }
    const targetRow = leftData.value.find((item) => item.id === dataItem.id);
    treeLeftRef.value.tableInstance.setCheckboxRow(targetRow, false);
  }
  showRightData.value = [];
  emits('change', getSelectedData());
}
// 筛选
async function filterData() {
  await filterLeftData();
  updateSelectData();
}
async function filterLeftData() {
  const searchKey = query.value.trim();
  let tableData = props.data.filter(
    (dataItem: TreeTransferData) => dataItem[props.label].toString().indexOf(searchKey) !== -1,
  );
  // 当表格数据为树时，筛选后的数据应展示完整的子树
  if (props.useTree) {
    handleTreeData(tableData);
    const { rowField } = getTreeConfigField();
    tableData = sortTreeData([...treeDataMap.values()], props.data, rowField);
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
  const childrenMap = new Map(leafData.map((item) => [item[rowField], item]));
  for (const dataItem of props.data) {
    const parentKey = dataItem[parentField];
    if (childrenMap.get(parentKey)) {
      treeDataMap.set(dataItem[rowField], dataItem);
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
  key: string | number,
) {
  const sortKeyList = sortData.map((item: TreeTransferData) => item[key]);
  return targetData.sort((a, b) =>
    sortKeyList.indexOf(a[key]) < sortKeyList.indexOf(b[key]) ? -1 : 1,
  );
}
function filterRightData() {
  const searchKey = query.value.trim();
  if (!searchKey) {
    showRightData.value = rightData.value;
    return;
  }
  showRightData.value = rightData.value.filter((item) =>
    item[props.label].toString().includes(searchKey),
  );
}
function getTreeConfigField() {
  const parentField = treeConfig.value?.parentField || 'pid';
  const rowField = treeConfig.value?.rowField || 'id';
  return { parentField, rowField };
}
function toggleTreeExpand(row: Row, e: Event) {
  e.stopPropagation();
  treeLeftRef.value.tableInstance.toggleTreeExpand(row);
}
// 拖拽排序
function dragSort(newData: TreeTransferData[]) {
  const ids = newData.map((item) => item.id);
  fullData.value = sortBySmallerList(fullData.value, ids);
  const selectedData = getSelectedData();
  emits('change', selectedData);
  emits('sort', selectedData);
}
function sortFunc(targetData: TreeTransferData[], sortData: TreeTransferData) {
  const sortKeyList = sortData.map((item: TreeTransferData) => item.id);
  return targetData.sort((a, b) =>
    sortKeyList.indexOf(a.id) < sortKeyList.indexOf(b.id) ? -1 : 1,
  );
}
function getSelectedData() {
  return fullData.value.filter((item: TreeTransferData) => selectData.value.has(item.id));
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

const parentData = computed(
  () =>
    function (row: Row) {
      let data = row;
      while (data.pid) {
        leftData.value.map((item) => {
          if (item.id == data.pid) {
            data = item;
          }
        });
      }
      let name = data.name;
      data = row[props.label];
      data = { data, name };
      return data;
    },
);

async function addRightData(row: Row) {
  const $table = treeLeftRef.value.tableInstance;
  if ((row.pid === undefined || row.pid !== null) && (!row.children || row.children?.length === 0)) {
    // const targetRow = leftData.value.find((item) => item.id === row.id);
    const row1 = $table.getRowById(row.id);
   
    // 查找 showRightData 中是否已经存在该 row，避免重复添加
    const addIndex = showRightData.value.findIndex((item) => item.id === row.id);
    let isCheck = await treeLeftRef.value.tableInstance.isCheckedByCheckboxRow(row1)
    if (!isCheck) {
      // 如果不存在，则将其添加到右侧数据
      showRightData.value.push(row);
    } else showRightData.value.splice(addIndex, 1);
    await treeLeftRef.value.tableInstance.setCheckboxRow(row1, !isCheck);
    emits('change', getSelectedData());
  }
}

defineExpose({
  clearData,
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
