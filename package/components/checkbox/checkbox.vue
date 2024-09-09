<template>
  <el-checkbox
    ref="kCheckboxRef"
    :class="['k-checkbox', $styleModule]"
    v-bind="$attrs"
    :label="label"
    :size="getCompSize(size)"
    @click="handleClickLabel"
  >
    <slot>
      <span class="checkbox__label">
        {{ props.label }}
      </span>
    </slot>
  </el-checkbox>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, inject } from 'vue';
import { ElCheckbox } from 'element-plus';
import { CheckboxProps } from './type';
import { getCompSize, isValidColor, handleExpose } from '../../utils/index';

defineOptions({
  name: 'KCheckbox',
});

const fillColor = inject('_fillColor', ref(''));

const props = withDefaults(defineProps<CheckboxProps>(), {
  strict: false,
});
const kCheckboxRef = ref();

watch(
  () => [props.color, fillColor.value],
  () => {
    let color = '#2882FF';
    if (isValidColor(props.color)) {
      color = props.color as string;
    } else if (isValidColor(fillColor.value)) {
      color = fillColor.value;
    }
    nextTick(() => {
      const element = kCheckboxRef.value.$el;
      element.style.setProperty('--checkbox-bgColor', color);
    });
  },
  { immediate: true },
);

function handleClickLabel(e) {
  if (!props.strict) {
    return;
  }
  const isCheckbox = e.target.classList.contains('el-checkbox__inner');
  if (!isCheckbox) {
    e.preventDefault();
  }
}

const instance: any = {};
handleExpose(instance, kCheckboxRef, 'KCheckbox');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
