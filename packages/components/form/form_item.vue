<!--       { 'k-form-item--no-label': props.label === '' }, -->
<template>
  <el-form-item
    ref="KFormItemRef"
    :class="[
      'k-form-item',
      _styleModule,
      { 'k-form-item--colon': injectShowColon },
      { 'k-form-item--no-label': _showLabel === true },
    ]"
    v-bind="$attrs"
    :label="label"
    :size="formatSize.elSize"
  >
    <template #label="labelData">
      <span
        ref="LabelRef"
        v-ksw_tooltip="{
          visible: isShowTooltip,
        }"
      >
        <slot name="label" v-bind="labelData">{{ props.label }}</slot>
      </span>
    </template>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #error="errorData">
      <slot name="error" v-bind="errorData"></slot>
    </template>
  </el-form-item>
</template>

<script setup lang="ts">
import { ref, inject, computed } from 'vue';
import { ElFormItem } from 'element-plus';
import { FormItemProps } from './type';
import { getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KFormItem',
});

const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  showLabel: true,
});

const formatSize = useSize<FormItemProps>(props);

const _styleModule = inject('_styleModule', '');
const KFormItemRef = ref(null);

function isShowTooltip(el: HTMLElement) {
  const scrollWidth = el?.scrollWidth;
  const clientWidth = el?.clientWidth;
  if (scrollWidth > clientWidth) {
    return true;
  }
  return false;
}

const instance: any = {};
defineExpose(getExposeProxy(instance, KFormItemRef));

const injectShowColon = inject(
  '__showColon__',
  computed(() => false),
);

const injectShowLabel = inject(
  '__showLabel__',
  computed(() => true),
);

const _showLabel = computed(() => {
  if (injectShowLabel.value === false) {
    return true;
  }
  if (props.showLabel === false) {
    return true;
  }
});

console.log(props.label, injectShowLabel.value);
</script>

<style lang="less">
@import './style.less';
</style>
