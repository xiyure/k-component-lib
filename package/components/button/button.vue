<template>
  <!-- getSizeClass, -->
  <el-button
    :id="id"
    ref="buttonRef"
    class="k-button"
    :class="[
      'el-button',
      {
        'el-button--main': props.main === true,
        'el-button--secondary': props.secondary === true,
        'el-button--text': props.text === true,
        'el-button--icon': props.icon === true,
        'is-loading': props.loading,
        'is-disabled': props.disabled,
        'button-loading': props.loading,
      },
      getElTypeColor,
      getSizeClass,
      getBtnBase,
    ]"
    :loading="loading"
    :loading-icon="loadingIcon"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot name="iconLeft" class="icon-left">
      <component :is="props.iconLeft" v-if="props.iconLeft" />
    </slot>
    <label v-if="props.value && props.icon === false">{{ props.value }}</label>
    <label v-else-if="$slots.default">
      <slot class="slot-content"></slot>
    </label>
    <slot name="iconRight" class="icon-right">
      <component :is="props.iconRight" v-if="props.iconRight" />
    </slot>
    <component :is="props.loadingIcon" v-if="props.loading" class="loading-icon" />
  </el-button>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue';
import { ElButton } from 'element-plus';
import { IconLoading } from 'ksw-vue-icon';
import { ButtonProps } from './type.d';
import {
  isValidColor,
  GetColorLevel,
  genRandomStr,
  handleExpose,
  GetColorLevelNew,
} from '../../utils';

defineOptions({
  name: 'KButton',
});

const id = genRandomStr(8);
const buttonRef = ref();

const props = withDefaults(defineProps<ButtonProps>(), {
  type: '',
  size: 'base',
  value: '',
  disabled: false,
  loading: false,
  loadingIcon: IconLoading,
  iconLeft: '',
  iconRight: '',
  color: '',
  main: false,
  secondary: false,
  text: false,
  icon: false,
});

const color = ref(props.color);

const el = ref();
nextTick(() => {
  el.value = document.getElementById(id);
});

// watch props.color 变化, 更新颜色变量
watch(
  () => props.color,
  (newVal) => {
    color.value = newVal; // 更新 ref
    let getColorS = GetColorLevelNew(newVal).colorLevel;
    if (newVal) {
      // console.log('@', newVal, getColorS, getColorS['--k-oklch-500']);
      nextTick(() => {
        if (el.value?.style) {
          // console.log(el.value?.classList);

          // 如果 el.value?.classList 包含 el-button--main 打印 'main',包含 el-button--secondary 打印'secondary' 否则打印 'default'

          const classList = el.value?.classList;
          const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式

          switch (true) {
            case classList?.contains('el-button--main'):
              el.value?.style.setProperty('--k-button-bg-color-main', getColorS['--k-oklch-500']);
              el.value?.style.setProperty(
                '--k-button-bg-color-main--hover',
                getColorS['--k-oklch-400'],
              );
              el.value?.style.setProperty(
                '--k-button-bg-color-main--active',
                getColorS['--k-oklch-600'],
              );
              el.value?.style.setProperty(
                '--k-button-bg-color-main--loading',
                getColorS['--k-oklch-300'],
              );
              // // content
              el.value?.style.setProperty(
                '--k-button-border-color-main',
                getColorS['--k-oklch-500'],
              );
              el.value?.style.setProperty(
                '--k-button-border-color-main--hover',
                getColorS['--k-oklch-400'],
              );
              el.value?.style.setProperty(
                '--k-button-border-color-main--active',
                getColorS['--k-oklch-600'],
              );
              el.value?.style.setProperty(
                '--k-button-border-color-main--loading',
                getColorS['--k-oklch-300'],
              );
              el.value?.style.setProperty('--k-button-focus', `rgba(${rbgValue}, 0.2)`);
              break;
            case classList?.contains('el-button--secondary'):
              el.value?.style.setProperty(
                '--k-button-bg-color-secondary--hover',
                getColorS['--k-oklch-50'],
              );
              el.value?.style.setProperty(
                '--k-button-bg-color-secondary--active',
                getColorS['--k-oklch-50'],
              );
              el.value?.style.setProperty(
                '--k-button-content-color-secondary',
                getColorS['--k-oklch-500'],
              );
              el.value?.style.setProperty(
                '--k-button-content-color-secondary--hover',
                getColorS['--k-oklch-400'],
              );
              el.value?.style.setProperty(
                '--k-button-content-color-secondary--active',
                getColorS['--k-oklch-600'],
              );
              el.value?.style.setProperty(
                '--k-button-content-color-secondary--loading',
                getColorS['--k-oklch-300'],
              );
              el.value?.style.setProperty(
                '--k-button-border-color-secondary',
                getColorS['--k-oklch-500'],
              );
              el.value?.style.setProperty(
                '--k-button-border-color-secondary--hover',
                getColorS['--k-oklch-400'],
              );
              el.value?.style.setProperty(
                '--k-button-border-color-secondary--active',
                getColorS['--k-oklch-600'],
              );
              el.value?.style.setProperty(
                '--k-button-border-color-secondary--loading',
                getColorS['--k-oklch-300'],
              );
              el.value?.style.setProperty('--k-button-focus', `rgba(${rbgValue}, 0.2)`);
              break;
            case classList?.contains('el-button--text'):
              // console.log('text');
              //               // bg
              // // content
              // --k-button-content-color-text: var(--k-theme-danger);
              // --k-button-content-color-text--hover: var(--k-theme-danger-400);
              // --k-button-content-color-text--active: var(--k-theme-danger-600);
              // --k-button-content-color-text--loading: var(--k-theme-danger-300);
              // // border
              // --k-button-focus: rgba(var(--k-theme-danger-rgb), 0.2);
              el.value?.style.setProperty(
                '--k-button-content-color-text',
                getColorS['--k-oklch-500'],
              );
              el.value?.style.setProperty(
                '--k-button-content-color-text--hover',
                getColorS['--k-oklch-400'],
              );
              el.value?.style.setProperty(
                '--k-button-content-color-text--active',
                getColorS['--k-oklch-600'],
              );
              el.value?.style.setProperty(
                '--k-button-content-color-text--loading',
                getColorS['--k-oklch-300'],
              );
              el.value?.style.setProperty('--k-button-focus', `rgba(${rbgValue}, 0.2)`);
              break;
            case classList?.contains('el-button--icon'):
              // console.log('icon');
              break;
            default:
            // console.log('default');
          }
        }
      });
    }
  },
  { immediate: true },
);

const getElTypeColor = computed(() => {
  const elTypeColorArgs = ['primary', 'success', 'info', 'warning', 'danger'];
  if (props.type && elTypeColorArgs.includes(props.type)) {
    return `el-button--${props.type}`;
  }
  return '';
});

const getSizeClass = computed(() => (props.size ? `el-button--${props.size}` : ''));

const getBtnBase = computed(() => {
  // props.type 中包含 primary, success, info, warning, danger 时, 返回 true
  const checkType = (tp: string) => {
    const arr = ['primary', 'success', 'info', 'warning', 'danger'];
    if (arr.includes(tp)) {
      return true;
    }
    return false;
  };

  if (
    props.main === false &&
    props.secondary === false &&
    props.text === false &&
    props.icon === false &&
    !checkType(props.type)
  ) {
    return 'k-button--base';
  }
  return '';
});

const instance: any = {};
handleExpose(instance, buttonRef, 'KButton');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
