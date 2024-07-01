<template>
  <el-input ref="inputRef" class="k-input" v-bind="$attrs" :size="getCompSize(props.size)">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { InputProps } from './type.d';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KInput'
});

const props = withDefaults(defineProps<InputProps>(), {
  size: 'base',
  iconLeft: ''
});

onMounted(() => {
  // console.log(props.iconLeft);
});

const inputRef = ref<any>(null);

const focus = () => {
  inputRef.value?.focus();
};
const blur = () => {
  inputRef.value?.blur();
};
const select = () => {
  inputRef.value?.select();
};
const clear = () => {
  inputRef.value?.clear();
};
const resizeTextarea = () => {
  inputRef.value?.resizeTextarea();
};
defineExpose({
  focus,
  blur,
  select,
  clear,
  resizeTextarea
});
</script>

<style lang="less">
@import './style.less';
</style>