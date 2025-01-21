<!--
* @description  参数1
* @fileName  CVPHome
* @author userName
* @date 2024-10-29 22:37:13
* @version V3.0.0
!-->
<template>
  <div ref="CVPHome" class="CVPHome bg-white px-24 flex flex-col items-center overflow-x-hidden">
    <div class="home-page1-bg h-screen w-screen opacity-50 fixed">
    </div>
    <div class="h-fit z-10" style="width: 1280px">
      <!-- 第一页 -->
      <page-one></page-one>
      <!-- 第二页, 组件 -->
      <page-two class="mt-24"></page-two>
      <!-- 第三页, 模板 -->
      <page-three class="mt-24"></page-three>

      <div
        class="w-full h-24 flex justify-between items-center py-4 border-t border-gray-200 mt-20"
      >
        <div>Copyright ©2025 Kingsware Inc. All Rights reserved.</div>
        <div>MobyTang</div>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { ref, computed } from 'vue';
import { iconsDataBase } from 'ksw-vue-icon/icons-base.js';
import pageOne from './pageOne.vue';
import pageTwo from './pageTwo.vue';
import pageThree from './pageThree.vue';

const rightItems = [
  {
    name: 'a',
    icon: 'IconAdd',
    label: '组件库',
    dec: '组件库按人机交互分为五类: 通用,  数据录入, 数据展示, 导航, 信息反馈, 其他(公共方法)',
  },
  {
    name: 'b',
    icon: 'IconAdd',
    label: '模板库',
    dec: 'Form layouts,tables,modal dialogs-everything you need to build beautiful responsive web applications.',
  },
];

const componentValue = [
  {
    id: 0,
    label: '通用',
    dec: '通用组件',
    total: 10,
    image: 'card',
  },
  {
    id: 1,
    label: '导航类组件',
    dec: '信息反馈',
    total: 10,
    image: 'card',
  },
  {
    id: 2,
    label: '数据输入',
    dec: '表单组件',
    total: 10,
    image: 'card',
  },
  {
    id: 3,
    label: '数据输出',
    dec: '展示数据组件',
    total: 10,
    image: 'card',
  },
  {
    id: 4,
    label: '数据输出',
    dec: '展示数据组件',
    total: 10,
    image: 'card',
  },
  {
    id: 5,
    label: '工具函数',
    dec: '信息反馈',
    total: 10,
    image: 'card',
  },
];
</script>
<style lang="less" scoped>
/* @import './style.less'; */

.dark .home-page1-bg{
  background-color: rgb(0 3 25);
  opacity: 1;
}

.box {
  // border: 1px solid #fafafa;
}
.home-page1-bg {
  // position: fixed;
  font-family: 'Quicksand', sans-serif;
  margin: 0;
  min-height: 100vh;
  background-color: #ffffff;
  background-image: radial-gradient(closest-side, rgba(235, 105, 78, 0.2), rgba(235, 105, 78, 0)),
    radial-gradient(closest-side, rgba(243, 11, 164, 0.3), rgba(243, 11, 164, 0)),
    radial-gradient(closest-side, rgba(254, 234, 131, 0.2), rgba(254, 234, 131, 0)),
    radial-gradient(closest-side, rgba(170, 142, 245, 0.2), rgba(170, 142, 245, 0)),
    radial-gradient(closest-side, rgba(248, 192, 147, 1), rgba(248, 192, 147, 0));
  background-size:
    130vmax 130vmax,
    80vmax 80vmax,
    90vmax 90vmax,
    110vmax 110vmax,
    90vmax 90vmax;
  background-position:
    -80vmax -80vmax,
    60vmax -30vmax,
    10vmax 10vmax,
    -30vmax -10vmax,
    50vmax 50vmax;
  background-repeat: no-repeat;
  animation: 6s movement linear infinite;
  &::after {
    content: '';
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}

@keyframes movement {
  0%,
  100% {
    background-size:
      130vmax 130vmax,
      80vmax 80vmax,
      90vmax 90vmax,
      110vmax 110vmax,
      90vmax 90vmax;
    background-position:
      -80vmax -80vmax,
      60vmax -30vmax,
      10vmax 10vmax,
      -30vmax -10vmax,
      50vmax 50vmax;
  }
  25% {
    background-size:
      100vmax 100vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      60vmax 60vmax;
    background-position:
      -60vmax -90vmax,
      50vmax -40vmax,
      0vmax -20vmax,
      -40vmax -20vmax,
      40vmax 60vmax;
  }
  50% {
    background-size:
      80vmax 80vmax,
      110vmax 110vmax,
      80vmax 80vmax,
      60vmax 60vmax,
      80vmax 80vmax;
    background-position:
      -50vmax -70vmax,
      40vmax -30vmax,
      10vmax 0vmax,
      20vmax 10vmax,
      30vmax 70vmax;
  }
  75% {
    background-size:
      90vmax 90vmax,
      90vmax 90vmax,
      100vmax 100vmax,
      90vmax 90vmax,
      70vmax 70vmax;
    background-position:
      -50vmax -40vmax,
      50vmax -30vmax,
      20vmax 0vmax,
      -10vmax 10vmax,
      40vmax 60vmax;
  }
}
</style>
