<template>
  <el-radio
    v-bind="$attrs"
    ref="kRadioRef"
    class="k-radio"
    :class="[getSizeClass, { 'is-button': props.button === true }, _styleModule]"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </el-radio>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, inject } from 'vue';
import { ElRadio } from 'element-plus';
import { RadioProps } from './type';
import { GetColorLevelNew, getExposeProxy } from '../../utils';
import { useSize } from '../../hooks';
import { colors } from './const';

defineOptions({
  name: 'KRadio'
});

const props = withDefaults(defineProps<RadioProps>(), {
  color: '',
  button: false
});

const formatSize = useSize<RadioProps>(props);

const _styleModule = inject('_styleModule', '');
const color = ref(props.color);
const kRadioRef = ref();

// watch props.color 变化, 更新颜色变量
watch(
  () => props.color,
  (newVal) => {
    if (!newVal) {
      return;
    }
    color.value = newVal;
    const getColorS = GetColorLevelNew(newVal).colorLevel;
    nextTick(() => {
      if (kRadioRef.value.$el?.style) {
        const rbgValue = getColorS['--k-oklch-500'].match(/\(([^)]+)\)/)[1]; // 获取 rbg 值, 用于设置 focus 样式
        kRadioRef.value.$el?.style.setProperty('--radio-color--focus', `rgba(${rbgValue}, 0.2)`);
        colors.forEach((item) => {
          kRadioRef.value.$el?.style.setProperty(
            `--radio${item.name}`,
            getColorS[`--k-oklch-${item.value}`]
          );
        });
      }
    });
  },
  { immediate: true }
);

const getSizeClass = computed(() => {
  const { ownSize } = formatSize.value;
  return ownSize ? `k-radio--${ownSize}` : '';
});

const instance: any = {};
defineExpose(getExposeProxy(instance, kRadioRef));
</script>

<style lang="less">
@import './style.less';
</style>
