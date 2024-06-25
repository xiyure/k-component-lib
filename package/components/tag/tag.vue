<template>
  <div class="k-tag">
    <el-tag
      v-if="!point"
      class="k-tag__block"
      v-bind="$attrs"
      :color="color"
      :type="type"
      :size="getCompSize(size)"
    >
      <span
        :style="{
          color: props.textColor
        }"
      >
        <slot></slot>
      </span>
    </el-tag>
    <div v-else class="k-tag__point">
      <div
        class="k-tag__sign"
        :style="{
          backgroundColor: isValidColor(props.color) ? props.color : defaultColor[props.type],
          width: tagAttrs?.width,
          height: tagAttrs?.height
        }"
      ></div>
      <div
        class="k-tag__content"
        :style="{
          color: props.textColor || '#000',
          fontSize: tagAttrs?.fontSize
        }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TagProps } from './type';
import { getCompSize, isValidColor } from '../../utils';

defineOptions({
  name: 'KTag'
});

const props = withDefaults(defineProps<TagProps>(), {
  point: false,
  type: 'primary'
});

const defaultColor = {
  primary: '#4091FF',
  success: '#67C23A',
  danger: '#F56C6C',
  waring: '#E6A23C',
  info: '#909399'
};
const tagAttrs = computed(() => {
  let sizeAttr = {
    width: '12px',
    height: '12px',
    fontSize: '15px'
  };
  if (props.size === 'sm') {
    sizeAttr = {
      width: '8px',
      height: '8px',
      fontSize: '13px'
    };
  }
  return sizeAttr;
});
</script>

<style lang="less">
@import './style.less';
</style>