<template>
  <el-input-number
    ref="inputNumberRef"
    :class="['k-input-number', _styleModule]"
    v-bind="$attrs"
    :size="getCompSize(props.size)"
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
import { getCompSize, handleExpose } from '../../utils';

defineOptions({
  name: 'KInputNumber'
});

const props = withDefaults(defineProps<InputNumberProps>(), {});

const _styleModule = inject('_styleModule', '');
const inputNumberRef = ref<HTMLElement | null>(null);

const instance: any = {};
handleExpose(instance, inputNumberRef, 'KInputNumber');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>