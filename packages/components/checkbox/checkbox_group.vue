<template>
  <el-checkbox-group
    ref="kCheckboxGroupRef"
    v-bind="$attrs"
  >
    <slot></slot>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { ref, watch, provide } from 'vue';
import { ElCheckboxGroup } from 'element-plus';
import { CheckboxGroupProps } from './type';
import { getExposeProxy } from '../../utils';
import { SIZE_KEY, useSize } from '../../hooks';

defineOptions({
  name: 'KCheckboxGroup'
});

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  color: '#409eff'
});

const formatSize = useSize<CheckboxGroupProps>(props);

const fillColor = ref(props.color);
const kCheckboxGroupRef = ref(null);

watch(
  () => props.color,
  (newValue) => {
    fillColor.value = newValue;
  }
);

provide('useCheckboxGroup', true);
provide('_fillColor', fillColor);
provide(SIZE_KEY, formatSize);

const instance: any = {};
defineExpose(getExposeProxy(instance, kCheckboxGroupRef));
</script>

<style lang="less">
@import './style.less';
</style>
