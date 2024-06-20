<template>
  <el-button
    ref="buttonRef"
    class="k-button"
    :class="[
      'el-button',
      {
        'el-button--main': props.type === 'main',
        'el-button--secondary': props.type === 'secondary',
        'el-button--text': props.type === 'text',
        'el-button--icon': props.type === 'icon',
        'is-loading': props.loading,
        'is-disabled': props.disabled,
        'button-loading': props.loading,
      },
      getSizeClass,
    ]"
    v-bind="attrs"
    @click="handleClick"
  >
    <slot name="iconLeft" class="icon-left">
      <span v-if="props.iconLeft">
        <props.iconLeft class="icon-left" />
      </span>
    </slot>
    <span v-if="props.value">{{ props.value }}</span>
    <label v-else><slot class="slot-content"></slot></label>
    <slot name="iconRight" class="icon-right">
      <span v-if="props.iconRight">
        <props.iconRight class="icon-right" />
      </span>
    </slot>
  </el-button>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { IconLoading } from 'ksw-vue-icon';
import { ButtonProps } from './type.d';
import { isValidColor, GetColorLevel } from '../../utils';
import 'ksw-vue-icon/styles/icon.css';

defineOptions({
  name: 'KButton',
});

const buttonRef = ref();

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'normal',
  size: 'base',
  value: '',
  disabled: false,
  loading: false,
  loadingIcon: IconLoading,
  iconLeft: null,
  iconRight: null,
  color: '',
});

onMounted(() => {

  console.log("props.color =>>",props.color);
  
  // 校验 color 是否为 16 进制颜色
  if (props.color && isValidColor(props.color)) {
    const hexColor = props.color;
    const { lightColor, darkColor } = GetColorLevel(hexColor, 0.1);
    // 添加一个 css 颜色变量
    buttonRef.value.style.setProperty('--k-button-color', hexColor);
    buttonRef.value.style.setProperty('--k-button-hover-color', lightColor);
    buttonRef.value.style.setProperty('--k-button-active-color', darkColor);
    buttonRef.value.style.setProperty('--k-button-icon-color', hexColor);
  }
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

const getSizeClass = computed(() => (props.size !== '' ? `el-button--${ props.size }` : ''));

const emits = defineEmits(['click']);
const handleClick = (e: Event) => {
  emits('click', e);
};
</script>

<style lang="less">
@import "./style.less";
</style>