<template>
  <vxe-column
    v-bind="$attrs"
    :edit-render="editRender"
    :filters="filters"
    :sortable="sortable"
    :type="type"
    :field="field"
    class="k-table-column"
  >
    <template v-if="!type" #header="headerSlotProps">
      <div v-if="!isExpandColumn" class="k-table-column__header">
        <div class="k-table-column__title">
          <slot name="header" v-bind="headerSlotProps">
            <!-- 列标题 -->
            <i
              v-if="tableInstance.editConfig
                && tableInstance.editConfig.showIcon !== false
                && editRender
              "
              class="k-table-column__edit vxe-table-icon-edit"
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
              <k-button main @click="addDescription(headerSlotProps.column)">{{ $t('confirm') }}</k-button>
            </div>
          </div>
        </k-dialog>
        <!-- 排序、筛选等操作区域 -->
        <div class="k-table-column__operate">
          <span v-if="colDesc" class="k-table-column__tooltip">
            <k-tooltip
              trigger="click"
              :content="colDesc"
              placement="top"
            >
              <template #reference>
                <i><IconTips /></i>
              </template>
            </k-tooltip>
          </span>
          <span
            v-if="props.sortable && sortConfig?.showIcon !== false"
            :class="[
              'k-table-column__sort',
              sortConfig.iconLayout === 'horizontal' ? 'sort-icon__horizontal' : 'sort-icon__vertical'
            ]"
          >
            <component
              :is="sortConfig.iconAsc"
              v-if="sortConfig.iconAsc"
              :style="{
                color: headerSlotProps.column.order == 'asc' ? '#2882FF' : '' ,
                fontSize: '15px'
              }"
              @click="changeSortStatus('_asc-icon', headerSlotProps.column)"
            ></component>
            <i
              v-else
              class="vxe-table-icon-caret-up icon-asc"
              :style="{ color: headerSlotProps.column.order == 'asc' ? '#2882FF' : '' }"
              @click="changeSortStatus('_asc-icon', headerSlotProps.column)"
            ></i>
            <component
              :is="sortConfig.iconDesc"
              v-if="sortConfig.iconDesc"
              :style="{
                color: headerSlotProps.column.order == 'desc' ? '#2882FF' : '' ,
                fontSize: '15px'
              }"
              @click="changeSortStatus('_desc-icon', headerSlotProps.column)"
            ></component>
            <i
              v-else
              class="vxe-table-icon-caret-down icon-desc"
              :style="{ color: headerSlotProps.column.order == 'desc' ? '#2882FF' : '' }"
              @click="changeSortStatus('_desc-icon', headerSlotProps.column)"
            ></i>
          </span>
          <filter-popper
            :filters="props.filters"
            :column="headerSlotProps.column"
            trigger="click"
            :text="filterButtonText"
            @set-filter="setFilter"
            @clear-filter="clearFilter"
            @filter-change="filterChange"
            @filter-visible="filterVisible"
          >
            <span
              v-show="props.filters && filterConfig?.showIcon !== false"
              class="k-table-column__filter"
              @click="() => filterPanelVisible = !filterPanelVisible"
            >
              <component :is="filterConfig.iconNone" v-if="filterConfig.iconNone && !isFilterActive"></component>
              <component :is="filterConfig.iconMatch" v-else-if="filterConfig.iconMatch && isFilterActive"></component>
              <IconFilterFill v-else-if="isFilterActive" :size="16" color="#2882FF" />
              <IconFilter v-else :size="16" />
            </span>
            <template v-if="$slots.filter">
              <slot
                name="filter"
                :column="headerSlotProps.column"
                :set-filter="setFilter"
                :clear-filter="clearFilter"
              >
              </slot>
            </template>
          </filter-popper>
          <!-- 列头菜单栏 -->
          <span v-if="isShowColumnMenu" class="k-table-column__more">
            <k-popover
              ref="popoverRef"
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
                  <filter-popper
                    :filters="props.filters"
                    :column="headerSlotProps.column"
                    :text="filterButtonText"
                    @set-filter="setFilter"
                    @clear-filter="clearFilter"
                    @filter-change="filterChange"
                    @filter-visible="filterVisible"
                  >
                    <div class="filter-select-item" :class="{'disabled': !props.filters}">
                      <IconFilter class="menu-item-icon" />
                      {{ $t('filter') }}
                    </div>
                    <template v-if="$slots.filter">
                      <slot
                        name="filter"
                        :column="headerSlotProps.column"
                        :set-filter="setFilter"
                        :clear-filter="clearFilter"
                      >
                      </slot>
                    </template>
                  </filter-popper>
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
                <li v-if="showTransfer" class="more-menu-item" @click="hideColumn(headerSlotProps.column)">
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
import { inject, ref, watch, computed, ComputedRef } from 'vue';
import { VxeColumnProps } from 'vxe-table';
import {
  IconTips,
  IconMore,
  IconFilter,
  IconFilterFill,
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
import FilterPopper from './filter_popper.vue';
import { KPopover } from '../popover';
import { KDialog } from '../dialog';
import { KInput } from '../input';
import { KButton } from '../button';
import { KTooltip } from '../tooltip';
import { TableColumnProps } from './type.d';

defineOptions({
  name: 'KTableColumn'
});

const tableInstance:any = inject('tableInstance');
const showTransfer = inject<ComputedRef>('__showTransfer', computed(() => false));
const pid = inject('tableId');
const filterPanelConfig: any = inject('filterPanelConfig');
const showColumnMenuParent = inject('showColumnMenu', false);
const props = withDefaults(defineProps<TableColumnProps>(), {
  showColumnMenu: undefined
});
const slots = defineSlots();

const popoverRef = ref();
const isExpandColumn = ref(false);
const oldWidth = ref<number | string>('');
const colDesc = ref('');
const dialogVisible = ref(false);
const textareaContent = ref('');
const filterPanelVisible = ref(false);
const emitter = inject('_emitter') as any;

watch(() => props.desc, (newValue) => {
  if (!newValue) {
    return;
  }
  colDesc.value = newValue;
}, { immediate: true });

watch(() => filterPanelConfig.value, () => {
  const { field, isOpen } = filterPanelConfig.value;
  if (props.field !== field) {
    return;
  }
  if (isOpen === true) {
    filterPanelVisible.value = true;
  } else if (isOpen === false) {
    filterPanelVisible.value = false;
  }
}, { deep: true });

const isShowColumnMenu = computed(() => props.showColumnMenu ?? showColumnMenuParent);
const isFilterActive = computed(() => tableInstance.value?.isFilter(props.field));
const filterConfig = computed(() => tableInstance.value.filterConfig ?? {});
const filterButtonText = computed(() => {
  const { confirmButtonText, resetButtonText } = filterConfig.value;
  return {
    confirmButtonText,
    resetButtonText
  };  
});
const sortConfig = computed(() => tableInstance.value.sortConfig ?? {});
// 排序
function changeSortStatus(id: string, column:any) {
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
  emitter.emit('sort-change', pid, { column, field: column.field, order });
}
function clearSort(column: string | VxeColumnProps) {
  tableInstance.value?.clearSort(column);
  emitter.emit('clear-sort', pid);
}
// 展开/收起
function expandColumn(isExpand:boolean) {
  isExpandColumn.value = isExpand;
  let newWidth: number | string = '';
  if (isExpand) {
    oldWidth.value = tableInstance.value.getColumnWidth(props.field);
    newWidth = '40';
  } else {
    newWidth = oldWidth.value;
  }
  tableInstance.value.setColumnWidth(props.field, newWidth);
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
function hideColumn(column: VxeColumnProps) {
  emitter?.emit('hide-column', pid, column);
  popoverRef.value?.hide();
}
// 筛选表格数据
async function setFilter(column: string | VxeColumnProps, options: any) {
  await tableInstance.value.setFilter(column, options);
  tableInstance.value.updateData();
}
// 事件处理
async function clearFilter(column: string | VxeColumnProps) {
  await tableInstance.value.clearFilter(column);
  emitter?.emit('clear-filter', pid, { filterList: props.filters });
}
function filterChange(column: VxeColumnProps, field: string, filterList: any[]) {
  emitter.emit('filter-change', pid, { column, field, filterList });
}
function filterVisible(column: VxeColumnProps, field: string, visible: boolean, filterList: any[]) {
  emitter.emit('filter-visible', pid, { column, field, visible, filterList });
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