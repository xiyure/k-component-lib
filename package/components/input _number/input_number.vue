<template>
  <el-input-number
    ref="inputNumberRef"
    :class="['k-input-number', _styleModule]"
    v-bind="$attrs"
    :size="getCompSize(props.size ?? injectSize)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-input-number>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ElInputNumber } from 'element-plus';
import { InputNumberProps } from './type';
import { getCompSize, getExposeProxy } from '../../utils';

defineOptions({
  name: 'KInputNumber',
});

const props = withDefaults(defineProps<InputNumberProps>(), {});

const _styleModule = inject('_styleModule', '');
const inputNumberRef = ref<HTMLElement | null>(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, inputNumberRef));

const injectSize = inject(
  '__size__',
  computed(() => 'base'),
);

console.log(injectSize.value, getCompSize(injectSize.value));
</script>

<style lang="less">
@import './style.less';
</style>
