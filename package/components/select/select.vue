<template>
  <el-select
    ref="inputRef"
    class="k-select"
    v-bind="$attrs"
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
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KSelect'
});

const props = withDefaults(defineProps<SelectInputProps>(), {
  size: 'base'
});

const inputRef = ref<any>(null);

function focus() {
  inputRef.value?.focus();
}
function blur() {
  inputRef.value?.blur();
}

defineExpose({
  focus,
  blur
});
</script>

<style lang="less">
@import './style.less';
</style>