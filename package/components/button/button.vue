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
    <label v-else>
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
import { IconLoading } from 'ksw-vue-icon';
import { ButtonProps } from './type.d';
import { isValidColor, GetColorLevel, genRandomStr, handleExpose } from '../../utils';

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
    if (newVal && isValidColor(newVal as string)) {
      const hexColor = newVal;
      const { lightColor, darkColor, loadingColor } = GetColorLevel(hexColor);
      nextTick(() => {
        if (el.value?.style) {
          // 添加一个 css 颜色变量
          el.value?.style.setProperty('--k-button-color', hexColor);
          el.value?.style.setProperty('--k-button-hover-color', lightColor);
          el.value?.style.setProperty('--k-button-active-color', darkColor);
          el.value?.style.setProperty('--k-button-icon-color', hexColor);
          el.value?.style.setProperty('--k-button-loading-color', loadingColor);
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
    switch (tp) {
      case 'primary':
        return true;
      case 'success':
        return true;
      case 'info':
        return true;
      case 'warning':
        return true;
      case 'danger':
        return true;
      default:
        return false;
    }
  };

  if (
    props.main === false &&
    props.secondary === false &&
    props.text === false &&
    props.icon === false &&
    checkType(props.type)
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
