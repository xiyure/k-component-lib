<template>
  <el-option
    class="k-option"
    v-bind="attrs"
  >
    <slot></slot>
  </el-option>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { OptionProps } from './type';

defineOptions({
  name: 'KOption'
});

const props = withDefaults(defineProps<OptionProps>(), {});

const attrs = computed(() => ({
  value: props.value,
  label: props.label,
  disabled: props.disabled
}));
</script>

<style lang="less">
@import './style.less';
</style>