<!--
* @description  参数1
* @fileName  pageTwo
* @author userName
* @date 2025-01-20 15:28:40
* @version V3.0.0
!-->
<template>
  <div class="page-two CVPHome-header relative">
    <div class="text-violet-500 dark:text-violet-300 text-xl font-bold">Components</div>
    <div class="break-words text-xl font-bold text-gray-900 dark:text-white mt-2">
      超过 90 个 UI 组件，为你的项目做好准备。
    </div>
    <div class="text-gray-900 dark:text-white text-base mt-2">
      支持主题, 使用 tailwindcss, 也可以使用传统 CSS;
      <br />
      使用 TypeScript, 有完整的类型定义文件。
    </div>

    <div class="h-full mt-8">
      <div class="grid grid-cols-3 gap-4">
        <div class="box" v-for="(item, index) in componentValue" :key="item.id">
          <card
            class=""
            :label="item.label"
            :dec="item.dec"
            :total="item.total"
          >
          <img class="w-full h-full bg-slate-100 rounded-2xl" :src="item.image" alt="">
        </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import card from './card.vue';

function getImageUrl(name) {
  return new URL(`../assets/${name}`, import.meta.url).href
}

const componentValue = [
  {
    id: 0,
    label: '通用',
    dec: '通用组件',
    total: 10,
    image: getImageUrl('cpm_img.svg'),
  },
  {
    id: 1,
    label: '导航类组件',
    dec: '信息反馈',
    total: 10,
    image: getImageUrl('cpm_img1.svg'),
  },
  {
    id: 2,
    label: '数据输入',
    dec: '表单组件',
    total: 10,
    image: getImageUrl('cpm_img2.svg'),
  },
  {
    id: 3,
    label: '数据展示',
    dec: '展示数据组件',
    total: 10,
    image: getImageUrl('cpm_img3.svg'),
  },
  {
    id: 4,
    label: '反馈',
    dec: '反馈组件',
    total: 10,
    image: getImageUrl('cpm_img4.svg'),
  },
  {
    id: 5,
    label: '工具函数',
    dec: '信息反馈',
    total: 10,
    image: getImageUrl('cpm_img5.svg'),
  },
];
</script>
<style scoped></style>
