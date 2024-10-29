<template>
  <el-radio
    v-bind="$attrs"
    :id="id"
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
import { GetColorLevelNew, genRandomStr, getExposeProxy } from '../../utils';
import { colors } from './const';

defineOptions({
  name: 'KRadio'
});

const props = withDefaults(defineProps<RadioProps>(), {
  color: '',
  button: false
});

const _styleModule = inject('_styleModule', '');
const id = genRandomStr(8);
const color = ref(props.color);
const kRadioRef = ref();

const __size__ = inject(
  '__size__',
  computed(() => 'base')
);

// 获取 dom
const el = ref();
// 等待 dom 更新
if (typeof window !== 'undefined') {
  nextTick(() => {
    el.value = document?.getElementById(id);
  });
}

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
        if (el.value?.style) {
          // 添加一个 css 颜色变量

          const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式
          el.value?.style.setProperty('--radio-color--focus', `rgba(${rbgValue}, 0.2)`);
          colors.forEach((item) => {
            el.value?.style.setProperty(
              `--radio${item.name}`,
              getColorS[`--k-oklch-${item.value}`]
            );
          });
        }
      });
    }
  },
  { immediate: true }
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
