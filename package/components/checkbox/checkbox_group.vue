<template>
  <el-checkbox-group class="k-checkbox-group" v-bind="$attrs" :size="getCompSize(size)">
    <slot></slot>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue';
import { CheckboxGroupProps } from './type';
import { getCompSize } from '../../utils/index';

defineOptions({
  name: 'KCheckboxGroup',
});

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  color: '#409eff',
});

const fillColor = ref(props.color);

watch(
  () => props.color,
  (newValue) => {
    fillColor.value = newValue;
  },
);

provide('useCheckboxGroup', true);
provide('_fillColor', fillColor);
</script>

<style lang="less">
@import './style.less';
</style>
