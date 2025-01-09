<template>
  <el-collapse-item
    ref="kCollapseItemRef"
    :class="[
      'k-collapse-item',
      _styleModule,
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
import { getExposeProxy } from '../../utils/index';

defineOptions({
  name: 'KCollapseItem'
});

const props = defineProps({
  block: {
    type: Boolean
  },
  process: {
    type: Boolean
  },
  wait: {
    type: Boolean
  },
  finish: {
    type: Boolean
  },
  error: {
    type: Boolean
  },
  warning: {
    type: Boolean
  }
});

const _styleModule = inject('_styleModule', '');
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
