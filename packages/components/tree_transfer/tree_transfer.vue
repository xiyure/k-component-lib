<template>
  <div :class="['k-tree-transfer', _styleModule]">
    <div
      v-if="showSearchInput === true || showSearchInput === 'left'"
      class="k-transfer__filter !mb-3"
    >
      <div class="flex justify-between items-center gap-2">
        <k-input
          ref="KTransferInputLeftRef"
          v-model="_query"
          class="flex-1"
          :placeholder="t?.('enterInputSearch')"
          :suffix-icon="IconSearch"
          @keyup.enter="leftQueryChange"
          @change="leftQueryChange"
        />
        <k-input
          v-if="showSearchInput === true"
          ref="KTransferInputRightRef"
          v-model="_rightQuery"
          class="flex-1 ml-[10px]"
          :placeholder="t?.('enterInputSearch')"
          :suffix-icon="IconSearch"
          @keyup.enter="rightQueryChange"
          @change="rightQueryChange"
        />
      </div>
    </div>
    <div class="k-transfer__body">
      <div class="k-transfer-content k-transfer-content__left">
        <div
          class="k-transfer__list"
          :style="{ height: tableHeight + 'px' }"
          :class="useTree ? 'transfer-tree-table' : ''"
        >
          <k-table
            ref="treeLeftRef"
            size="mini"
            :border="false"
            height="100%"
            :data="showLeftTableData"
            :tree-config="treeConfig"
            :row-config="{ keyField: rowKey }"
            :scroll-y="scrollY"
            :checkbox-config="{
              checkRowKeys: defaultData,
              trigger: 'cell',
              checkMethod
            }"
            @checkbox-change="(data: any) => {
              checkBoxChange(data);
              emits('change', rightData);
            }"
            @checkbox-all="(data: any) => {
              checkboxAllChange(data);
              emits('change', rightData);
            }"
          >
            <template v-for="item in leftColumns" :key="item.field">
              <k-table-column v-bind="item">
                <template #default="{ row, column }">
                  <slot name="left-cell" :row="row" :column="column">
                    <span
                      class="tree-transfer__cell"
                      :style="{
                        marginLeft: `${rowLevel(row) * (props.treeConfig?.indent ?? 12)}px`
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
                        v-if="item.field"
                        class="tree-transfer__cell-label"
                        :title="row[item.field]"
                      >
                        {{ row[item.field] }}
                      </span>
                    </span>
                  </slot>
                </template>
              </k-table-column>
            </template>
            <template v-if="$slots.empty && query" #empty>
              <slot name="empty" :query="query"></slot>
            </template>
          </k-table>
        </div>
        <Pagination
          :visible="isPagingLeft"
          position="left"
          :emits
          :data-length="leftDataLength"
          :page-config="paginationLeftConfig"
          :resetCheckboxStatus
        >
          <template #default="{ pageConfig }">
            <k-input
              v-model="currentPage"
              @change="(number: number) => pageConfig.currentPage = number"
            ></k-input>
          </template>
        </Pagination>
      </div>
      <div class="k-transfer-content k-transfer-content__right">
        <div class="k-transfer__list" :style="{ height: tableHeight + 'px' }">
          <k-table
            ref="tableRightRef"
            size="mini"
            :border="false"
            height="100%"
            :data="showRightTableData"
            :row-config="{ useKey: true, drag: showDrag }"
            :scroll-y="scrollY"
            @row-dragend="dragSort"
          >
            <template v-for="item in rightColumns" :key="item.field">
              <k-table-column v-bind="item">
                <template #header="data">
                  <slot
                    :name="compatibleSlots($slots, ['right-header', 'rightHeader'])"
                    v-bind="data"
                  >
                    <div v-if="!isCustomColumns" class="right-data-header">
                      <span class="right-data-title">{{ item.title ?? '' }}</span>
                      <span class="clear-data" @click="clearCurrentData">
                        {{ t?.('clearData') }}
                      </span>
                    </div>
                    <template v-else>{{ item.title ?? '' }}</template>
                  </slot>
                </template>
                <template #default="{ row, column }">
                  <div v-if="!isCustomColumns" class="column-body">
                    <span class="column-content">
                      <slot name="right-cell" :row="row" :column="column">
                        <component
                          :is="getIcon(props.icon, row)"
                          v-if="props.icon"
                          class="column-icon"
                        />
                        <span class="tree-transfer__cell-label" :title="row[props.label]">
                          <slot
                            name="right-label"
                            :row="row"
                            :column="column"
                            :parent-data="parentData(row)"
                          >
                            {{ row[props.label] }}
                          </slot>
                        </span>
                      </slot>
                    </span>
                    <div class="column-operate">
                      <IconClose class="column-close" @click="removeSelectedData(row)" />
                    </div>
                  </div>
                  <slot name="right-cell" :row="row" :column="column" v-else>
                    {{ row[item.field ?? ''] }}
                  </slot>
                </template>
              </k-table-column>
            </template>
            <template v-if="$slots.empty && query" #empty>
              <slot name="empty" :query="query"></slot>
            </template>
          </k-table>
        </div>
        <Pagination
          :visible="isPagingRight"
          position="right"
          :emits
          :data-length="rightDataLength"
          :page-config="paginationRightConfig"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ref, computed, watch, inject, nextTick } from 'vue';
import { IconSearch, IconClose } from 'ksw-vue-icon';
import { VxeTablePropTypes } from 'vxe-table';
import { sortBySmallerList, compatibleSlots, sortFunc } from '../../utils';
import { useData, useConfig, useCheckbox } from './hooks';
import { useLocale } from '../../hooks';
import Pagination from './page.vue';
import { TreeTransferProps, TreeTransferData } from './type';
import { Column } from '../tree_table';

defineOptions({
  name: 'KTreeTransfer'
});

const { t } = useLocale();

type Row = VxeTablePropTypes.Row;

const props = withDefaults(defineProps<TreeTransferProps>(), {
  showSearchInput: 'left',
  useTree: false,
  label: 'label',
  showDrag: false,
  showPage: false,
  tableHeight: 300,
  defaultData: () => [],
  rowKey: 'id'
});

const _styleModule = inject('_styleModule', '');
// 定义emit
const emits = defineEmits([
  'change',
  'drag',
  'remote-query',
  'server-paging',
  'page-current-change',
  'page-size-change',
  'page-change',
  'page-prev-click',
  'page-next-click',
  'update:modelValue'
]);
const leftData = ref<TreeTransferData[]>([]);
const query = ref('');
const _query = ref('');
const rightQuery = ref('');
const _rightQuery = ref('');
const treeLeftRef = ref();
const tableRightRef = ref();
const KTransferInputLeftRef = ref();
const KTransferInputRightRef = ref();
const { treeConfig, scrollY } = useConfig(props);

const rightData = computed(() => {
  const targetRows = leftVisibleData.value.filter((row: Row) =>
    checkedLeafData.value.has(row[props.rowKey])
  );
  return sortFunc(targetRows, leftData.value, props.rowKey);
});
// 左右面板列配置
const leftColumns = computed(() => {
  if (Array.isArray(props.columns)) {
    return props.columns;
  }
  return [
    {
      type: 'checkbox',
      field: props.label,
      title: props.titles?.[0] ?? '',
      treeNode: props.useTree
    }
  ];
});
const rightColumns = computed(() => {
  if (isCustomColumns.value) {
    return (props.columns as Array<Column>).filter((item) => item.type !== 'checkbox');
  }
  return [
    {
      field: props.label,
      title: props.titles?.[1] ?? '',
      dragSort: true
    }
  ];
});

// 分离左右面板配置
const leftPanelConfig = computed(() => ({
  showPage: props.showPage === true || props.showPage === 'left',
  paginationConfig: props.leftPaginationConfig,
  useTree: props.useTree,
  treeConfig: props.treeConfig,
  rowKey: props.rowKey,
  searchConfig: props.searchConfig
}));

const rightPanelConfig = computed(() => ({
  showPage: props.showPage === true || props.showPage === 'right',
  paginationConfig: props.rightPaginationConfig || props.leftPaginationConfig,
  useTree: false,
  rowKey: props.rowKey,
  searchConfig: props.rightSearchConfig
}));

// checkbox
const useCheckboxConfig = computed(() => ({
  showPage: props.showPage === true || props.showPage === 'left',
  checkboxConfig: {
    checkAll: props.checkboxAll,
    checkRowKeys: props.defaultData,
    checkMethod: props.checkMethod
  },
  useTree: props.useTree,
  treeConfig: props.treeConfig,
  rowKey: props.rowKey
}));

const tableL = computed(() => treeLeftRef.value?.tableInstance);
const tableR = computed(() => tableRightRef.value?.tableInstance);

const {
  visibleData: leftVisibleData,
  showTableData: showLeftTableData,
  dataLength: leftDataLength,
  isPaging: isPagingLeft,
  tableCacheData,
  paginationConfig: paginationLeftConfig
} = useData(tableL, leftPanelConfig, emits, leftColumns, leftData, query);

const {
  showTableData: showRightTableData,
  dataLength: rightDataLength,
  isPaging: isPagingRight,
  paginationConfig: paginationRightConfig
} = useData(tableR, rightPanelConfig, emits, rightColumns, rightData, rightQuery);

const {
  checkedLeafData,
  _checkboxMethods,
  init,
  resetCheckboxStatus,
  checkboxAllChange,
  checkBoxChange
} = useCheckbox(tableL, useCheckboxConfig, leftData, showLeftTableData, tableCacheData);

const isCustomColumns = computed(() => Array.isArray(props.columns));
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
    }
);
const rowLevel = computed(() => (row: Row) => getTreeNodeLevel(row));
const parentData = computed(
  () =>
    function (row: Row) {
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
  (newValue: TreeTransferData[]) => {
    leftData.value = Array.isArray(newValue) ? [...newValue] : [];
  },
  { immediate: true }
);
watch(
  () => rightData.value,
  (newValue, oldValue = []) => {
    const ids = newValue.map((item) => item[props.rowKey]);
    const oldIds = oldValue.map((item) => item[props.rowKey]);
    if (ids.join() === oldIds.join()) {
      return;
    }
    emits('update:modelValue', ids);
  },
  { immediate: true }
);
watch(
  () => props.modelValue,
  async (newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    await nextTick();
    resetCheckboxStatus();
    const ids = rightData.value.map((item) => item[props.rowKey]);
    if (newValue.join() === ids.join()) {
      return;
    }
    const mlMap = new Set(newValue);
    const targetRows = leftVisibleData.value.filter((row: Row) => mlMap.has(row[props.rowKey]));
    init(targetRows);
  },
  { immediate: true, deep: true }
);

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
  const ids = fullTableData.map((item: Row) => item[props.rowKey]);
  leftData.value = sortBySmallerList(leftData.value, ids);
  emits('drag', rightData.value);
  emits('change', rightData.value);
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
function removeSelectedData(row: Row) {
  _checkboxMethods.setCheckboxRow(row, false);
  emits('change', rightData.value);
}

function leftQueryChange() {
  query.value = _query.value;
  resetCheckboxStatus();
}
function rightQueryChange() {
  rightQuery.value = _rightQuery.value;
}
function getQuery() {
  if (props.showSearchInput === true) {
    return [query.value, rightQuery.value];
  } else if (props.showSearchInput === 'left') {
    return query.value;
  } else {
    return rightQuery.value;
  }
}
function clearQuery(key: 'left' | 'right' | undefined) {
  if (key === 'left') {
    query.value = '';
  } else if (key === 'right') {
    rightQuery.value = '';
  } else {
    query.value = '';
    rightQuery.value = '';
  }
}
function clearCurrentData() {
  if (rightData.value.length === 0) {
    return;
  }
  clearData();
  emits('change', []);
}
function clearData(deep: boolean = false) {
  if (!deep) {
    _checkboxMethods.setCheckboxRow(showRightTableData.value, false);
    return;
  }
  _checkboxMethods.setAllCheckboxRow(false);
}

const currentPage = ref(1);
defineExpose({
  clearData,
  clearQuery,
  getQuery,
  ..._checkboxMethods
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
