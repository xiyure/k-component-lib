<template>
  <div class="flex gap-2 md:gap-4 flex-col">
    <div
      class="sticky top-12 md:top-16 max-[9]: z-10 col-start-2 grid grid-cols-[minmax(6rem,2fr),repeat(11,1fr)] justify-items-center gap-2 md:gap-4 bg-[var(--vp-c-bg)] text-sm md:text-base font-medium py-4"
    >
      <div class=""></div>
      <div v-for="(level, index) in colorLevels" :key="level">{{ level }}</div>
    </div>
    <div
      v-for="(colorChineseName, colorName) in colorsType"
      :key="colorName"
      class="grid grid-cols-[minmax(6rem,2fr),repeat(11,1fr)] gap-2 md:gap-4"
    >
      <div class="flex items-center text-base md:text-lg lg:text-xl font-bold">{{ colorChineseName }}</div>
      <div
        v-for="(colorLevel, index) in colorLevels"
        :key="colorLevel"
        class="aspect-square rounded-lg md:rounded-2xl lg:rounded-3xl outline -outline-offset-1 outline-black/10 cursor-pointer transition-all !duration-500 hover:scale-105"
        :style="{ backgroundColor: `var(--k-${colorName}-${colorLevel})` }"
        @click="clickCopyColor(colorName, colorLevel)"
      >
      </div>
    </div>
  </div>
</template>

<script setup>
import { KMessage } from '@ksware/ksw-ux';

const colorsType = {
  rose: '玫瑰色',
  pink: '粉色',
  fuchsia: '紫红色',
  purple: '紫色',
  violet: '紫罗兰色',
  indigo: '靛蓝色',
  blue: '蓝色',
  sky: '天蓝色',
  cyan: '青蓝色',
  teal: '青色',
  emerald: '祖母绿',
  green: '绿色',
  lime: '酸橙色',
  yellow: '黄色',
  amber: '琥珀色',
  red: '红色',
  orange: '橙色',
  stone: '石色',
  neutral: '中性色',
  zinc: '锌色',
  gray: '灰色',
  slate: '石板',
};

const colorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const clickCopyColor = async (colorName, colorLevel) =>  {
  const colorVariable = `--k-${colorName}-${colorLevel}`;
  await navigator.clipboard.writeText(colorVariable).then(() => {
    KMessage.success(`已复制: ${colorVariable}`);
  }).catch(err => {
    KMessage.error('复制失败');
    console.error(err);
  });
}
</script>

<style scoped>
</style>
