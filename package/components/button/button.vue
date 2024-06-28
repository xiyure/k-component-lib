<template>
  <!-- getSizeClass, -->
  <el-button
    :id="id"
    ref="btn"
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
        'el-button--sm': props.size === 'sm',
      },
      getElTypeColor
    ]"
    v-bind="attrs"
    @click="handleClick"
  >
    <slot name="iconLeft" class="icon-left">
      <component :is="props.iconLeft" v-if="props.iconLeft" />
    </slot>
    <label v-if="props.value">{{ props.value }}</label>
    <label v-else><slot class="slot-content"></slot></label>
    <slot name="iconRight" class="icon-right">
      <component :is="props.iconRight" v-if="props.iconRight" />
    </slot>
    <component
      :is="props.loadingIcon"
      v-if="props.loading"
      class="loading-icon"
    />
  </el-button>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from 'vue';
import { IconLoading } from 'ksw-vue-icon';
import { ButtonProps } from './type.d';
import { isValidColor, GetColorLevel, genRandomStr } from '../../utils';
import 'ksw-vue-icon/styles/icon.css';

defineOptions({
  name: 'KButton',
});

const id = genRandomStr(8);
const btn = ref();

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

onMounted(() => {});

const el = ref();
nextTick(() => {
  // 等待 dom 更新
  el.value = document.getElementById(id);
});

watch(() => props.color, () => {
  if (props.color && isValidColor(props.color as string)) {
    const hexColor = props.color;
    const { lightColor, darkColor, loadingColor } = GetColorLevel(hexColor);
    if (el.value?.style) {
      // 添加一个 css 颜色变量
      el.value?.style.setProperty('--k-button-color', hexColor);
      el.value?.style.setProperty('--k-button-hover-color', lightColor);
      el.value?.style.setProperty('--k-button-active-color', darkColor);
      el.value?.style.setProperty('--k-button-icon-color', hexColor);
      el.value?.style.setProperty('--k-button-loading-color', loadingColor);
    }
  }
});

const getElTypeColor = computed(() => {
  const elTypeColorArgs = ['primary', 'success', 'warning', 'danger'];
  if (props.type && elTypeColorArgs.includes(props.type)) {
    return `el-button--${ props.type }`;
  }
  return '';
});

const attrs = computed(() => ({
  ...getOriginAttrs(),
}));

const getOriginAttrs = () => {
  const { loading, loadingIcon } = props;
  return {
    loading,
    loadingIcon,
  };
};

const emits = defineEmits(['click']);
const handleClick = (e: Event) => {
  emits('click', e);
};
</script>

<style lang="less">
@import "./style.less";
</style>