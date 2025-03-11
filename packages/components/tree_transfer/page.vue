<template>
  <div v-if="visible" class="pagination-box bg-white pt-3">
    <k-pagination
      v-bind="pageConfig"
      :total="dataLength"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"
      @change="pageChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineOptions({
  name: 'Pagination',
})
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  position: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  },
  emits: {
    type: Function,
    default: () => {}
  },
  dataLength: {
    type: Number
  },
  pageConfig: {
    type: Object,
    default: () => ({})
  },
  resetCheckboxStatus: {
    type: Function,
    default: () => {}
  }
});

// current page or page size change
function pageChange(pageNum: number, pageSize: number) {
  if (props.position === 'left') {
    props.resetCheckboxStatus?.();
  }
  if (props.pageConfig.isRemotePaging) {
    props.emits('server-paging', { ...props.pageConfig, position: props.position });
  }
  props.emits('page-change', pageNum, pageSize, props.position);
}

// current page change
function changeCurrentPage(pageNum: number) {
  props.pageConfig.currentPage = pageNum;
  props.emits('page-current-change', pageNum, props.position);
}

// page size change
function changePageSize(pageSize: number) {
  props.pageConfig.pageSize = pageSize;
  props.emits('page-size-change', pageSize, props.position);
}

// prev click
function prevClick(pageNum: number) {
  props.emits('page-prev-click', pageNum, props.position);
}

// next click
function nextClick(pageNum: number) {
  props.emits('page-next-click', pageNum, props.position);
}
</script>
