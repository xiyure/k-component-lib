<template>
  <div
    ref="KTimelineRef"
    :class="['k-timeline', {'hidden-line': isHideLine}]"
  >
    <el-timeline>
      <slot></slot>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElTimeline } from 'element-plus';
import { TimelineProps } from './type';
import { getExposeProxy } from '../../utils';

defineOptions({
  name: 'KTimeline'
});

const props = withDefaults(defineProps<TimelineProps>(), {
  showLine: true
});

const isHideLine = computed(() => !props.showLine);

const KTimelineRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KTimelineRef));
</script>

<style lang="less">
@import './style.less';
</style>