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
import { getExposeProxy } from '../../utils';
import { CollapseProps } from './type'

defineOptions({
  name: 'KCollapse'
});

const props = withDefaults(defineProps<CollapseProps>(), {
  block: false,
  isOutline: false,
  useAntStyle: false,
  useStepStyle: false
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
