<template>
  <el-select
    ref="inputRef" class="k-select" v-bind="$attrs"
    :size="getCompSize(props.size)"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SelectInputProps } from './type';
import { getCompSize, handleExpose } from '../../utils';

defineOptions({
  name: 'KSelect',
});

const props = withDefaults(defineProps<SelectInputProps>(), {
  size: 'base',
});

const inputRef = ref<any>(null);
const instance: any = {};
handleExpose(instance, inputRef, 'KSelect');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
