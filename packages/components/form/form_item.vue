<template>
  <el-form-item
    ref="KFormItemRef"
    :class="[
      'k-form-item',
      { 'k-form-item--colon': isShowColon($slots.label ?? label) },
      { 'k-form-item--no-label': !isShowLabel },
      {'asterisk-position__right': !formConfig.hideRequiredAsterisk && formConfig.requireAsteriskPosition === 'right' },
      {'asterisk-position__left': !formConfig.hideRequiredAsterisk &&formConfig.requireAsteriskPosition !== 'right' }
    ]"
    v-bind="$attrs"
    :label="label"
    :size="formatSize.elSize"
  >
    <template #label="labelData" v-if="$slots.label || label">
      <span
        ref="LabelRef"
        v-ksw_tooltip="{
          visible: isShowTooltip
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
import { ref, inject, computed, VNode } from 'vue';
import { ElFormItem } from 'element-plus';
import { FormItemProps } from './type';
import { getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';
import { FORM_PARAMS_KEY } from './const';

defineOptions({
  name: 'KFormItem'
});

const props = withDefaults(defineProps<FormItemProps>(), {
  label: '',
  showLabel: undefined,
  showColon: undefined
});

const formConfig = inject(
  FORM_PARAMS_KEY,
  computed(() => ({
    showColon: false,
    showLabel: true,
    hideRequiredAsterisk: false,
    requireAsteriskPosition: 'left'
  }))
);

const formatSize = useSize<FormItemProps>(props);

const KFormItemRef = ref(null);

const isShowColon = computed(() => (label: string | (() => VNode[]) | undefined) => {
  if (!label) {
    return false;
  }
  if (typeof props.showColon === 'boolean') {
    return props.showColon;
  }
  return formConfig.value.showColon ?? false;
});

const isShowLabel = computed(() => {
  if (typeof props.showLabel === 'boolean') {
    return props.showLabel;
  }
  return formConfig.value.showLabel ?? true;
})

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
</script>

<style lang="less">
@import './style.less';
</style>
