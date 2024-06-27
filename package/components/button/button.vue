<template>
  <!-- getSizeClass, -->
  <el-button
    ref="btn"
    class="k-button"
    :id="id"
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
      getColor,
      getCustomColor,
    ]"
    v-bind="attrs"
    @click="handleClick"
  >
    <slot name="iconLeft" class="icon-left">
      <component :is="props.iconLeft" />
    </slot>
    <label v-if="props.value">{{ props.value }}</label>
    <label v-else><slot class="slot-content"></slot></label>
    <slot name="iconRight" class="icon-right">
      <component :is="props.iconRight" />
    </slot>
    <component
      v-if="props.loading"
      :is="props.loadingIcon"
      class="loading-icon"
    />
  </el-button>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from "vue";
import { IconLoading } from "ksw-vue-icon";
import { ButtonProps } from "./type.d";
import { isValidColor, GetColorLevel, genRandomStr } from "../../utils";
import "ksw-vue-icon/styles/icon.css";

defineOptions({
  name: "KButton",
});

const id = genRandomStr(8);
const btn = ref();

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "",
  size: "base",
  value: "",
  disabled: false,
  loading: false,
  loadingIcon: IconLoading,
  iconLeft: null,
  iconRight: null,
  color: "",
  main: false,
  secondary: false,
  text: false,
  icon: false,
});

onMounted(() => {
});

let el = ref();
nextTick(() => {  // 等待 dom 更新
  el.value = document.getElementById(id);
});

const getCustomColor = computed(() => {
  if (props.color && isValidColor(props.color)) {
    const hexColor = props.color;
    const { lightColor, darkColor, loadingColor } = GetColorLevel(
      hexColor,
      0.1
    );
    if (el.value?.style) {
      // 添加一个 css 颜色变量
      el.value?.style.setProperty("--k-button-color", hexColor);
      el.value?.style.setProperty("--k-button-hover-color", lightColor);
      el.value?.style.setProperty("--k-button-active-color", darkColor);
      el.value?.style.setProperty("--k-button-icon-color", hexColor);
      el.value?.style.setProperty("--k-button-loading-color", loadingColor);
      console.log(lightColor, darkColor, loadingColor);
    }
  }
});

const getColor = computed(() => {
  // 判断 props.type 是否为 primary 等类型 或者 16 进制颜色
  const args = ["primary", "success", "warning", "danger", "info"];
  // 判断 props.type === args 中的任意一项
  if (props.type && args.includes(props.type)) {
    return `el-button--${props.type}`;
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

const getSizeClass = computed(() =>
  props.size !== "" ? `el-button--${props.size}` : ""
);

const emits = defineEmits(["click"]);
const handleClick = (e: Event) => {
  emits("click", e);
};
</script>

<style lang="less">
@import "./style.less";
</style>