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
        'button-loading': props.loading
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
import { computed } from "vue";
import { ButtonProps } from "./type";
import { IconLoading } from "ksw-vue-icon";
import "ksw-vue-icon/styles/icon.css";

defineOptions({
  name: "KButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "normal",
  size: "base",
  value: "",
  disabled: false,
  loading: false,
  loadingIcon: IconLoading,
  iconLeft: null,
  iconRight: null,
});

const attrs = computed(() => {
  return {
    ...getOriginAttrs(),
  };
});

const getOriginAttrs = () => {
  const { loading, loadingIcon } = props;
  return {
    loading,
    loadingIcon,
  };
};

const getSizeClass = computed(() => {
  return props.size !== "" ? `el-button--${props.size}` : "";
});


const emits = defineEmits(["click"]);
const handleClick = (e: Event) => {
  emits("click", e);
};
</script>

<style lang="less">
@import "./style.less";
</style>