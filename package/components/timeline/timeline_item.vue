<template>
  <el-timeline-item
    v-bind="attrs"
    :id="id"
    class="k-timeline__item"
    :class="{'show-right': showRight}"
  >
    <slot></slot>
    <template v-if="slots.dot">
      <slot name="dot"></slot>
    </template>
  </el-timeline-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ITimelineItemProps } from '../../interface/index';
import { genRandomStr } from '../../utils';

defineOptions({
  name: 'KTimelineItem'
});

const props = withDefaults(defineProps<ITimelineItemProps>(), {
  timestamp: '',
  placement: 'top',
  type: 'wait',
  size: 'normal'
});
const slots = defineSlots();

const id = genRandomStr(8);

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