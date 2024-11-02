<template>
  <div :class="['k-tag', _styleModule]">
    <el-tag
      ref="KTagRef"
      :class="[
        { 'is-border': border },
        { 'is-point': point },
        { [`k-tag__${type}`]: type },
        { 'is-custom': color },
      ]"
      v-bind="$attrs"
      :size="getCompSize(size)"
    >
      <span>
        <slot>{{ props.text }}</slot>
      </span>
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, inject, nextTick } from 'vue';
import { ElTag } from 'element-plus';
import { TagProps } from './type';
import { getCompSize, isValidColor, getExposeProxy, GetColorLevelNew } from '../../utils';
import { colors } from './const';

defineOptions({
  name: 'KTag',
});

const props = withDefaults(defineProps<TagProps>(), {
  point: false,
  type: undefined,
  text: undefined,
});

console.log(props.color);

const _styleModule = inject('_styleModule', '');
const defaultColor = {
  primary: '#2882FF',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F97316',
  info: '#6B7280',
};

// const fillColor = computed(() =>
//   isValidColor(props.color) ? props.color : defaultColor[props.type],
// );
// const tagTextColor = computed(() => {
//   const color = props.point ? fillColor.value : '#FFF';
//   return isValidColor(props.textColor) ? props.textColor : color;
// });
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
const color = ref(props.color);

// watch props.color 变化, 更新颜色变量
watch(
  () => props.color,
  (newVal) => {
    color.value = newVal; // 更新 ref
    const getColorS = GetColorLevelNew(newVal).colorLevel;
    if (newVal) {
      // 等待 dom 更新
      nextTick(() => {
        if (KTagRef.value.$el?.style) {
          // 添加一个 css 颜色变量

          const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式
          KTagRef.value.$el?.style.setProperty('--tag-color--focus', `rgba(${rbgValue}, 0.2)`);
          colors.forEach((item) => {
            KTagRef.value.$el?.style.setProperty(
              `--tag${item.name}`,
              getColorS[`--k-oklch-${item.value}`],
            );
          });
        }
      });
    }
  },
  { immediate: true },
);

const instance: any = {};
defineExpose(getExposeProxy(instance, KTagRef));
</script>

<style lang="less">
@import './style.less';
</style>
