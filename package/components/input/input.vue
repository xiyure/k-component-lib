<template>
  <el-input ref="inputRef" class="k-input" v-bind="$attrs" :prefix-icon="iconLeft ?? prefixIcon" :suffix-icon="iconRight ?? suffixIcon" :size="getCompSize(props.size)">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-input>
</template>

<!-- :suffix-icon="iconLeft ?? suffixIcon"  -->

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { InputProps } from './type.d';
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KInput'
});

const props = withDefaults(defineProps<InputProps>(), {
  size: 'base',
  iconLeft: undefined,
  iconRight: undefined
});

onMounted(() => {
  console.log('iconLeft', props.iconLeft);
  console.log('iconRight', props.iconRight);
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