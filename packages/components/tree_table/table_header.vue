<template>
  <div v-if="simple && showSearchInput" class="k-tree-table__header-pure">
    <k-input
      v-model="searchStr"
      :suffix-icon="IconSearch"
      :placeholder="searchConfig.placeholder"
      clearable
      @change="inputChange"
    />
  </div>
  <div
    v-else-if="showHeaderTools && !simple"
    class="k-tree-table__header"
    :style="{
      justifyContent: showDescription ? 'space-between' : 'flex-end'
    }"
  >
    <div v-if="showDescription" class="k-table-info">
      <slot name="description" :total="dataLength" :condition-info="filterConfig.conditionInfo">
        <span v-if="showTotal">
          {{ t?.('table.total') }}
          {{ dataLength }}
          {{ t?.('table.data') }}
        </span>
        <span :title="filterConfig.text" class="condition-info">
          {{ filterConfig.text }}
        </span>
        <span
          v-if="filterConfig.conditionInfo?.conditionList?.length && filterRef?.[0]?.clearFilter"
          class="filter-reset"
          @click="
            () => {
              emits('filter-clear');
            }
          "
        >
          · {{ t?.('table.reset') }}
        </span>
      </slot>
    </div>
    <div class="k-table-func">
      <template v-for="widget in widgets" :key="widget.id">
        <template v-if="widget.slot && $slots[widget.slot]">
          <slot :name="widget.slot"></slot>
        </template>
        <template v-else-if="widget.id === 'search'">
          <k-input
            v-model="searchStr"
            :suffix-icon="IconSearch"
            :placeholder="searchConfig.placeholder"
            clearable
            @change="inputChange"
          />
        </template>
        <template v-else-if="widget.id === 'refresh'">
          <k-button
            v-ksw_tooltip="t?.('table.refresh')"
            @click="
              () => {
                emits('refresh');
              }
            "
          >
            <IconRefresh />
          </k-button>
        </template>
        <template v-else-if="widget.id === 'filter'">
          <!-- 高级筛选 -->
          <k-filter
            ref="filterRef"
            :data="filterConfig.data"
            :options="filterConfig.columns"
            children-field="group"
            filter-key="field"
            :remote="filterConfig?.remote ?? false"
            :ignore-case="filterConfig?.ignoreCase"
            :date-format="filterConfig?.dateFormat ?? 'YYYY-MM-DD HH:mm:ss'"
            :default-condition="filterConfig?.defaultCondition ?? filterConfig.conditionInfo"
            @confirm="(conditionInfo: ConditionInfo, data: any) => {
              emits('filter-confirm', conditionInfo, data);
            }"
            @clear="
              () => {
               emits('filter-clear');
              }
            "
            @show="() => {
              emits('filter-show');
            }"
            @hide="() => {
              emits('filter-hide');
            }"
          >
            <template #reference="{ hasConfigCondition }">
              <div v-ksw_tooltip="t?.('table.advancedFilter_c')">
                <component
                  :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
                  v-if="widget.widget"
                />
                <slot
                  v-else
                  :name="compatibleSlots($slots, ['filter-trigger', 'filterTrigger'])"
                  :is-filter="hasConfigCondition"
                >
                  <k-button>
                    <IconFilter v-if="!hasConfigCondition" />
                    <IconFilterFill v-else color="#2882FF" />
                  </k-button>
                </slot>
              </div>
            </template>
          </k-filter>
        </template>
        <template v-else-if="widget.id === 'card-switch'">
          <!-- 列表/卡片切换 -->
          <k-slider-button
            class="k-tree-table__slider-button"
            :default-active="currentMode"
            :style="sliderBtnStyle"
            :items="sliderBtnItems"
            @change="(mode) => {
              emits('update:current-mode', mode)
              emits('switch-change', mode);
            }"
          />
        </template>
        <template v-else-if="widget.id === 'size-control' && currentMode === 'list'">
          <!-- 表格尺寸控制 -->
          <k-dropdown
            trigger="click"
            @command="
              (command) => {
                emits('size-change', command);
              }
            "
          >
            <template #title>
              <div v-ksw_tooltip="t?.('table.sizeControlTrigger')" class="text-sm">
                <component
                  :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
                  v-if="widget.widget"
                />
                <slot
                  v-else
                  :name="compatibleSlots($slots, ['size-control-trigger', 'sizeControlTrigger'])"
                >
                  <k-button><IconSizeControls /></k-button>
                </slot>
              </div>
            </template>
            <k-dropdown-item
              v-for="item in SIZE_OPTIONS"
              :key="item.value"
              :style="{
                color: tableSize === (item.value || undefined) ? '#2882FF' : ''
              }"
              :command="item.value"
            >
              {{ item.label }}
            </k-dropdown-item>
          </k-dropdown>
        </template>
        <template v-else-if="widget.id === 'transfer' && currentMode === 'list'">
          <!-- 穿梭框 -->
          <k-popover
            trigger="click"
            width="auto"
            :teleported="false"
            @show="() => {
              emits('transfer-show');
            }"
            @hide="
              () => {
                emits('transfer-hide');
              }
            "
          >
            <template #reference>
              <div v-ksw_tooltip="t?.('table.columnHeaderController')" class="text-sm">
                <component
                  :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget"
                  v-if="widget.widget"
                />
                <slot
                  v-else
                  :name="compatibleSlots($slots, ['transfer-trigger', 'transferTrigger'])"
                >
                  <k-button><IconSetting /></k-button>
                </slot>
              </div>
            </template>
            <k-transfer
              ref="transferRef"
              v-model="transferConfig.selectData"
              :data="transferConfig.originData"
              :default-keys="transferConfig.defaultHeader"
              :format="{
                noChecked: ' ',
                hasChecked: ' '
              }"
              :titles="[t?.('table.unselected'), t?.('table.selected')]"
              :drag="true"
              @change="(...args: any[]) => {
                emits('transfer-change', ...args);
              }"
              @reset="(data: (string | number)[]) => {
                emits('transfer-change', data);
              }"
              @drag="(data: transferData[]) => {
                emits('transfer-drag', data);
              }"
            ></k-transfer>
          </k-popover>
        </template>
        <template v-else-if="widget.widget">
          <component :is="typeof widget.widget === 'function' ? widget.widget() : widget.widget" />
        </template>
      </template>
    </div>
  </div>
  <!-- head-extra -->
  <div v-if="$slots['header-extra']" class="k-tree-table__header-extra">
    <slot name="header-extra"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject, PropType, VNode } from 'vue';
import {
  IconSearch,
  IconRefresh,
  IconFilter,
  IconFilterFill,
  IconSizeControls,
  IconSetting
} from 'ksw-vue-icon';
import { KButton, KDropdown, KDropdownItem, KInput, KPopover, KTransfer, KSliderButton } from '..';
import { useLocale } from '../../hooks';
import { compatibleSlots } from '../../utils';
import { SIZE_OPTIONS, TABLE_SIZE_KEY } from './const';
import { TableMode, AdvancedFilterConfig, SearchConfig } from './type';
import { ConditionInfo } from '../filter/type';

defineOptions({
  name: 'TableHeader'
})

type Widget = {
  id: string
  slot?: string
  widget?: (() => VNode) | any;
};
type transferData = {
  label: string
  key: string
}
const tableSize = inject(TABLE_SIZE_KEY, computed(() => undefined));
const { t } = useLocale();
const props = defineProps({
  currentMode: String as PropType<TableMode>,
  simple: Boolean,
  showHeaderTools: Boolean,
  showSearchInput: Boolean,
  showDescription: Boolean,
  showTotal: Boolean,
  dataLength: Number,
  widgets: Array as PropType<Widget[]>,
  searchConfig: Object as any,
  filterConfig: Object as any,
  transferConfig: Object as any
});

const emits = defineEmits([
  'update:current-mode',
  'input-change',
  'filter-confirm',
  'filter-clear',
  'filter-show',
  'filter-hide',
  'transfer-show',
  'transfer-hide',
  'transfer-change',
  'transfer-drag',
  'size-change',
  'refresh',
  'switch-change'
]);

const sliderBtnItems = [
  { label: '卡片', name: 'card' },
  { label: '列表', name: 'list' }
];

const sliderBtnBaseStyle = {
  width: '80px',
}

const filterRef = ref();
const transferRef = ref();
const searchStr = ref('');

const sliderBtnStyle = computed(() => {
  if (tableSize.value === 'small' || tableSize.value ==='mini') {
    return { ...sliderBtnBaseStyle, height: '1.5rem', fontSize: '12px' }
  }
  return { ...sliderBtnBaseStyle, height: '2rem', fontSize: '14px' }
});

function inputChange(value: string) {
  emits('input-change', value);
}
function clearInput() {
  searchStr.value = '';
}

defineExpose({
  filterRef,
  transferRef,
  clearInput
});
</script>
