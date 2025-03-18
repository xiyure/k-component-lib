<template>
  <div :class="[{ 'k-collapse-outline': isOutline }]">
    <el-collapse
      ref="kCollapseRef"
      :class="[
        'k-collapse',
        { 'is-useAntStyle': useAntStyle, 'is-useStepStyle': useStepStyle },
      ]"
      v-bind="$attrs"
    >
      <template v-for="(_, name) in $slots" :key="name" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed } from 'vue';
import { ElCollapse } from 'element-plus';
import { getExposeProxy } from '../../utils/index';

defineOptions({
  name: 'KCollapse'
});

const props = defineProps({
  block: {
    type: Boolean,
    default: false
  },
  isOutline: {
    type: Boolean,
    default: false
  },
  useAntStyle: {
    type: Boolean,
    default: false
  },
  useStepStyle: {
    type: Boolean,
    default: false
  }
});

provide(
  '__isBlock__',
  computed(() => props.block)
);

const kCollapseRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, kCollapseRef));
</script>

<style lang="less">
@import './style.less';
</style>
