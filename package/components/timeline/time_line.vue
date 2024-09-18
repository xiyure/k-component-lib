<template>
  <div
    ref="KTimelineRef"
    :class="['k-timeline', _styleModule, {'hidden-line': isHideLine}]"
  >
    <el-timeline>
      <slot></slot>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { ElTimeline } from 'element-plus';
import { TimelineProps } from './type';
import { handleExpose } from '../../utils';

defineOptions({
  name: 'KTimeline'
});

const props = withDefaults(defineProps<TimelineProps>(), {
  showLine: true
});

const _styleModule = inject('_styleModule', '');
const isHideLine = computed(() => !props.showLine);

const KTimelineRef = ref(null);
const instance: any = {};
handleExpose(instance, KTimelineRef, 'KTimeline');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>