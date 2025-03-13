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
    >
      <template #default>
        <slot :page-config="pageConfig">
          <k-input v-model="currentPage" style="width: 50px" @change="changePage"></k-input>
        </slot>
      </template>
    </k-pagination>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';

defineOptions({
  name: 'Pagination'
});
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
    type: Number,
    default: 0
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
  currentPage.value = pageNum;
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

const currentPage = ref(1);
const oldPage = ref(1);
const total = ref(props.dataLength);
const pageSize = ref(props.pageConfig.pageSize);
const maxPage = Math.ceil(total.value / pageSize.value);

function changePage() {
  const page = parseInt(currentPage.value, 10);
  if (!Number.isNaN(page)) {
    if (currentPage.value < 1) {
      currentPage.value = 1;
    } else if (currentPage.value > maxPage) {
      currentPage.value = maxPage;
    }
    console.log(currentPage.value);
    oldPage.value = currentPage.value;
    changeCurrentPage(parseInt(currentPage.value, 10));
  } else currentPage.value = oldPage.value;
}
</script>

<style lang="less">
.el-pagination__goto {
  display: none;
}
</style>
