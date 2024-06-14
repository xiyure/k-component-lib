<template>
  <el-timeline-item
    v-bind="$attrs"
    :id="id"
    :type="getTimelineType(type)"
    :placement="placement === 'right' ? 'top' : placement"
    :hollow="hollow"
    :color="color"
    class="k-timeline__item"
    :class="{
      'is-show-right': showRight,
      'is-hollow': props.hollow
    }"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
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

const id = genRandomStr(8);
let rootNode:HTMLElement | null;
let timelineNode:HTMLElement | null;

onMounted(() => {
  rootNode = document.getElementById(id);
  timelineNode = rootNode?.querySelector('.el-timeline-item__node') || null;
});

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