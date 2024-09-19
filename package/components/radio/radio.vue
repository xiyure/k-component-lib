<template>
  <el-radio v-bind="$attrs" :id="id" ref="kRadioRef" class="k-radio" :class="getSizeClass">
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-radio>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { ElRadio } from 'element-plus';
import { RadioProps } from './type.d';
import { GetColorLevelNew, genRandomStr, handleExpose } from '../../utils';

defineOptions({
  name: 'KRadio',
});

const props = withDefaults(defineProps<RadioProps>(), {
  size: 'base',
  color: '',
});

const id = genRandomStr(8);
const color = ref(props.color);

// const fillColor = inject('_fillColor', ref(''));
const kRadioRef = ref();

onMounted(() => {});

// 获取 dom
const el = ref();
// 等待 dom 更新
nextTick(() => {
  el.value = document.getElementById(id);
});

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
          // el.value?.style.setProperty('--radio-color-checked', hexColor);
          // el.value?.style.setProperty('--radio-color-hover', lightColor);

          const classList = el.value?.classList;
          // console.log(classList);

          const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式

          // text
          el.value?.style.setProperty('--radio-text-color--hover', getColorS['--k-oklch-400']);
          el.value?.style.setProperty('--radio-text-color--checked', getColorS['--k-oklch-500']);
          // border
          el.value?.style.setProperty(
            '--radio__inner__border-color--hover',
            getColorS['--k-oklch-400'],
          );
          el.value?.style.setProperty(
            '--radio__inner__border-color--checked',
            getColorS['--k-oklch-500'],
          );
          el.value?.style.setProperty(
            '--radio__inner__ball-color--normal',
            getColorS['--k-oklch-500'],
          );
          el.value?.style.setProperty(
            '--radio__inner__ball-color--hover',
            getColorS['--k-oklch-500'],
          );
          el.value?.style.setProperty(
            '--radio__inner__ball-color--checked',
            getColorS['--k-oklch-500'],
          );
          // button
          el.value?.style.setProperty(
            '--radio__button__border-color--hover',
            getColorS['--k-oklch-400'],
          );
          el.value?.style.setProperty(
            '--radio__button__text-color--hover',
            getColorS['--k-oklch-400'],
          );
          el.value?.style.setProperty(
            '--radio__button__bg-color--checked',
            getColorS['--k-oklch-500'],
          );
          el.value?.style.setProperty(
            '--radio__button__border-color--checked',
            getColorS['--k-oklch-500'],
          );
          el.value?.style.setProperty('--radio-color--focus', `rgba(${rbgValue}, 0.2)`);
        }
      });
    }
  },
  { immediate: true },
);

const getSizeClass = computed(() => (props.size ? `k-radio--${props.size}` : ''));

const instance: any = {};
handleExpose(instance, kRadioRef, 'KRadio');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
