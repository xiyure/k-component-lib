<template>
  <el-form-item
    ref="KFormItemRef"
    :class="['k-form-item', _styleModule, { 'k-form-item--colon': injectShowColon }]"
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
});

function isShowTooltip(el) {
  const srollWidth = el?.scrollWidth;
  // 获取  el 下的子元素
  const clientWidth = el?.clientWidth;
  if (srollWidth > clientWidth) {
    return true;
  }
  return false;
}

const formatSize = useSize<FormItemProps>(props);

const _styleModule = inject('_styleModule', '');
const KFormItemRef = ref(null);

const instance: any = {};
defineExpose(getExposeProxy(instance, KFormItemRef));

const injectShowColon = inject(
  '__showColon__',
  computed(() => false),
);
</script>

<style lang="less">
@import './style.less';
</style>
