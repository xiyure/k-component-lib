<template>
  <el-form-item
    ref="KFormItemRef"
    :class="['k-form-item', _styleModule, { 'k-form-item--colon': injectShowColon }]"
    v-bind="$attrs"
    :size="formatSize.elSize"
  >
    <!-- <template v-for="(_, name) in $slots" :key="name">
      <template v-if="customSlotNames" #[name]="data">
        <slot :name="name" v-bind="data"></slot>
      </template>
    </template> -->
    <template #label="labelData">
      <span
        ref="LabelRef"
        v-ksw_tooltip="{
          content: newLabel,
          autoClose: undefined,
          showAfter: 1000,
          visible: showLabelTooltip,
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
import { ref, inject, computed, nextTick, watch } from 'vue';
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

const LabelRef = ref();

const showLabelTooltip: Ref<boolean> = ref(true);

const newLabel = computed(() => {
  if (!LabelRef.value) {
    return props.label ?? '';
  }
  return LabelRef.value?.textContent ?? props.label;
});

watch(
  () => LabelRef.value,
  () => {
    setTimeout(() => {
      const text = LabelRef.value?.textContent;
      const fontSize = window.getComputedStyle(LabelRef.value).fontSize;
      const fontFamily = window.getComputedStyle(LabelRef.value).fontFamily;
      // console.log(fontSize, fontFamily);

      const font = `${fontSize} ${fontFamily}`;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context.font = font;
      const { width } = context.measureText(text);

      const labelTextWidth = Number(width.toFixed(2));
      const labelWidth = Number(LabelRef.value?.getBoundingClientRect().width.toFixed(2));
      if (labelTextWidth > labelWidth) {
        showLabelTooltip.value = true;
      } else {
        showLabelTooltip.value = false;
      }
      console.log(showLabelTooltip.value);
    });
  },
);

const customSlotNames: Map<string, boolean> = new Map(['label'].map((name) => [name, true]));

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
