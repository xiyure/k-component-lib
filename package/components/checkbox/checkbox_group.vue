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
import { ref, watch, provide, inject, computed } from 'vue';
import { ElCheckboxGroup } from 'element-plus';
import { CheckboxGroupProps } from './type';
import { getCompSize, getExposeProxy } from '../../utils/index';

defineOptions({
  name: 'KCheckboxGroup'
});

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  color: '#409eff'
});

const _styleModule = inject('_styleModule', '');
const fillColor = ref(props.color);
const kCheckboxGroupRef = ref(null);

watch(
  () => props.color,
  (newValue) => {
    fillColor.value = newValue;
  }
);

const injectSize = inject(
  '__size__',
  computed(() => 'base')
);

provide('useCheckboxGroup', true);
provide('_fillColor', fillColor);
provide(
  '__size__',
  computed(() => props.size ?? injectSize.value)
);

const instance: any = {};
defineExpose(getExposeProxy(instance, kCheckboxGroupRef));
</script>

<style lang="less">
@import './style.less';
</style>
