<template>
  <div
    class="k-tour"
    :class="{'hidden-line': isHideLine}"
  >
    <el-timeline>
      <slot></slot>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ITimelineProps } from '../../interface/index';

defineOptions({
  name: 'KTour'
});

const props = withDefaults(defineProps<ITimelineProps>(), {
  showLine: true
});

const isHideLine = computed(() => !props.showLine);
</script>

<style lang="less">
@import './style.less';
</style>