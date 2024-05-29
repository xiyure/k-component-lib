<template>
  <el-timeline-item
    v-bind="attrs"
    :id="id"
    class="k-timeline__item"
    :class="{
      'is-show-right': showRight,
      'is-hollow': props.hollow
    }"
  >
    <slot></slot>
    <template v-if="slots.dot">
      <slot name="dot"></slot>
    </template>
  </el-timeline-item>
</template>

<script setup lang="ts">
import { computed, onMounted, watch, nextTick } from 'vue';
import { TimelineItemProps } from './type';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KTimelineItem'
});

const props = withDefaults(defineProps<TimelineItemProps>(), {
  timestamp: '',
  placement: 'top',
  type: 'wait',
  size: 'normal'
});
const slots = defineSlots();

const id = genRandomStr(8);
let rootNode:HTMLElement | null;
let timelineNode:HTMLElement | null;

onMounted(() => {
  rootNode = document.getElementById(id);
  timelineNode = rootNode?.querySelector('.el-timeline-item__node') || null;
});

const attrs = computed(() => ({
  timestamp: props.timestamp,
  placement: props.placement === 'right' ? 'top' : props.placement,
  hideTimestamp: props.hideTimestamp,
  center: props.center,
  type: getTimelineType(props.type),
  color: props.color,
  icon: props.icon,
  hollow: props.hollow,
  size: props.size
}));

watch(() => props.color, (newValue) => {
  nextTick(() => {
    if (!timelineNode || !newValue || !props.hollow) {
      return;
    }
    timelineNode.style.borderColor = props.color || '';
  });
}, { immediate: true });

const showRight = computed(() => props.placement === 'right');

function getTimelineType(type: string) {
  if (type === 'wait') {
    return 'info';
  }
  if (type === 'error') {
    return 'danger';
  }
  return type;
}
</script>

<style lang="less">
@import './style.less';
</style>