<template>
  <div class="k-badge">
    <el-badge v-bind="attrs">
      <slot></slot>
    </el-badge>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IBadgeProps } from '../../interface/index';

defineOptions({
  name: 'KBadge'
});

const props = withDefaults(defineProps<IBadgeProps>(), {
  value: '',
  max: 99,
  showZero: true
});

const attrs = computed(() => ({
  value: props.value,
  max: props.max,
  isDot: props.isDot,
  hidden: props.hidden,
  color: props.color,
  showZero: props.showZero,
  offset: props.offset,
  badgeStyle: props.badgeStyle,
  badgeClass: props.badgeClass
}));
</script>

<style lang="less">
@import './style.less';
</style>