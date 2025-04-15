<template>
  <div
    v-ksw_tooltip="{ content: props.text, visible: props.showOverflow }"
    class="k-tag"
  >
    <el-tag
      ref="KTagRef"
      :class="[
        {
          'is-border': border,
          'is-point': point,
          [`k-tag__${type}`]: type,
          'is-custom': color,
          'pr-0': isOverflow,
        },
      ]"
      v-bind="$attrs"
      :size="formatSize.elSize"
    >
      <span
        ref="KTagSpanRef"
        :class="{
          ' inline-block  max-w-24  overflow-hidden text-ellipsis text-nowrap  break-words pr-0':
            showOverflow,
        }"
        :style="{
          color: textColor,
        }"
      >
        <slot>{{ props.text }}</slot>
      </span>
    </el-tag>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { ElTag } from 'element-plus';
import { TagProps } from './type';
import { getExposeProxy, GetColorLevelNew } from '../../utils';
import { useSize } from '../../hooks';
import { colors } from './const';

defineOptions({
  name: 'KTag',
});

const props = withDefaults(defineProps<TagProps>(), {
  point: false,
  type: undefined,
  text: undefined,
  showOverflow: false,
});

const formatSize = useSize<TagProps>(props);

const KTagRef = ref();
const color = ref(props.color);

const isOverflow = ref(false);

function isShowTooltip(el: HTMLElement) {
  const scrollWidth = el?.scrollWidth;
  const clientWidth = el?.clientWidth;
  if (scrollWidth > clientWidth) {
    return true;
  }
  return false;
}

watch(
  () => props.text,
  () => {
    nextTick(() => {
      isOverflow.value = isShowTooltip(KTagRef.value.$el.childNodes[0].children[0]);
    });
  },
  { immediate: true },
);

// watch props.color 变化, 更新颜色变量
watch(
  () => props.color,
  (newVal) => {
    if (!newVal) {
      return;
    }
    color.value = newVal;
    const getColorS = GetColorLevelNew?.(newVal)?.colorLevel;
    nextTick(() => {
      if (KTagRef.value?.$el?.style) {
        const rbgValue = getColorS?.['--k-oklch-500']?.match(/\(([^)]+)\)/)?.[1]; // 获取 rbg 值, 用于设置 focus 样式
        KTagRef.value.$el?.style.setProperty('--tag-color--focus', `rgba(${rbgValue}, 0.2)`);
        colors.forEach((item) => {
          KTagRef.value.$el?.style.setProperty(
            `--tag${item.name}`,
            getColorS?.[`--k-oklch-${item.value}`],
          );
        });
      }
    });
  },
  { immediate: true },
);

const instance: any = {};
defineExpose(getExposeProxy(instance, KTagRef));
</script>

<style lang="less">
@import './style.less';
</style>
