<template>
  <k-popover
    ref="filterPopper"
    :trigger="trigger"
    :show-arrow="false"
    placement="right-start"
    popper-class="filter-box"
    :offset="2"
    :disabled="!props.filters?.length"
    :teleported="true"
    :visible="visible"
    @show="showPopover"
  >
    <template #reference>
      <slot></slot>
    </template>
    <slot name="filter">
      <ul class="filter-menu">
        <li class="filter-menu-item">
          <k-checkbox
            v-model="isSelectAll" :label="t?.('all')" value="all" :indeterminate="isIndeterminate"
            @change="selectAll"
          />
        </li>
        <li v-for="item, index in props.filters" :key="index" class="filter-menu-item">
          <k-checkbox
            v-model="item.checked" :label="item.label" :value="item.value"
            @change="updateCheckboxData(true)"
          />
        </li>
      </ul>
    </slot>
    <div class="filter-buttons">
      <k-button size="sm" @click="clearFilter">{{ text.resetButtonText ?? t?.('reset') }}</k-button>
      <k-button
        class="filter-btn-item" size="sm" secondary
        @click="setFilter"
      >
        {{ text.confirmButtonText ?? t?.('filter') }}
      </k-button>
    </div>
  </k-popover>
</template>

<script lang="ts" setup>
import { ref, inject } from 'vue';
import { KPopover } from '../popover';
import { KCheckbox } from '../checkbox';
import { KButton } from '../button';
import { FilterPopperProps } from './type';
import { VueI18nTranslation } from 'vue-i18n';

const props = withDefaults(defineProps<FilterPopperProps>(), {
  filters: () => [],
  column: () => ({}),
  trigger: 'hover',
  visible: undefined,
  text: () => ({})
});

const t = inject<VueI18nTranslation>('$t');

const emits = defineEmits(['set-filter', 'clear-filter', 'filter-change', 'filter-visible']);

const filterPopper = ref();
const isSelectAll = ref(false);
const isIndeterminate = ref(false);

function showPopover() {
  updateCheckboxData(false);
  emits('filter-visible', props.column, props.column?.field, true, props.filters);
}
function updateCheckboxData(isEmit: boolean) {
  if (isEmit) {
    emits('filter-change', props.column, props.column?.field, props.filters);
  }
  if (!Array.isArray(props.filters)) {
    isSelectAll.value = false;
    return;
  }
  isSelectAll.value = props.filters?.every((item: any) => item.checked);
  const hasChecked = props.filters?.some((item: any) => item.checked);
  if (!isSelectAll.value && hasChecked) {
    isIndeterminate.value = true;
  } else {
    isIndeterminate.value = false;
  }
}
// 筛选表格数据
function selectAll() {
  if (isSelectAll.value && isIndeterminate.value) {
    isIndeterminate.value = false;
  }
  props.filters?.forEach((item: any) => {
    item.checked = isSelectAll.value;
  });
  emits('filter-change', props.column, props.column?.field, props.filters);
}
function setFilter() {
  emits('set-filter', props.column, props.filters);
  closeFilterPanel();
}
function clearFilter() {
  props.filters?.forEach((item: any) => {
    item.checked = false;
  });
  isIndeterminate.value = false;
  isSelectAll.value = false;
  emits('clear-filter', props.column);
  closeFilterPanel();
}
function closeFilterPanel() {
  filterPopper.value?.hide();
}

defineExpose({ closeFilterPanel });
</script>