<template>
  <el-checkbox-group
    ref="kCheckboxGroupRef"
    :class="['k-checkbox-group', _styleModule]"
    v-bind="$attrs"
    :size="getCompSize(size)"
  >
    <slot></slot>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import { ref, watch, provide, inject } from 'vue';
import { ElCheckboxGroup } from 'element-plus';
import { CheckboxGroupProps } from './type';
import { getCompSize, handleExpose } from '../../utils/index';

defineOptions({
  name: 'KCheckboxGroup',
});

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  color: '#409eff',
});

const _styleModule = inject('_styleModule', '');
const fillColor = ref(props.color);
const kCheckboxGroupRef = ref(null);

watch(
  () => props.color,
  (newValue) => {
    fillColor.value = newValue;
  },
);

provide('useCheckboxGroup', true);
provide('_fillColor', fillColor);

const instance: any = {};
handleExpose(instance, kCheckboxGroupRef, 'KCheckboxGroup');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
