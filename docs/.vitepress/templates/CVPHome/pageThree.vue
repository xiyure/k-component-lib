<!--
* @description  参数1
* @fileName  pageTwo
* @author userName
* @date 2025-01-20 15:28:40
* @version V3.0.0
!-->
<template>
  <div ref="screen" class="page-two CVPHome-header relative mt-8">
    <div class="text-violet-500 dark:text-violet-300 text-xl font-bold">Template</div>
    <div class="break-words text-xl font-bold text-gray-900 dark:text-white mt-2">
      这里有各种客户案例，帮助你快速上手。
    </div>
    <div class="text-gray-900 dark:text-white text-base mt-2">
      项目模板会持续增加, 欢迎关注公众号获取最新消息。
    </div>

    <div class="scroll-content mt-8 flex transition-transform duration-500 w-fit">
      <div ref="images" v-for="(imgUrl, index) in urlList" :key="index" class="w-full pr-4">
        <img class="rounded-3xl max-w-[1200px]" :src="imgUrl" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const screen = ref(null);
const images = ref(null);

function getImageUrl(name) {
  return new URL(`../assets/${name}`, import.meta.url).href;
}

const urlList = [getImageUrl('p1.png'), getImageUrl('p2.png'), getImageUrl('p3.png')];

onMounted(() => {
  const tl = gsap.timeline({
    repeat: 0,
    repeatDelay: 1,
    scrollTrigger: {
      trigger: screen.value,
      // pin: true, // 在激活时固定触发元素
      start: '+=300 bottom', // 当触发器的顶部碰到视口的顶部
      end: '+=660', // 滚动500px后结束
      // markers: true,  // 显示开始和结束标记
      scrub: 1 // 平滑擦洗，需要1秒钟才能“追上”滚动条
    }
  });
  tl.to(
    images.value,
    {
      // x: -2100
      xPercent: -150
    },
    0
  );
});
</script>

<style scoped></style>
