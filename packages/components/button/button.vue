<template>
  <el-button
    :id="id"
    ref="buttonRef"
    class="k-button"
    :class="[
      'el-button',
      {
        'el-button--main': main,
        'el-button--secondary': secondary,
        'el-button--text': text,
        'el-button--icon': icon,
        'is-loading': loading,
        'is-disabled': disabled,
        'button-loading': loading,
      },
      getElTypeColor,
      getSizeClass,
      getBtnBase
    ]"
    :loading="loading"
    :loading-icon="loadingIcon"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot :name="compatibleSlots($slots, ['icon-left', 'iconLeft'])" class="icon-left">
      <component :is="props.iconLeft" v-if="props.iconLeft" />
    </slot>
    <label v-if="props.value && props.icon === false">{{ props.value }}</label>
    <label v-else-if="$slots.default">
      <slot class="slot-content"></slot>
    </label>
    <slot :name="compatibleSlots($slots, ['icon-right', 'iconRight'])" class="icon-right">
      <component :is="props.iconRight" v-if="props.iconRight" />
    </slot>
    <component :is="props.loadingIcon" v-if="props.loading" class="loading-icon" />
  </el-button>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue';
import { ElButton } from 'element-plus';
import { ButtonProps } from './type';
import { genRandomStr, getExposeProxy, GetColorLevelNew, compatibleSlots } from '../../utils';
import { btnTypes } from './const';
import { useSize } from '../../hooks';

defineOptions({
  name: 'KButton'
});

const props = withDefaults(defineProps<ButtonProps>(), {
  type: '',
  value: '',
  disabled: false,
  loading: false,
  loadingIcon: 'IconLoading',
  iconLeft: '',
  iconRight: '',
  color: '',
  main: false,
  secondary: false,
  text: false,
  icon: false
});

const formatSize = useSize<ButtonProps>(props);

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
    const getColorS = GetColorLevelNew(newVal)?.colorLevel;
    if (newVal) {
      nextTick(() => {
        if (buttonRef?.value?.$el?.style) {
          const classList = buttonRef.value.$el?.classList;
          const rbgValue = getColorS?.['--k-oklch-500']?.match(/\(([^)]+)\)/)?.[1];

          for (const item of btnTypes) {
            const btnType = `el-button--${item.type}`;
            if (classList?.contains(btnType)) {
              item.vars.forEach((item) => {
                buttonRef.value.$el?.style.setProperty(
                  `--k-button-${item.name}`,
                  getColorS?.[`--k-oklch-${item.value}`]
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

const getSizeClass = computed(() => {
  const { ownSize } = formatSize.value;
  return ownSize ? `el-button--${ownSize}` : '';
});

const getBtnBase = computed(() => {
  const buttonTypes: Array<keyof ButtonProps> = ['main', 'secondary', 'text', 'icon'];
  const elTypes = ['primary', 'success', 'info', 'warning', 'danger'];
  if (elTypes.includes(props.type)) {
    return '';
  }
  for (let i = 0; i < buttonTypes.length; i++) {
    if (props[buttonTypes[i]]) {
      return '';
    }
  }
  return 'k-button--base';
});

const instance: any = {};
defineExpose(getExposeProxy(instance, buttonRef));
</script>

<style lang="less">
@import './style.less';
</style>
