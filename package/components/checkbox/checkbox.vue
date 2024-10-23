<template>
  <el-checkbox
    :id="id"
    ref="kCheckboxRef"
    class="k-checkbox"
    :class="[getSizeClass, _styleModule]"
    v-bind="$attrs"
    :label="label"
    :size="getCompSize(size)"
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
import { ref, watch, nextTick, computed, inject } from 'vue';
import { ElCheckbox } from 'element-plus';
import { CheckboxProps } from './type';
import { getCompSize, getExposeProxy, genRandomStr, GetColorLevelNew } from '../../utils/index';
import { colors } from './const';

defineOptions({
  name: 'KCheckbox',
});
const _styleModule = inject('_styleModule', '');
const props = withDefaults(defineProps<CheckboxProps>(), {
  strict: false,
  color: '',
});
const kCheckboxRef = ref();

const id = genRandomStr(8);

const __size__ = inject(
  '__size__',
  computed(() => 'base'),
);

const color = ref(props.color);
// watch props.color 变化, 更新颜色变量

// 获取 dom
const el = ref();
const parent = ref();
// 等待 dom 更新
if (typeof window !== 'undefined') {
  nextTick(() => {
    el.value = document?.getElementById(id);
  });
}
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
          parent.value = el.value?.parentNode?.parentNode;

          const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式
          // border
          parent.value?.style.setProperty('--checkbox-color--focus', `rgba(${rbgValue}, 0.2)`);

          colors.forEach((item) => {
            parent.value?.style.setProperty(
              `--checkbox${item.name}`,
              getColorS[`--k-oklch-${item.value}`],
            );
          });
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

const getSizeClass = computed(() => {
  const size = props.size ?? __size__.value;
  return size ? `k-checkbox--${size}` : '';
});

const instance: any = {};
defineExpose(getExposeProxy(instance, kCheckboxRef));
</script>

<style lang="less">
@import './style.less';
</style>
