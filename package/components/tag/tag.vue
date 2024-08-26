<template>
  <div class="k-tag">
    <el-tag
      v-if="!point"
      ref="KTagRef"
      class="k-tag__block"
      v-bind="$attrs"
      :color="fillColor"
      :size="getCompSize(size)"
      :style="{
        borderColor: fillColor,
      }"
    >
      <span
        :style="{
          color: tagTextColor,
        }"
      >
        <slot>{{ props.text }}</slot>
      </span>
    </el-tag>
    <div v-else class="k-tag__point">
      <div
        class="k-tag__sign"
        :style="{
          backgroundColor: fillColor,
          width: tagAttrs?.width,
          height: tagAttrs?.height,
        }"
      ></div>
      <div
        class="k-tag__content"
        :style="{
          color: tagTextColor,
          fontSize: tagAttrs?.fontSize,
        }"
      >
        <slot>{{ props.text }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { TagProps } from './type';
import { getCompSize, isValidColor, handleExpose } from '../../utils';

defineOptions({
  name: 'KTag',
});

const props = withDefaults(defineProps<TagProps>(), {
  point: false,
  type: 'primary',
  text: undefined,
});

const defaultColor = {
  primary: '#2882FF',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F97316',
  info: '#6B7280',
};

const fillColor = computed(() => (isValidColor(props.color) ? props.color : defaultColor[props.type]));
const tagTextColor = computed(() => {
  const color = props.point ? fillColor.value : '#FFF';
  return isValidColor(props.textColor) ? props.textColor : color;
});
const tagAttrs = computed(() => {
  let sizeAttr = {
    width: '0.75rem',
    height: '0.75rem',
    fontSize: '0.875rem',
  };
  if (props.size === 'sm') {
    sizeAttr = {
      width: '0.5rem',
      height: '0.5rem',
      fontSize: '0.75rem',
    };
  }
  return sizeAttr;
});

const KTagRef = ref(null);
const instance: any = {};
handleExpose(instance, KTagRef, 'KTag');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
