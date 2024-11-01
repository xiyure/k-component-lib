<template>
  <el-radio
    v-bind="$attrs"
    ref="kRadioRef"
    class="k-radio"
    :class="[getSizeClass, { 'is-button': props.button === true }, _styleModule]"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-radio>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, inject } from 'vue';
import { ElRadio } from 'element-plus';
import { RadioProps } from './type.d';
import { GetColorLevelNew, getExposeProxy } from '../../utils';
import { colors } from './const';

defineOptions({
  name: 'KRadio',
});

const props = withDefaults(defineProps<RadioProps>(), {
  color: '',
  button: false,
});

const _styleModule = inject('_styleModule', '');
const color = ref(props.color);
const kRadioRef = ref();

const __size__ = inject(
  '__size__',
  computed(() => 'base'),
);

// watch props.color 变化, 更新颜色变量
watch(
  () => props.color,
  (newVal) => {
    color.value = newVal; // 更新 ref
    const getColorS = GetColorLevelNew(newVal).colorLevel;
    if (newVal) {
      // const hexColor = newVal;
      // const { lightColor } = GetColorLevel(hexColor);

      // 等待 dom 更新
      nextTick(() => {
        if (kRadioRef.value.$el?.style) {
          // 添加一个 css 颜色变量

          const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式
          kRadioRef.value.$el?.style.setProperty('--radio-color--focus', `rgba(${rbgValue}, 0.2)`);
          colors.forEach((item) => {
            kRadioRef.value.$el?.style.setProperty(
              `--radio${item.name}`,
              getColorS[`--k-oklch-${item.value}`],
            );
          });
        }
      });
    }
  },
  { immediate: true },
);

const getSizeClass = computed(() => {
  const size = props.size ?? __size__.value;
  return size ? `k-radio--${size}` : '';
});

const instance: any = {};
defineExpose(getExposeProxy(instance, kRadioRef));
</script>

<style lang="less">
@import './style.less';
</style>
