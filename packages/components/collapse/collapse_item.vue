<template>
  <el-collapse-item
    ref="kCollapseItemRef"
    :class="[
      'k-collapse-item',
      { 'is-block': injectIsBlock },
      {
        'is-process': process,
        'is-wait': wait,
        'is-finish': finish,
        'is-error': error,
        'is-warning': warning,
      },
    ]"
    v-bind="$attrs"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-collapse-item>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ElCollapseItem } from 'element-plus';
import { getExposeProxy } from '../../utils';
import { CollapseItemProps } from './type';

defineOptions({
  name: 'KCollapseItem'
});

const props = withDefaults(defineProps<CollapseItemProps>(), {
  block: false,
  process: false,
  wait: false,
  finish: false,
  error: false,
  warning: false
});

const injectIsBlock = inject(
  '__isBlock__',
  computed(() => props.block)
);

const kCollapseItemRef = ref(null);
const instance: any = {};
defineExpose(getExposeProxy(instance, kCollapseItemRef));
</script>

<style lang="less">
@import './style.less';
</style>
