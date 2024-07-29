<template>
  <div class="k-tag">
    <el-tag
      v-if="!point"
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
import { computed } from 'vue';
import { TagProps } from './type';
import { getCompSize, isValidColor } from '../../utils';

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

const fillColor = computed(() =>
  isValidColor(props.color) ? props.color : defaultColor[props.type],
);
const tagTextColor = computed(() => {
  const color = props.point ? fillColor.value : '#FFF';
  return isValidColor(props.textColor) ? props.textColor : color;
});
const tagAttrs = computed(() => {
  let sizeAttr = {
    width: '12px',
    height: '12px',
    fontSize: '14px',
  };
  if (props.size === 'sm') {
    sizeAttr = {
      width: '8px',
      height: '8px',
      fontSize: '13px',
    };
  }
  return sizeAttr;
});
</script>

<style lang="less">
@import './style.less';
</style>
