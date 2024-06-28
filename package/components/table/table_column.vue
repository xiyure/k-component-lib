<template>
  <vxe-column
    v-bind="$attrs"
    :width="columnWidth"
    :edit-render="editRender"
    :filters="filters"
    :sortable="sortable"
    :type="type"
    class="k-table-column"
  >
    <template v-if="!type" #header="headerSlotProps">
      <div v-if="!isExpandColumn" class="k-table-column__header">
        <div class="k-table-column__title">
          <slot name="header" v-bind="headerSlotProps">
            <i
              v-if="tableInstance.editConfig
                && tableInstance.editConfig.showIcon !== false
                && editRender
              "
              class="k-table-column__edit vxe-icon-edit"
            ></i>
            {{ headerSlotProps.column.title ?? '-' }}
          </slot>
        </div>
        <k-dialog
          v-model="dialogVisible"
          :title="$t('customDescription')"
          @open="openDialog"
        >
          <div class="k-column__header-dialog">
            <k-input v-model="textareaContent" type="textarea"></k-input>
            <div class="header-dialog__buttons">
              <k-button @click="() => dialogVisible = false">{{ $t('cancel') }}</k-button>
              <k-button type="main" @click="addDescription(headerSlotProps.column)">{{ $t('confirm') }}</k-button>
            </div>
          </div>
        </k-dialog>
        <div class="k-table-column__operate">
          <span v-if="colDesc" class="k-table-column__tooltip">
            <k-popover
              trigger="click"
              :content="colDesc"
              placement="top"
            >
              <template #reference>
                <i><IconTips /></i>
              </template>
            </k-popover>
          </span>
          <span
            v-if="props.sortable"
            class="k-table-column__sort"
            @click="changeSortStatus($event,headerSlotProps.column)"
          >
            <i
              id="_asc-icon"
              class="vxe-icon-caret-up"
              :style="{ color: headerSlotProps.column.order == 'asc' ? '#2882FF' : '' }"
            ></i>
            <i
              id="_desc-icon"
              class="vxe-icon-caret-down"
              :style="{ color: headerSlotProps.column.order == 'desc' ? '#2882FF' : '' }"
            ></i>
          </span>
          <span v-if="showColumnMenu" class="k-table-column__more">
            <k-popover
              trigger="click"
              :show-arrow="false"
              placement="bottom-start"
              popper-class="more-box"
              :offset="2"
              width="160px"
            >
              <template #reference>
                <i><IconMore /></i>
              </template>
              <ul class="more-menu">
                <li class="more-menu-item">
                  <k-popover
                    trigger="hover"
                    :show-arrow="false"
                    placement="right-start"
                    popper-class="filter-box"
                    :offset="2"
                    :disabled="!props.filters"
                    :teleported="false"
                    @show="updateCheckboxData"
                  >
                    <template #reference>
                      <div class="filter-select-item" :class="{'disabled': !props.filters}">
                        <IconFilter class="menu-item-icon" />
                        {{ $t('filter') }}
                      </div>
                    </template>
                    <slot name="filter">
                      <ul class="filter-menu">
                        <li class="filter-menu-item">
                          <k-checkbox
                            v-model="isSelectAll"
                            :label="$t('all')"
                            value="all"
                            :indeterminate="isIndeterminate"
                            @change="selectAll"
                          />
                        </li>
                        <li
                          v-for="item, index in props.filters"
                          :key="index"
                          class="filter-menu-item"
                        >
                          <k-checkbox
                            v-model="item.checked"
                            :label="item.label"
                            :value="item.value"
                            @change="updateCheckboxData"
                          />
                        </li>
                      </ul>
                    </slot>
                    <div class="filter-buttons">
                      <k-button size="sm" @click="clearFilter(headerSlotProps.column)">{{ $t('reset') }}</k-button>
                      <k-button
                        class="filter-btn-item"
                        size="sm"
                        type="secondary"
                        @click="setFilter(headerSlotProps.column.field, props.filters)"
                      >{{ $t('filter') }}</k-button>
                    </div>
                  </k-popover>
                </li>
                <li class="more-menu-item">
                  <k-popover
                    trigger="hover"
                    :show-arrow="false"
                    placement="right-start"
                    popper-class="more-box"
                    :offset="2"
                    :disabled="!props.sortable"
                    :teleported="false"
                  >
                    <template #reference>
                      <div class="sort-select-item" :class="{'disabled': !props.sortable}">
                        <IconTableSortNormalColor class="menu-item-icon" />
                        {{ $t('sort') }}
                        <IconArrowRight class="sort-arrow-right" />
                      </div>
                    </template>
                    <ul class="sort-menu">
                      <li class="sort-menu-item" @click="tableSort(headerSlotProps.column, 'asc')">
                        <IconTableSortUpColor />
                        {{ $t('ascendingOrder') }}
                      </li>
                      <li class="sort-menu-item" @click="tableSort(headerSlotProps.column, 'desc')">
                        <IconTableSortDownColor />
                        {{ $t('descendingOrder') }}
                      </li>
                      <li class="sort-menu-item" @click="clearSort(headerSlotProps.column)">
                        <IconClearDate />
                        {{ $t('clearSorting') }}
                      </li>
                    </ul>
                  </k-popover>
                </li>
                <li class="more-menu-item" @click="expandColumn(true)">
                  <IconFold class="menu-item-icon" />
                  {{ $t('retract') }}
                </li>
                <li class="more-menu-item" @click="hideColumn(headerSlotProps.column)">
                  <IconHide class="menu-item-icon" />
                  {{ $t('hide') }}
                </li>
                <li class="more-menu-item" @click="() => dialogVisible = true">
                  <IconEdit class="menu-item-icon" />
                  {{ $t('customDescription') }}
                </li>
              </ul>
            </k-popover>
          </span>
        </div>
      </div>
      <div v-else>
        <IconUnfold
          :style="{
            width: '20px',
            cursor: 'pointer'
          }"
          class="expand-icon"
          @click="expandColumn(false)"
        />
      </div>
    </template>
    <!-- 自定义插槽 -->
    <template v-if="isExpandColumn" #default>
      <span>-</span>
    </template>
    <template v-else-if="slots.default && !isExpandColumn" #default="defaultSlotProps">
      <slot v-bind="defaultSlotProps"></slot>
    </template>
    <template v-if="slots.footer" #footer="footerSlotProps">
      <slot name="footer" v-bind="footerSlotProps"></slot>
    </template>
    <template v-if="slots.radio" #radio="radioSlotProps">
      <slot name="radio" v-bind="radioSlotProps"></slot>
    </template>
    <template v-if="slots.checkbox" #checkbox="checkboxSlotProps">
      <slot name="checkbox" v-bind="checkboxSlotProps"></slot>
    </template>
    <template v-if="slots.title" #title="titleSlotProps">
      <slot name="title" v-bind="titleSlotProps"></slot>
    </template>
    <template v-if="slots.edit" #edit="editSlotProps">
      <slot name="edit" v-bind="editSlotProps"></slot>
    </template>
    <template v-if="slots.valid" #valid="validSlotProps">
      <slot name="valid" v-bind="validSlotProps"></slot>
    </template>
    <template v-if="slots.content" #content="contentSlotProps">
      <slot name="content" v-bind="contentSlotProps"></slot>
    </template>
  </vxe-column>
</template>

<script setup lang="ts">
import { inject, ref, watch, getCurrentInstance } from 'vue';
import { VxeColumnProps } from 'vxe-table';
import {
  IconTips,
  IconMore,
  IconFilter,
  IconHide,
  IconFold,
  IconUnfold,
  IconArrowRight,
  IconTableSortNormalColor,
  IconTableSortDownColor,
  IconTableSortUpColor,
  IconEdit,
  IconClearDate
} from 'ksw-vue-icon';
import { KPopover } from '../popover';
import { KDialog } from '../dialog';
import { KInput } from '../input';
import { KButton } from '../button';
import { KCheckbox } from '../checkbox';
import { TableColumnProps } from './type.d';

defineOptions({
  name: 'KTableColumn'
});

const tableInstance:any = inject('tableInstance');
const pid = inject('tableId');
const props = withDefaults(defineProps<TableColumnProps>(), {
  showColumnMenu: true
});
const slots = defineSlots();

const isExpandColumn = ref(false);
const columnWidth = ref(props.width);
const colDesc = ref('');
const dialogVisible = ref(false);
const textareaContent = ref('');
const isSelectAll = ref(false);
const isIndeterminate = ref(false);
const emitter = getCurrentInstance()?.appContext.app.config.globalProperties.__emitter__;

watch(() => props.desc, (newValue) => {
  if (!newValue) {
    return;
  }
  colDesc.value = newValue;
}, { immediate: true });
// 排序
function changeSortStatus(e:any, column:any) {
  const id = e.target?.id;
  const order = column.order;
  let op:any = null;
  if (id === '_asc-icon' && order !== 'asc') {
    op = 'asc';
  } else if (id === '_desc-icon' && order !== 'desc') {
    op = 'desc';
  }
  tableSort(column, op);
}
function tableSort(column:VxeColumnProps, order:string) {
  tableInstance.value?.sort({
    field: column.field,
    order
  });
}
function clearSort(column: string | VxeColumnProps) {
  tableInstance.value?.clearSort(column);
}
// 展开/收起
function expandColumn(isExpand:boolean) {
  isExpandColumn.value = isExpand;
  if (isExpand) {
    columnWidth.value = '40';
  } else {
    columnWidth.value = props.width;
  }
}
// 自定义说明
function openDialog() {
  textareaContent.value = colDesc.value ?? '';
}
function addDescription(column:VxeColumnProps) {
  colDesc.value = textareaContent.value;
  dialogVisible.value = false;
  (emitter as any)?.emit('desc-change', pid, column, colDesc.value);
}
// 列隐藏
function hideColumn(column) {
  emitter?.emit('hide-column', pid, column);
}
// 筛选表格数据
function selectAll() {
  if (isSelectAll.value && isIndeterminate.value) {
    isIndeterminate.value = false;
  }
  props.filters?.forEach(item => {
    item.checked = isSelectAll.value;
  });
}
function updateCheckboxData() {
  if (!Array.isArray(props.filters)) {
    isSelectAll.value = false;
    return;
  }
  isSelectAll.value = props.filters?.every(item => item.checked);
  const hasChecked = props.filters?.some(item => item.checked);
  if (!isSelectAll.value && hasChecked) {
    isIndeterminate.value = true;
  } else {
    isIndeterminate.value = false;
  }
}
async function setFilter(column: string | VxeColumnProps, options: any) {
  await tableInstance.value.setFilter(column, options);
  tableInstance.value.updateData();
}
async function clearFilter(column: string | VxeColumnProps) {
  await tableInstance.value.clearFilter(column);
  props.filters?.forEach(item => {
    item.checked = false;
  });
  isIndeterminate.value = false;
  isSelectAll.value = false;
}
</script>

<style lang="less">
@import './style.less';
.more-box, .sort-box {
  padding: 0 !important;
  .more-menu, .sort-menu {
    width: 100%;
    padding: 0 !important;
    margin-top: 0;
    .more-menu-item, .sort-menu-item {
      list-style: none;
      padding-left: 10px;
      padding: 8px 0 8px 8px;
      cursor: pointer;
      &:hover {
        background-color: #F5F5F5;
      }
      .more-menu-icon {
        margin-right: 5px;
      }
    }
    .more-menu-item:nth-child(2), &:nth-child(4) {
        border-bottom: 1px #F5F5F5 solid
      }
    .sort-select-item {
      position: relative;
      .sort-arrow-right {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
      }
    }
  }
}
.filter-box {
  padding: 0 !important;
  .filter-menu {
    width: 100%;
    padding: 0 !important;
    margin-top: 0;
    .filter-menu-item {
      list-style: none;
      padding-left: 10px;
      cursor: pointer;
      &:hover {
        background-color: #F5F5F5;
      }
    }
  }
  .filter-buttons {
      display: flex;
      justify-content: flex-start;
      padding: 10px 0 10px 10px;
      border-top: 1px #F5F5F5 solid;
      .filter-btn-item {
        margin-left: 10px;
      }
    }
}
</style>