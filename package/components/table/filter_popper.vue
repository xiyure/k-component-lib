<template>
  <k-popover
    :trigger="trigger"
    :show-arrow="false"
    placement="right-start"
    popper-class="filter-box"
    :offset="2"
    :disabled="!props.filters"
    :teleported="true"
    :visible="visible"
    @show="updateCheckboxData"
  >
    <template #reference>
      <slot></slot>
    </template>
    <slot name="filter">
      <ul class="filter-menu">
        <li class="filter-menu-item">
          <k-checkbox
            v-model="isSelectAll" :label="$t('all')" value="all" :indeterminate="isIndeterminate"
            @change="selectAll"
          />
        </li>
        <li v-for="item, index in props.filters" :key="index" class="filter-menu-item">
          <k-checkbox
            v-model="item.checked" :label="item.label" :value="item.value"
            @change="updateCheckboxData"
          />
        </li>
      </ul>
    </slot>
    <div class="filter-buttons">
      <k-button size="sm" @click="clearFilter">{{ text.resetButtonText ?? $t('reset') }}</k-button>
      <k-button
        class="filter-btn-item" size="sm" secondary
        @click="setFilter"
      >
        {{ text.confirmButtonText ?? $t('filter') }}
      </k-button>
    </div>
  </k-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { KPopover } from '../popover';
import { KCheckbox } from '../checkbox';
import { KButton } from '../button';

const props = defineProps({
  filters: {
    type: Array,
    default: () => []
  },
  column: {
    type: Object,
    default: () => {}
  },
  trigger: {
    type: String,
    default: () => 'hover'
  },
  visible: {
    type: Boolean,
    default: undefined
  },
  text: {
    type: Object,
    default: () => {}
  }
});

const emits = defineEmits(['set-filter', 'clear-filter']);

const isSelectAll = ref(false);
const isIndeterminate = ref(false);

function updateCheckboxData() {
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
}
function setFilter() {
  emits('set-filter', props.column, props.filters);
}
function clearFilter() {
  props.filters?.forEach((item: any) => {
    item.checked = false;
  });
  isIndeterminate.value = false;
  isSelectAll.value = false;
  emits('clear-filter', props.column);
}
</script>