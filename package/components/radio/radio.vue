<template>
  <el-radio
    v-bind="$attrs"
    :id="id"
    ref="kRadioRef"
    class="k-radio"
    :class="[getSizeClass, { 'is-button': props.button === true }, $styleModule]"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-radio>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { ElRadio } from 'element-plus';
import { RadioProps } from './type.d';
import { isValidColor, GetColorLevel, genRandomStr, handleExpose } from '../../utils';

defineOptions({
  name: 'KRadio',
});

const props = withDefaults(defineProps<RadioProps>(), {
  size: 'base',
  color: '',
  button: false,
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
    if (newVal && isValidColor(newVal as string)) {
      const hexColor = newVal;
      const { lightColor } = GetColorLevel(hexColor);

      // 等待 dom 更新
      nextTick(() => {
        if (el.value?.style) {
          // 添加一个 css 颜色变量
          el.value?.style.setProperty('--radio-color-checked', hexColor);
          el.value?.style.setProperty('--radio-color-hover', lightColor);
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
