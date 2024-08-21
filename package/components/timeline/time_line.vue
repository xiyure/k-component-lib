<template>
  <div
    ref="KTimelineRef"
    class="k-timeline"
    :class="{'hidden-line': isHideLine}"
  >
    <el-timeline>
      <slot></slot>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { TimelineProps } from './type';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KTimeline'
});

const props = withDefaults(defineProps<TimelineProps>(), {
  showLine: true
});

const isHideLine = computed(() => !props.showLine);

const KTimelineRef = ref(null);
const instance: any = {};
handleExpose(instance, KTimelineRef, 'KTimeline');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>