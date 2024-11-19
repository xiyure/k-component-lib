<template>
  <el-input-number
    ref="inputNumberRef"
    :class="['k-input-number', _styleModule]"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-input-number>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { ElInputNumber } from 'element-plus';
import { InputNumberProps } from './type';
import { getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KInputNumber'
});

const props = withDefaults(defineProps<InputNumberProps>(), {});

const formatSize = useSize<InputNumberProps>(props);

const _styleModule = inject('_styleModule', '');
const inputNumberRef = ref<HTMLElement | null>(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, inputNumberRef));
</script>

<style lang="less">
@import './style.less';
</style>
