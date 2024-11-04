<template>
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
      _styleModule,
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
import { computed, ref, nextTick, watch, inject } from 'vue';
import { ElButton } from 'element-plus';
import { IconLoading } from 'ksw-vue-icon';
import { ButtonProps } from './type.d';
import { genRandomStr, getExposeProxy, GetColorLevelNew } from '../../utils';
import { btnTypes } from './const';

defineOptions({
  name: 'KButton'
});

const props = withDefaults(defineProps<ButtonProps>(), {
  type: '',
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
  icon: false
});

const _styleModule = inject('_styleModule', '');

const id = genRandomStr(8);
const buttonRef = ref();

const color = ref(props.color);

// watch props.color 变化, 更新颜色变量
watch(
  () => props.color,
  (newVal) => {
    if (!newVal) {
      return;
    }
    color.value = newVal; // 更新 ref
    const getColorS = GetColorLevelNew(newVal).colorLevel;
    if (newVal) {
      nextTick(() => {
        if (buttonRef?.value?.$el?.style) {
          const classList = buttonRef.value.$el?.classList;
          const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式

          for (const item of btnTypes) {
            const btnType = `el-button--${item.type}`;
            if (classList?.contains(btnType)) {
              item.vars.forEach((item) => {
                buttonRef.value.$el?.style.setProperty(
                  `--k-button-${item.name}`,
                  getColorS[`--k-oklch-${item.value}`]
                );
              });
            }
          }

          // focus
          buttonRef.value.$el?.style.setProperty('--k-button-focus', `rgba(${rbgValue}, 0.2)`);
        }
      });
    }
  },
  { immediate: true }
);

const getElTypeColor = computed(() => {
  const elTypeColorArgs = ['primary', 'success', 'info', 'warning', 'danger'];
  if (props.type && elTypeColorArgs.includes(props.type)) {
    return `el-button--${props.type}`;
  }
  return '';
});

const __size__ = inject(
  '__size__',
  computed(() => 'base')
);

const getSizeClass = computed(() => {
  const size = props.size ?? __size__.value;
  return size ? `el-button--${size}` : '';
});

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
defineExpose(getExposeProxy(instance, buttonRef));
</script>

<style lang="less">
@import './style.less';
</style>
