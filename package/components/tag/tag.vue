<template>
  <div class="k-tag">
    <el-tag
      v-if="type === 'block'"
      class="k-tag__block"
      v-bind="$attrs"
      :color="color"
      :size="getCompSize(size)"
    >
      <span
        :style="{
          width: '100%',
          color: props.textColor || '#FFF',
        }"
      >
        <slot></slot>
      </span>
    </el-tag>
    <div v-else-if="type === 'point'" class="k-tag__point">
      <div
        class="k-tag__sign"
        :style="{
          backgroundColor: props.color || '#2882FF',
          width: tagAttrs?.width,
          height: tagAttrs?.height
        }"
      ></div>
      <div
        class="k-tag__content"
        :style="{
          color: props.textColor || props.color,
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
import { getCompSize } from '../../utils';

defineOptions({
  name: 'KTag'
});

const props = withDefaults(defineProps<TagProps>(), {
  type: 'block',
  color: '#4091FF'
});

const tagAttrs = computed(() => {
  let sizeAttr = {
    width: '12px',
    height: '12px',
    fontSize: '16px'
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