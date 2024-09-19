<template>
  <el-checkbox
    ref="kCheckboxRef"
    class="k-checkbox"
    :class="[getSizeClass]"
    :id="id"
    v-bind="$attrs"
    :label="label"
    @click="handleClickLabel"
  >
    <slot>
      <span class="checkbox__label">
        {{ props.label }}
      </span>
    </slot>
  </el-checkbox>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue';
import { ElCheckbox } from 'element-plus';
import { CheckboxProps } from './type';
import { handleExpose, genRandomStr, GetColorLevelNew } from '../../utils/index';

defineOptions({
  name: 'KCheckbox',
});

const props = withDefaults(defineProps<CheckboxProps>(), {
  strict: false,
  color: '',
});
const kCheckboxRef = ref();

const id = genRandomStr(8);

const color = ref(props.color);
// watch props.color 变化, 更新颜色变量

// 获取 dom
const el = ref();
const parent = ref();
// 等待 dom 更新
nextTick(() => {
  el.value = document.getElementById(id);
});
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

          // const classList = el.value?.classList;
          // console.log(classList);

          // 获取 el.value 的父节点
          parent.value = el.value?.parentNode?.parentNode;
          // console.log(parent.value);

          const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式

          // text
          parent.value?.style.setProperty(
            '--checkbox-text-color--hover',
            getColorS['--k-oklch-400'],
          );
          parent.value?.style.setProperty(
            '--checkbox-text-color--checked',
            getColorS['--k-oklch-500'],
          );
          // border
          parent.value?.style.setProperty(
            '--checkbox__inner__border-color--hover',
            getColorS['--k-oklch-400'],
          );
          parent.value?.style.setProperty(
            '--checkbox__inner__border-color--checked',
            getColorS['--k-oklch-500'],
          );
          // bg
          parent.value?.style.setProperty(
            '--checkbox__inner__bg-color--hover',
            getColorS['--k-oklch-400'],
          );
          parent.value?.style.setProperty(
            '--checkbox__inner__bg-color--checked',
            getColorS['--k-oklch-500'],
          );

          // border
          parent.value?.style.setProperty('--checkbox-color--focus', `rgba(${rbgValue}, 0.2)`);
        }
      });
    }
  },
  { immediate: true },
);

function handleClickLabel(e) {
  if (!props.strict) {
    return;
  }
  const isCheckbox = e.target.classList.contains('el-checkbox__inner');
  if (!isCheckbox) {
    e.preventDefault();
  }
}

const getSizeClass = computed(() => (props.size ? `k-checkbox--${props.size}` : ''));

const instance: any = {};
handleExpose(instance, kCheckboxRef, 'KCheckbox');
defineExpose(instance);
</script>

<style lang="less">
@import './style.less';
</style>
